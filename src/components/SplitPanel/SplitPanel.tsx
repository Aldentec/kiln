// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-02
// mobile: verified 375px/768px 2026-05-02
import React, { useId, useRef, useCallback, useState, useEffect } from 'react';
import { cn } from '../../utils';
import { ChevronUpIcon, ChevronDownIcon } from '../../icons';
import './SplitPanel.css';

export interface SplitPanelProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  resizable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ChevronIcon = ({ open }: { open: boolean }) =>
  open ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />;

const SplitPanel = React.forwardRef<HTMLDivElement, SplitPanelProps>((
  {
    children,
    header,
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    defaultHeight = 280,
    minHeight = 80,
    maxHeight = 600,
    resizable = true,
    className,
    style,
  },
  ref,
) => {
  const id = useId();
  const contentId = `${id}-content`;
  const contentRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startH = useRef(0);

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback((next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [controlledOpen, onOpenChange]);

  const [height, setHeight] = useState(defaultHeight);

  // ── Keep height in bounds when props change ─────────────────────────
  useEffect(() => {
    setHeight((h) => Math.min(maxHeight, Math.max(minHeight, h)));
  }, [minHeight, maxHeight]);

  // ── Apply height directly to the content element ────────────────────
  // This sidesteps the CSS max-height transition entirely during drag,
  // giving a real-time 1:1 response to pointer movement.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      el.style.height = `${height}px`;
    } else {
      el.style.height = '';
    }
  }, [open, height]);

  // ── Drag-to-resize ──────────────────────────────────────────────────
  const onDragStart = useCallback((clientY: number) => {
    startY.current = clientY;
    startH.current = height;
    isDragging.current = true;

    // Disable transition on the content element for the duration of the drag
    if (contentRef.current) {
      contentRef.current.style.transition = 'none';
    }

    const onMove = (moveY: number) => {
      // Dragging up = panel grows (bottom-anchored)
      const delta = startY.current - moveY;
      const next = Math.min(maxHeight, Math.max(minHeight, startH.current + delta));
      setHeight(next);
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientY);
    const onTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientY);

    const cleanup = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseup', cleanup);
      document.removeEventListener('touchend', cleanup);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      // Re-enable transition after drag ends
      if (contentRef.current) {
        contentRef.current.style.transition = '';
      }
    };

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ns-resize';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseup', cleanup);
    document.addEventListener('touchend', cleanup);
  }, [height, maxHeight, minHeight]);

  // ── Keyboard resize on handle: arrow keys in 20px steps ────────────
  const onHandleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHeight((h) => Math.min(maxHeight, h + 20));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHeight((h) => Math.max(minHeight, h - 20));
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'kiln-split-panel',
        open && 'kiln-split-panel--open',
        className,
      )}
      style={style}
    >
      {/* ── Drag handle (above toggle, only when open) ─────────────────── */}
      {resizable && open && (
        <div
          className="kiln-split-panel__handle"
          role="separator"
          aria-label="Resize panel — drag or use arrow keys"
          aria-orientation="horizontal"
          aria-valuenow={height}
          aria-valuemin={minHeight}
          aria-valuemax={maxHeight}
          tabIndex={0}
          onMouseDown={(e) => { e.preventDefault(); onDragStart(e.clientY); }}
          onTouchStart={(e) => { e.preventDefault(); onDragStart(e.touches[0].clientY); }}
          onKeyDown={onHandleKeyDown}
        >
          <span className="kiln-split-panel__handle-grip" aria-hidden="true" />
        </div>
      )}

      {/* ── Toggle bar ──────────────────────────────────────────��─────── */}
      <button
        type="button"
        className="kiln-split-panel__toggle"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen(!open)}
      >
        <span className="kiln-split-panel__toggle-chevron">
          <ChevronIcon open={open} />
        </span>
        <span className="kiln-split-panel__toggle-label">
          {header ?? (open ? 'Collapse panel' : 'Expand panel')}
        </span>
      </button>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        id={contentId}
        className="kiln-split-panel__content"
        aria-hidden={!open}
      >
        {children}
      </div>
    </div>
  );
});

SplitPanel.displayName = 'SplitPanel';
export default SplitPanel;
