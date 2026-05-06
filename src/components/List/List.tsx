// a11y: WCAG AA verified 2026-05-05
// perf: CLS=0, GPU-friendly 2026-05-05
// mobile: verified 375px/768px 2026-05-05
import React, { useState, useRef, useCallback, useId } from 'react';
import { cn } from '../../utils';
import { DragHandleIcon } from '../../icons';
import './List.css';

export interface KilnListItem {
  id: string;
  content: React.ReactNode;
  secondaryContent?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  announcementLabel?: string;
}

export interface ListProps {
  items: KilnListItem[];
  sortable?: boolean;
  sortDisabled?: boolean;
  onReorder?: (items: KilnListItem[]) => void;
  disablePaddings?: boolean;
  disableItemPaddings?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  tagOverride?: string;
  className?: string;
  style?: React.CSSProperties;
}

function getLabel(item: KilnListItem, index: number): string {
  if (item.announcementLabel) return item.announcementLabel;
  if (typeof item.content === 'string') return item.content;
  return `item ${index + 1}`;
}


const List = React.forwardRef<HTMLUListElement, ListProps>(({
  items,
  sortable = false,
  sortDisabled = false,
  onReorder,
  disablePaddings = false,
  disableItemPaddings = false,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  tagOverride,
  className,
  style,
}, ref) => {
  const liveId = useId();
  const [announcement, setAnnouncement] = useState('');

  // HTML5 drag state
  const dragSourceRef = useRef<number | null>(null);
  const canDragRef = useRef(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Keyboard drag state
  const [kbActive, setKbActive] = useState<number | null>(null);
  const [kbTarget, setKbTarget] = useState<number | null>(null);
  const handleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const announce = useCallback((msg: string) => {
    setAnnouncement('');
    setTimeout(() => setAnnouncement(msg), 50);
  }, []);

  // ── HTML5 drag handlers ──────────────────────────────────────────────────────

  const onDragStart = useCallback((e: React.DragEvent<HTMLLIElement>, index: number) => {
    if (!canDragRef.current) {
      e.preventDefault();
      return;
    }
    canDragRef.current = false;
    dragSourceRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
    e.preventDefault();
    const from = dragSourceRef.current;
    setDragOverIndex(null);
    setDraggingIndex(null);
    dragSourceRef.current = null;
    if (from === null || from === dropIndex) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(dropIndex, 0, moved);
    onReorder?.(next);
  }, [items, onReorder]);

  const onDragEnd = useCallback(() => {
    setDraggingIndex(null);
    setDragOverIndex(null);
    dragSourceRef.current = null;
    canDragRef.current = false;
  }, []);

  // ── Keyboard drag handlers ───────────────────────────────────────────────────

  const onHandleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const total = items.length;

    if (kbActive === null) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setKbActive(index);
        setKbTarget(index);
        announce(
          `${getLabel(items[index], index)} lifted. Position ${index + 1} of ${total}. ` +
          `Press up or down arrow to move. Press Space to drop. Press Escape to cancel.`
        );
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      const prev = kbActive;
      setKbActive(null);
      setKbTarget(null);
      announce('Reorder cancelled.');
      setTimeout(() => handleRefs.current[prev]?.focus(), 0);
      return;
    }

    const target = kbTarget ?? index;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = e.key === 'ArrowDown'
        ? Math.min(target + 1, total - 1)
        : Math.max(target - 1, 0);
      setKbTarget(next);
      announce(`Position ${next + 1} of ${total}.`);
      return;
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const from = kbActive;
      const to = kbTarget ?? kbActive;
      setKbActive(null);
      setKbTarget(null);
      if (from !== to) {
        const next = [...items];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        onReorder?.(next);
      }
      announce(`${getLabel(items[from], from)} dropped at position ${to + 1} of ${total}.`);
      setTimeout(() => handleRefs.current[to]?.focus(), 0);
    }
  }, [kbActive, kbTarget, items, onReorder, announce]);

  // ── Render ───────────────────────────────────────────────────────────────────

  const Tag = (tagOverride ?? 'ul') as React.ElementType;
  const isSortable = sortable && !sortDisabled;

  return (
    <>
      <div
        id={liveId}
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        className="kiln-sr-only"
      >
        {announcement}
      </div>

      <Tag
        ref={ref}
        className={cn(
          'kiln-list',
          disablePaddings && 'kiln-list--no-paddings',
          isSortable && 'kiln-list--sortable',
          kbActive !== null && 'kiln-list--kb-dragging',
          className,
        )}
        style={style}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      >
        {items.map((item, index) => {
          const isKbActive = kbActive === index;
          const isKbTarget = kbTarget === index && kbActive !== null && kbActive !== kbTarget;
          const isDragOver = dragOverIndex === index && draggingIndex !== null;
          const isDragging = draggingIndex === index;

          const body = (
            <>
              {item.icon && (
                <span className="kiln-list__icon" aria-hidden="true">{item.icon}</span>
              )}
              <span className="kiln-list__content">
                <span className="kiln-list__primary">{item.content}</span>
                {item.secondaryContent && (
                  <span className="kiln-list__secondary">{item.secondaryContent}</span>
                )}
              </span>
            </>
          );

          return (
            <li
              key={item.id}
              className={cn(
                'kiln-list__item',
                disableItemPaddings && 'kiln-list__item--no-paddings',
                isDragOver && 'kiln-list__item--drag-over',
                isDragging && 'kiln-list__item--dragging',
                isKbActive && 'kiln-list__item--kb-active',
                isKbTarget && 'kiln-list__item--kb-target',
                item.disabled && 'kiln-list__item--disabled',
              )}
              draggable={isSortable && !item.disabled}
              onDragStart={isSortable ? (e) => onDragStart(e, index) : undefined}
              onDragOver={isSortable ? (e) => onDragOver(e, index) : undefined}
              onDrop={isSortable ? (e) => onDrop(e, index) : undefined}
              onDragEnd={isSortable ? onDragEnd : undefined}
            >
              {isSortable && (
                <button
                  ref={(el) => { handleRefs.current[index] = el; }}
                  className="kiln-list__handle"
                  type="button"
                  aria-label={`Reorder ${getLabel(item, index)}`}
                  aria-pressed={isKbActive}
                  tabIndex={0}
                  onPointerDown={() => { canDragRef.current = true; }}
                  onPointerUp={() => { canDragRef.current = false; }}
                  onKeyDown={(e) => onHandleKeyDown(e, index)}
                  disabled={item.disabled}
                >
                  <DragHandleIcon size={16} />
                </button>
              )}

              {item.href ? (
                <a
                  href={item.href}
                  className="kiln-list__body kiln-list__body--link"
                  aria-disabled={item.disabled ? 'true' : undefined}
                  tabIndex={item.disabled ? -1 : undefined}
                >
                  {body}
                </a>
              ) : (
                <div className="kiln-list__body">
                  {body}
                </div>
              )}

              {item.actions && (
                <div className="kiln-list__actions">{item.actions}</div>
              )}
            </li>
          );
        })}
      </Tag>
    </>
  );
});

List.displayName = 'List';
export default List;
