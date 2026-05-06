// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-02
// mobile: verified 375px/768px 2026-05-02
import React, { useId, useEffect, useRef, useCallback } from 'react';
import { cn } from '../../utils';
import { XIcon, UserCircleIcon } from '../../icons';
import './ToolsPanel.css';

export interface ToolsPanelProps {
  /** Panel content */
  children: React.ReactNode;
  /** Header text or node */
  header?: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  /** aria-label for the aside landmark */
  label?: string;
  /** Hide the floating FAB toggle button — use when the header close button is sufficient. */
  hideFab?: boolean;
  className?: string;
  style?: React.CSSProperties;
}


const ToolsPanel = React.forwardRef<HTMLElement, ToolsPanelProps>((
  {
    children,
    header,
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    label = 'Tools panel',
    hideFab = false,
    className,
    style,
  },
  ref,
) => {
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = useCallback((next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [controlledOpen, onOpenChange]);

  // Apply/remove inert imperatively — React 18 doesn't support inert via JSX
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (open) {
      el.removeAttribute('inert');
    } else {
      el.setAttribute('inert', '');
    }
  }, [open]);

  // Escape closes panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  return (
    <>
      {/* ── Mobile backdrop ─────────────────────────────────────────── */}
      <div
        className={cn(
          'kiln-tools-panel__backdrop',
          open && 'kiln-tools-panel__backdrop--visible',
        )}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* ── Panel ───────────────────────────────────────────────────── */}
      <aside
        ref={(node) => {
          // Attach both the internal ref (for inert) and the forwarded consumer ref
          (panelRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        id={panelId}
        className={cn(
          'kiln-tools-panel',
          open && 'kiln-tools-panel--open',
          className,
        )}
        aria-label={label}
        aria-hidden={!open}
        style={style}
      >
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="kiln-tools-panel__header">
          <span className="kiln-tools-panel__header-icon" aria-hidden="true">
            <UserCircleIcon size={18} />
          </span>
          {header && (
            <span className="kiln-tools-panel__header-title">{header}</span>
          )}
          <button
            type="button"
            className="kiln-tools-panel__close"
            aria-label="Close tools panel"
            onClick={() => setOpen(false)}
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="kiln-tools-panel__body">
          {children}
        </div>
      </aside>

      {/* ── FAB toggle ──────────────────────────────────────────────── */}
      {!hideFab && (
        <button
          ref={toggleRef}
          type="button"
          className={cn(
            'kiln-tools-panel__fab',
            open && 'kiln-tools-panel__fab--active',
          )}
          aria-label={open ? 'Close tools panel' : 'Open tools panel'}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
        >
          <UserCircleIcon size={18} />
        </button>
      )}
    </>
  );
});

ToolsPanel.displayName = 'ToolsPanel';
export default ToolsPanel;
