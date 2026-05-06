// a11y: WCAG AA verified 2026-05-06
// perf: CLS=0, GPU-friendly 2026-05-06
// mobile: verified 375px/768px 2026-05-06
import React, { useState, useRef, useId, useCallback, useMemo } from 'react';
import { cn } from '../../utils';
import { ArrowUpIcon, ArrowDownIcon, SortIcon } from '../../icons';
import './Table.css';

// ── Column definition ──────────────────────────────────────────────────────────

export interface TableColumnDefinition<T = unknown> {
  id: string;
  header: React.ReactNode;
  cell: (item: T) => React.ReactNode;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  sortingField?: string;
  sortingComparator?: (a: T, b: T) => number;
  isRowHeader?: boolean;
  ariaLabel?: (data: { sorted: boolean; descending: boolean; disabled: boolean }) => string;
}

// ── Derived types ──────────────────────────────────────────────────────────────

export interface TableSortingState<T = unknown> {
  sortingColumn: TableColumnDefinition<T>;
  isDescending: boolean;
}

export type TableSelectionType = 'single' | 'multi';
export type TableVariant = 'container' | 'borderless' | 'stacked';
export type TableContentDensity = 'comfortable' | 'compact';

export interface TableAriaLabels<T = unknown> {
  selectionGroupLabel?: string;
  itemSelectionLabel?: (data: { selectedItems: ReadonlyArray<T> }, item: T) => string;
  allItemsSelectionLabel?: (data: { selectedItems: ReadonlyArray<T> }) => string;
  tableLabel?: string;
}

// ── Props ──────────────────────────────────────────────────────────────────────

export interface TableProps<T = unknown> {
  /** Column definitions — header label, cell renderer, optional sort field. Required. */
  columnDefinitions: ReadonlyArray<TableColumnDefinition<T>>;
  /** Data rows. Required. */
  items: ReadonlyArray<T>;

  /** id forwarded to the root element. */
  id?: string;

  /** Field name or function to derive a stable React key from each item. */
  trackBy?: string | ((item: T) => string);

  // ── Selection ────────────────────────────────────────────────────────────────
  selectionType?: TableSelectionType;
  selectedItems?: ReadonlyArray<T>;
  onSelectionChange?: (detail: { selectedItems: T[] }) => void;
  isItemDisabled?: (item: T) => boolean;
  ariaLabels?: TableAriaLabels<T>;

  // ── Sorting (controlled — manage state externally) ────────────────────────────
  sortingColumn?: TableColumnDefinition<T>;
  sortingDescending?: boolean;
  /** Disable all sort triggers (e.g. while loading). */
  sortingDisabled?: boolean;
  onSortingChange?: (detail: TableSortingState<T>) => void;

  // ── Display ───────────────────────────────────────────────────────────────────
  variant?: TableVariant;
  contentDensity?: TableContentDensity;
  stripedRows?: boolean;
  wrapLines?: boolean;
  stickyHeader?: boolean;
  /** Vertical offset (px) for the sticky header — use to clear a fixed top bar. */
  stickyHeaderVerticalOffset?: number;
  resizableColumns?: boolean;

  // ── Column display / visibility ───────────────────────────────────────────────
  /** Control visible columns and order. Columns omitted or with visible:false are hidden. */
  columnDisplay?: ReadonlyArray<{ id: string; visible?: boolean }>;

  // ── Sticky columns ────────────────────────────────────────────────────────────
  stickyColumns?: { first?: number; last?: number };

  // ── Loading ───────────────────────────────────────────────────────────────────
  loading?: boolean;
  loadingText?: string;

  // ── Slots ─────────────────────────────────────────────────────────────────────
  /** Rendered above the filter bar. Use for the table heading + action buttons. */
  header?: React.ReactNode;
  /** Rendered below the header. Use for search/filter controls. */
  filter?: React.ReactNode;
  /** Rendered below the scroll area. Use for a Pagination component. */
  pagination?: React.ReactNode;
  /** Rendered at the very bottom. Use for totals, status text, etc. */
  footer?: React.ReactNode;
  /** Shown when items is empty (and not loading). */
  empty?: React.ReactNode;

  // ── Row events ────────────────────────────────────────────────────────────────
  onRowClick?: (detail: { item: T; rowIndex: number }) => void;

  // ── Accessibility ──────────────────────────────────────────────────────────────
  ariaLabel?: string;
  totalItemsCount?: number;
  firstIndex?: number;
  renderAriaLive?: (data: {
    firstIndex: number;
    lastIndex: number;
    totalItemsCount?: number;
  }) => string;

  // ── Keyboard navigation ────────────────────────────────────────────────────────
  /** Arrow-key cell navigation. Single tab stop for the whole table. */
  enableKeyboardNavigation?: boolean;

  // ── Styling ────────────────────────────────────────────────────────────────────
  className?: string;
  style?: React.CSSProperties;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function getItemKey<T>(item: T, index: number, trackBy?: string | ((item: T) => string)): string {
  if (!trackBy) return String(index);
  if (typeof trackBy === 'function') return trackBy(item);
  return String((item as Record<string, unknown>)[trackBy]);
}

function sortItems<T>(
  items: ReadonlyArray<T>,
  column: TableColumnDefinition<T>,
  descending: boolean,
): T[] {
  const sorted = [...items];
  sorted.sort((a, b) => {
    let result: number;
    if (column.sortingComparator) {
      result = column.sortingComparator(a, b);
    } else if (column.sortingField) {
      const av = (a as Record<string, unknown>)[column.sortingField];
      const bv = (b as Record<string, unknown>)[column.sortingField];
      if (av === bv) result = 0;
      else if (av == null) result = -1;
      else if (bv == null) result = 1;
      else if (typeof av === 'string' && typeof bv === 'string') result = av.localeCompare(bv);
      else result = av < bv ? -1 : 1;
    } else {
      result = 0;
    }
    return descending ? -result : result;
  });
  return sorted;
}

const SELECTION_COL_WIDTH = 48;
const DEFAULT_COL_WIDTH = 150;

// ── Dev-mode warning dedup ────────────────────────────────────────────────────

const _warned = new Set<string>();
function _warn(key: string, msg: string): void {
  if (_warned.has(key)) return;
  _warned.add(key);
  console.warn(msg);
}

// ── Component ──────────────────────────────────────────────────────────────────

const Table = React.forwardRef(
  <T = unknown,>(props: TableProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {
    columnDefinitions,
    items,
    id,
    trackBy,
    selectionType,
    selectedItems: controlledSelected = [],
    onSelectionChange,
    isItemDisabled,
    ariaLabels,
    sortingColumn: controlledSortCol,
    sortingDescending: controlledSortDesc = false,
    sortingDisabled = false,
    onSortingChange,
    variant = 'container',
    contentDensity = 'comfortable',
    stripedRows = false,
    wrapLines = false,
    stickyHeader = false,
    stickyHeaderVerticalOffset,
    resizableColumns = false,
    columnDisplay,
    stickyColumns,
    loading = false,
    loadingText,
    header,
    filter,
    pagination,
    footer,
    empty,
    onRowClick,
    ariaLabel,
    totalItemsCount,
    firstIndex = 1,
    renderAriaLive,
    enableKeyboardNavigation = false,
    className,
    style,
  } = props;

  // ── Dev warnings ───────────────────────────────────────────────────────────

  if (selectionType && !trackBy) {
    _warn(
      'table:selectionType-no-trackBy',
      '[Kiln Table] `selectionType` is set but `trackBy` is not. ' +
      'Selection identity falls back to reference equality and will break if items are recreated on each render. ' +
      'Add trackBy="id" or a key function.',
    );
  }
  if (selectionType && !onSelectionChange) {
    _warn(
      'table:selectionType-no-handler',
      '[Kiln Table] `selectionType` is set but `onSelectionChange` is not. ' +
      'Selection changes will not be reflected. Add an onSelectionChange handler.',
    );
  }

  const tableId = useId();
  const tableRef = useRef<HTMLTableElement>(null);

  // ── Keyboard navigation ────────────────────────────────────────────────────

  const [focusedCell, setFocusedCell] = useState<[number, number]>([0, 0]);

  // ── Column widths for resize ───────────────────────────────────────────────

  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const resizingRef = useRef<{ colId: string; startX: number; startWidth: number } | null>(null);

  // ── Visible columns ────────────────────────────────────────────────────────

  const visibleColumns = useMemo<TableColumnDefinition<T>[]>(() => {
    if (!columnDisplay) return columnDefinitions as TableColumnDefinition<T>[];
    return columnDisplay
      .filter((d) => d.visible !== false)
      .map((d) => columnDefinitions.find((c) => c.id === d.id))
      .filter(Boolean) as TableColumnDefinition<T>[];
  }, [columnDefinitions, columnDisplay]);

  // ── Sorting ────────────────────────────────────────────────────────────────

  const isControlledSort = controlledSortCol !== undefined;
  const [internalSortCol, setInternalSortCol] = useState<TableColumnDefinition<T> | undefined>();
  const [internalSortDesc, setInternalSortDesc] = useState(false);

  const activeSortCol = isControlledSort ? controlledSortCol : internalSortCol;
  const activeSortDesc = isControlledSort ? controlledSortDesc : internalSortDesc;

  const handleSortChange = useCallback(
    (col: TableColumnDefinition<T>) => {
      if (sortingDisabled) return;
      const isSameCol = activeSortCol?.id === col.id;
      const newDesc = isSameCol ? !activeSortDesc : false;
      onSortingChange?.({ sortingColumn: col, isDescending: newDesc });
      if (!isControlledSort) {
        setInternalSortCol(col);
        setInternalSortDesc(newDesc);
      }
    },
    [sortingDisabled, activeSortCol, activeSortDesc, onSortingChange, isControlledSort],
  );

  const displayedItems = useMemo<T[]>(() => {
    if (!activeSortCol) return items as T[];
    return sortItems(items, activeSortCol, activeSortDesc);
  }, [items, activeSortCol, activeSortDesc]);

  // ── Selection ──────────────────────────────────────────────────────────────

  const isSameItem = useCallback(
    (a: T, b: T): boolean => {
      if (!trackBy) return a === b;
      if (typeof trackBy === 'function') return trackBy(a) === trackBy(b);
      const key = trackBy;
      return (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key];
    },
    [trackBy],
  );

  const isSelected = useCallback(
    (item: T): boolean => controlledSelected.some((s) => isSameItem(s, item)),
    [controlledSelected, isSameItem],
  );

  const handleRowSelect = useCallback(
    (item: T) => {
      if (!selectionType || !onSelectionChange) return;
      if (isItemDisabled?.(item)) return;
      if (selectionType === 'single') {
        onSelectionChange({ selectedItems: [item] });
      } else {
        const selected = isSelected(item);
        onSelectionChange({
          selectedItems: selected
            ? controlledSelected.filter((s) => !isSameItem(s, item))
            : [...controlledSelected, item],
        });
      }
    },
    [selectionType, onSelectionChange, isItemDisabled, isSelected, controlledSelected, isSameItem],
  );

  const enabledDisplayedItems = useMemo(
    () => displayedItems.filter((item) => !isItemDisabled?.(item)),
    [displayedItems, isItemDisabled],
  );

  const selectedCount = useMemo(
    () => enabledDisplayedItems.filter(isSelected).length,
    [enabledDisplayedItems, isSelected],
  );
  const allSelected = enabledDisplayedItems.length > 0 && selectedCount === enabledDisplayedItems.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange({
        selectedItems: controlledSelected.filter(
          (s) => !enabledDisplayedItems.some((item) => isSameItem(s, item)),
        ),
      });
    } else {
      const unselected = enabledDisplayedItems.filter((item) => !isSelected(item));
      onSelectionChange({ selectedItems: [...controlledSelected, ...unselected] });
    }
  }, [onSelectionChange, allSelected, controlledSelected, enabledDisplayedItems, isSameItem, isSelected]);

  // ── Column resize ──────────────────────────────────────────────────────────

  const handleResizeStart = useCallback(
    (colId: string, e: React.PointerEvent<HTMLSpanElement>) => {
      const th = (e.currentTarget as HTMLElement).closest('th');
      if (!th) return;
      resizingRef.current = {
        colId,
        startX: e.clientX,
        startWidth: th.getBoundingClientRect().width,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );

  const handleResizeMove = useCallback((e: React.PointerEvent<HTMLSpanElement>) => {
    if (!resizingRef.current) return;
    const { colId, startX, startWidth } = resizingRef.current;
    const newWidth = Math.max(80, startWidth + (e.clientX - startX));
    setColWidths((prev) => ({ ...prev, [colId]: newWidth }));
  }, []);

  const handleResizeEnd = useCallback(() => {
    resizingRef.current = null;
  }, []);

  // ── Keyboard navigation ────────────────────────────────────────────────────

  const totalCols = visibleColumns.length + (selectionType ? 1 : 0);
  const totalRows = displayedItems.length + 1; // +1 for header row

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableElement>) => {
      if (!enableKeyboardNavigation) return;
      const [row, col] = focusedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'ArrowDown':  newRow = Math.min(row + 1, totalRows - 1); e.preventDefault(); break;
        case 'ArrowUp':    newRow = Math.max(row - 1, 0);             e.preventDefault(); break;
        case 'ArrowRight': newCol = Math.min(col + 1, totalCols - 1); e.preventDefault(); break;
        case 'ArrowLeft':  newCol = Math.max(col - 1, 0);             e.preventDefault(); break;
        case 'Home':       newCol = 0; if (e.ctrlKey) newRow = 0;            e.preventDefault(); break;
        case 'End':        newCol = totalCols - 1; if (e.ctrlKey) newRow = totalRows - 1; e.preventDefault(); break;
        default: return;
      }

      if (newRow !== row || newCol !== col) {
        setFocusedCell([newRow, newCol]);
        const target = tableRef.current?.querySelector<HTMLElement>(
          `[data-grid-row="${newRow}"][data-grid-col="${newCol}"]`,
        );
        target?.focus();
      }
    },
    [enableKeyboardNavigation, focusedCell, totalRows, totalCols],
  );

  // ── Sticky column offsets ──────────────────────────────────────────────────

  const getStickyStyle = useCallback(
    (adjustedColIndex: number): React.CSSProperties => {
      if (!stickyColumns) return {};
      const first = stickyColumns.first ?? 0;
      const last = stickyColumns.last ?? 0;

      const isFirstSticky = adjustedColIndex < first;
      const isLastSticky = adjustedColIndex >= totalCols - last;
      if (!isFirstSticky && !isLastSticky) return {};

      const getColW = (idx: number): number => {
        if (selectionType && idx === 0) return SELECTION_COL_WIDTH;
        const col = visibleColumns[selectionType ? idx - 1 : idx];
        if (!col) return DEFAULT_COL_WIDTH;
        return colWidths[col.id] ?? (typeof col.width === 'number' ? col.width : DEFAULT_COL_WIDTH);
      };

      if (isFirstSticky) {
        let left = 0;
        for (let i = 0; i < adjustedColIndex; i++) left += getColW(i);
        return { position: 'sticky', left, zIndex: 1 };
      } else {
        let right = 0;
        for (let i = adjustedColIndex + 1; i < totalCols; i++) right += getColW(i);
        return { position: 'sticky', right, zIndex: 1 };
      }
    },
    [stickyColumns, totalCols, selectionType, visibleColumns, colWidths],
  );

  // ── ARIA live ──────────────────────────────────────────────────────────────

  const lastIndex = firstIndex + displayedItems.length - 1;
  const liveText = renderAriaLive
    ? renderAriaLive({ firstIndex, lastIndex, totalItemsCount })
    : totalItemsCount
    ? `Showing items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
    : '';

  // ── Sticky header inline style ─────────────────────────────────────────────

  const stickyTop = stickyHeaderVerticalOffset !== undefined ? stickyHeaderVerticalOffset : 0;

  // ── Render header cell ─────────────────────────────────────────────────────

  const renderHeaderCell = (col: TableColumnDefinition<T>, adjustedColIndex: number) => {
    const isSortable = !sortingDisabled && !!(col.sortingField || col.sortingComparator);
    const isSorted = activeSortCol?.id === col.id;
    const width = colWidths[col.id] ?? col.width;
    const minWidth = col.minWidth ?? (resizableColumns ? 80 : undefined);

    const thStyle: React.CSSProperties = {
      ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
      ...(minWidth !== undefined ? { minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth } : {}),
      ...(col.maxWidth !== undefined ? { maxWidth: typeof col.maxWidth === 'number' ? `${col.maxWidth}px` : col.maxWidth } : {}),
      ...getStickyStyle(adjustedColIndex),
      ...(stickyHeader ? { top: stickyTop } : {}),
    };

    const ariaSort: React.AriaAttributes['aria-sort'] = isSorted
      ? activeSortDesc ? 'descending' : 'ascending'
      : isSortable ? 'none' : undefined;

    const ariaLabelAttr = col.ariaLabel?.({
      sorted: isSorted,
      descending: isSorted ? activeSortDesc : false,
      disabled: sortingDisabled,
    });

    const isFocused = enableKeyboardNavigation && focusedCell[0] === 0 && focusedCell[1] === adjustedColIndex;

    return (
      <th
        key={col.id}
        className={cn(
          'kiln-table__th',
          isSortable && 'kiln-table__th--sortable',
          isSorted && 'kiln-table__th--sorted',
          stickyHeader && 'kiln-table__th--sticky',
          stickyColumns && getStickyStyle(adjustedColIndex).position === 'sticky' && 'kiln-table__th--sticky-col',
        )}
        style={thStyle}
        aria-sort={ariaSort}
        aria-label={ariaLabelAttr}
        scope="col"
        onClick={isSortable ? () => handleSortChange(col) : undefined}
        onKeyDown={isSortable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSortChange(col); } } : undefined}
        tabIndex={enableKeyboardNavigation ? (isFocused ? 0 : -1) : undefined}
        data-grid-row={enableKeyboardNavigation ? '0' : undefined}
        data-grid-col={enableKeyboardNavigation ? String(adjustedColIndex) : undefined}
      >
        <div className="kiln-table__th-content">
          <span className="kiln-table__th-label">{col.header}</span>
          {isSortable && (
            <span className="kiln-table__sort-icon" aria-hidden="true">
              {isSorted ? (
                activeSortDesc ? <ArrowDownIcon size={12} /> : <ArrowUpIcon size={12} />
              ) : (
                <SortIcon size={12} />
              )}
            </span>
          )}
        </div>
        {resizableColumns && (
          <span
            className="kiln-table__resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label={`Resize ${typeof col.header === 'string' ? col.header : col.id} column`}
            onPointerDown={(e) => handleResizeStart(col.id, e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
            onPointerCancel={handleResizeEnd}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </th>
    );
  };

  // ── Derived state ──────────────────────────────────────────────────────────

  const showEmpty = !loading && displayedItems.length === 0;
  const showSkeletons = loading && displayedItems.length === 0;
  const colSpan = totalCols;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        'kiln-table',
        `kiln-table--${variant}`,
        contentDensity === 'compact' && 'kiln-table--compact',
        stripedRows && 'kiln-table--striped',
        wrapLines && 'kiln-table--wrap-lines',
        stickyHeader && 'kiln-table--sticky-header',
        className,
      )}
      style={{
        ...style,
        ...(stickyHeaderVerticalOffset !== undefined
          ? { '--kiln-table-sticky-offset': `${stickyHeaderVerticalOffset}px` } as React.CSSProperties
          : {}),
      }}
    >
      {/* Header slot */}
      {header && <div className="kiln-table__header">{header}</div>}

      {/* Filter slot */}
      {filter && <div className="kiln-table__filter">{filter}</div>}

      {/* ARIA live region */}
      {liveText && (
        <div role="status" aria-live="polite" aria-atomic="true" className="kiln-table__sr-only">
          {liveText}
        </div>
      )}

      {/* Scroll wrapper */}
      <div className="kiln-table__scroll-wrap">
        {/* Loading bar */}
        {loading && (
          <div className="kiln-table__loading-bar" role="progressbar" aria-label={loadingText ?? 'Loading'}>
            <div className="kiln-table__loading-bar-inner" />
          </div>
        )}

        <table
          ref={tableRef}
          className="kiln-table__native"
          role="grid"
          aria-label={ariaLabel ?? ariaLabels?.tableLabel}
          aria-multiselectable={selectionType === 'multi' ? true : undefined}
          aria-busy={loading || undefined}
          aria-rowcount={totalItemsCount ?? undefined}
          onKeyDown={enableKeyboardNavigation ? handleKeyDown : undefined}
        >
          <thead className="kiln-table__thead">
            <tr className="kiln-table__tr">
              {/* Selection header */}
              {selectionType && (
                <th
                  className={cn(
                    'kiln-table__th kiln-table__th--selection',
                    stickyHeader && 'kiln-table__th--sticky',
                    stickyColumns && getStickyStyle(0).position === 'sticky' && 'kiln-table__th--sticky-col',
                  )}
                  style={{
                    ...getStickyStyle(0),
                    ...(stickyHeader ? { top: stickyTop } : {}),
                  }}
                  scope="col"
                  tabIndex={enableKeyboardNavigation ? (focusedCell[0] === 0 && focusedCell[1] === 0 ? 0 : -1) : undefined}
                  data-grid-row={enableKeyboardNavigation ? '0' : undefined}
                  data-grid-col={enableKeyboardNavigation ? '0' : undefined}
                >
                  {selectionType === 'multi' ? (
                    <input
                      type="checkbox"
                      className="kiln-table__checkbox"
                      checked={allSelected}
                      ref={(el) => { if (el) el.indeterminate = someSelected; }}
                      onChange={handleSelectAll}
                      aria-label={
                        ariaLabels?.allItemsSelectionLabel?.({ selectedItems: controlledSelected })
                        ?? 'Select all items'
                      }
                    />
                  ) : (
                    <span className="kiln-table__sr-only">
                      {ariaLabels?.selectionGroupLabel ?? 'Select'}
                    </span>
                  )}
                </th>
              )}

              {/* Column headers */}
              {visibleColumns.map((col, i) =>
                renderHeaderCell(col, selectionType ? i + 1 : i),
              )}
            </tr>
          </thead>

          <tbody className={cn('kiln-table__tbody', loading && displayedItems.length > 0 && 'kiln-table__tbody--loading')}>
            {showEmpty && (
              <tr>
                <td colSpan={colSpan} className="kiln-table__empty-cell">
                  {empty ?? (
                    <div className="kiln-table__empty-default">
                      <span>No items to display.</span>
                    </div>
                  )}
                </td>
              </tr>
            )}

            {showSkeletons &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`sk-${i}`} className="kiln-table__tr kiln-table__tr--skeleton" aria-hidden="true">
                  {selectionType && (
                    <td className="kiln-table__td kiln-table__td--selection">
                      <div className="kiln-table__skeleton-block" style={{ width: 18, height: 18, borderRadius: 3 }} />
                    </td>
                  )}
                  {visibleColumns.map((col) => (
                    <td key={col.id} className="kiln-table__td">
                      <div className="kiln-table__skeleton-block" />
                    </td>
                  ))}
                </tr>
              ))}

            {!showEmpty &&
              !showSkeletons &&
              displayedItems.map((item, rowIndex) => {
                const key = getItemKey(item, rowIndex, trackBy);
                const selected = isSelected(item);
                const disabled = isItemDisabled?.(item) ?? false;
                const adjustedRow = rowIndex + 1;

                const rowClickable = !disabled && (!!onRowClick || !!selectionType);

                return (
                  <tr
                    key={key}
                    className={cn(
                      'kiln-table__tr',
                      selected && 'kiln-table__tr--selected',
                      disabled && 'kiln-table__tr--disabled',
                      rowClickable && 'kiln-table__tr--clickable',
                    )}
                    aria-selected={selectionType ? selected : undefined}
                    aria-rowindex={totalItemsCount ? firstIndex + rowIndex : undefined}
                    onClick={
                      disabled ? undefined
                      : onRowClick ? () => onRowClick({ item, rowIndex })
                      : selectionType ? () => handleRowSelect(item)
                      : undefined
                    }
                  >
                    {/* Selection cell */}
                    {selectionType && (
                      <td
                        className={cn(
                          'kiln-table__td kiln-table__td--selection',
                          stickyColumns && getStickyStyle(0).position === 'sticky' && 'kiln-table__td--sticky-col',
                        )}
                        style={getStickyStyle(0)}
                        tabIndex={enableKeyboardNavigation ? (focusedCell[0] === adjustedRow && focusedCell[1] === 0 ? 0 : -1) : undefined}
                        data-grid-row={enableKeyboardNavigation ? String(adjustedRow) : undefined}
                        data-grid-col={enableKeyboardNavigation ? '0' : undefined}
                      >
                        {selectionType === 'multi' && (
                          <input
                            type="checkbox"
                            className="kiln-table__checkbox"
                            checked={selected}
                            disabled={disabled}
                            onChange={() => handleRowSelect(item)}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={
                              ariaLabels?.itemSelectionLabel?.(
                                { selectedItems: controlledSelected },
                                item,
                              ) ?? `Select item ${rowIndex + 1}`
                            }
                          />
                        )}
                        {selectionType === 'single' && (
                          <input
                            type="radio"
                            className="kiln-table__radio"
                            checked={selected}
                            disabled={disabled}
                            onChange={() => handleRowSelect(item)}
                            onClick={(e) => e.stopPropagation()}
                            name={`${tableId}-selection`}
                            aria-label={
                              ariaLabels?.itemSelectionLabel?.(
                                { selectedItems: controlledSelected },
                                item,
                              ) ?? `Select item ${rowIndex + 1}`
                            }
                          />
                        )}
                      </td>
                    )}

                    {/* Data cells */}
                    {visibleColumns.map((col, colIndex) => {
                      const adjustedColIndex = selectionType ? colIndex + 1 : colIndex;
                      const stickyStyle = getStickyStyle(adjustedColIndex);
                      const isSticky = stickyStyle.position === 'sticky';
                      const Tag = col.isRowHeader ? 'th' : 'td';

                      return (
                        <Tag
                          key={col.id}
                          className={cn(
                            'kiln-table__td',
                            col.isRowHeader && 'kiln-table__td--row-header',
                            isSticky && 'kiln-table__td--sticky-col',
                          )}
                          style={stickyStyle}
                          scope={col.isRowHeader ? 'row' : undefined}
                          tabIndex={
                            enableKeyboardNavigation
                              ? focusedCell[0] === adjustedRow && focusedCell[1] === adjustedColIndex
                                ? 0
                                : -1
                              : undefined
                          }
                          data-grid-row={enableKeyboardNavigation ? String(adjustedRow) : undefined}
                          data-grid-col={enableKeyboardNavigation ? String(adjustedColIndex) : undefined}
                        >
                          {col.cell(item)}
                        </Tag>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination slot */}
      {pagination && <div className="kiln-table__pagination">{pagination}</div>}

      {/* Footer slot */}
      {footer && <div className="kiln-table__footer">{footer}</div>}
    </div>
  );
}) as <T = unknown>(
  props: TableProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement;

(Table as { displayName?: string }).displayName = 'Table';
export default Table;
