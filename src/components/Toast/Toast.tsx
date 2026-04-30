// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import './Toast.css';

// ─── Types ────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  /** Optional bold title above the message. */
  title?: string;
  /**
   * Auto-dismiss duration in milliseconds. Default 4000.
   * Pass 0 for a persistent toast (requires manual dismiss).
   */
  duration?: number;
}

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  title?: string;
  duration: number;
}

// ─── Module-level event bus (no provider required) ────────

type AddListener = (item: ToastItem) => void;
type DismissListener = (id: string) => void;

let addListeners: AddListener[] = [];
let dismissListeners: DismissListener[] = [];
let idCounter = 0;

const bus = {
  onAdd(fn: AddListener) {
    addListeners.push(fn);
    return () => { addListeners = addListeners.filter(l => l !== fn); };
  },
  onDismiss(fn: DismissListener) {
    dismissListeners.push(fn);
    return () => { dismissListeners = dismissListeners.filter(l => l !== fn); };
  },
  emitAdd(item: ToastItem) { addListeners.forEach(l => l(item)); },
  emitDismiss(id: string) { dismissListeners.forEach(l => l(id)); },
};

function makeItem(variant: ToastVariant, message: string, opts?: ToastOptions): ToastItem {
  return {
    id: `kiln-toast-${++idCounter}`,
    variant,
    message,
    duration: opts?.duration ?? 4000,
    title: opts?.title,
  };
}

/**
 * Call anywhere in your app — no provider required.
 *
 * @example
 * toast.success('Changes saved.');
 * toast.error('Failed to save.', { title: 'Error', duration: 0 });
 */
export const toast = {
  success: (message: string, opts?: ToastOptions) => bus.emitAdd(makeItem('success', message, opts)),
  error:   (message: string, opts?: ToastOptions) => bus.emitAdd(makeItem('error',   message, opts)),
  warning: (message: string, opts?: ToastOptions) => bus.emitAdd(makeItem('warning', message, opts)),
  info:    (message: string, opts?: ToastOptions) => bus.emitAdd(makeItem('info',    message, opts)),
  dismiss: (id: string) => bus.emitDismiss(id),
};

// ─── Icons ────────────────────────────────────────────────

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM8 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 6zm0 8a1 1 0 100-2 1 1 0 000 2z"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"/>
  </svg>
);

const ICONS: Record<ToastVariant, React.FC> = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

// ─── Single Toast item ────────────────────────────────────

interface ToastItemProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastItemComponent: React.FC<ToastItemProps> = ({ item, onDismiss }) => {
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<number>(Date.now());
  const remainingRef = useRef<number>(item.duration);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
  }, [exiting]);

  // Auto-dismiss timer; pauses on hover/focus
  useEffect(() => {
    if (item.duration === 0 || paused || exiting) return;
    startRef.current = Date.now();
    const timer = setTimeout(dismiss, remainingRef.current);
    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startRef.current));
    };
  }, [item.duration, paused, exiting, dismiss]);

  const handleAnimationEnd = () => {
    // When the toast is in exiting state, any animation end means the exit
    // animation has completed — remove the element from the DOM.
    if (exiting) onDismiss(item.id);
  };

  const Icon = ICONS[item.variant];
  // Errors use assertive so they interrupt; all others use polite
  const liveRegion = item.variant === 'error' ? 'assertive' : 'polite';

  return (
    <div
      className={cn('kiln-toast', `kiln-toast--${item.variant}`, exiting && 'kiln-toast--exiting')}
      role="status"
      aria-live={liveRegion}
      aria-atomic="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className="kiln-toast__icon">
        <Icon />
      </span>

      <div className="kiln-toast__body">
        {item.title && <p className="kiln-toast__title">{item.title}</p>}
        <p className="kiln-toast__message">{item.message}</p>
      </div>

      <button
        type="button"
        className="kiln-toast__close"
        onClick={dismiss}
        aria-label="Dismiss notification"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path d="M2.22 2.22a.75.75 0 011.06 0L6 4.94l2.72-2.72a.75.75 0 111.06 1.06L7.06 6l2.72 2.72a.75.75 0 11-1.06 1.06L6 7.06 3.28 9.78a.75.75 0 01-1.06-1.06L4.94 6 2.22 3.28a.75.75 0 010-1.06z"/>
        </svg>
      </button>

      {item.duration > 0 && (
        <div
          className="kiln-toast__progress"
          style={{
            '--kiln-toast-duration': `${item.duration}ms`,
            animationPlayState: paused ? 'paused' : 'running',
          } as React.CSSProperties}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// ─── Toast Container ──────────────────────────────────────

export type ToastPosition =
  | 'top-right' | 'top-left' | 'top-center'
  | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface ToastContainerProps {
  /**
   * Where toasts appear on screen. Default: `"bottom-right"`.
   */
  position?: ToastPosition;
  /**
   * Maximum number of toasts shown simultaneously. Oldest are removed first.
   * Default: 5.
   */
  maxToasts?: number;
}

/**
 * Renders the toast stack. Place once near the root of your app.
 *
 * @example
 * // In App.tsx or main.tsx
 * <ToastContainer />
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'bottom-right',
  maxToasts = 5,
}) => {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubAdd = bus.onAdd((item) => {
      setItems(prev => {
        const next = [item, ...prev];
        return next.length > maxToasts ? next.slice(0, maxToasts) : next;
      });
    });
    const unsubDismiss = bus.onDismiss((id) => {
      setItems(prev => prev.filter(t => t.id !== id));
    });
    return () => { unsubAdd(); unsubDismiss(); };
  }, [maxToasts]);

  const handleDismiss = useCallback((id: string) => {
    setItems(prev => prev.filter(t => t.id !== id));
  }, []);

  if (items.length === 0 || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={cn('kiln-toast-container', `kiln-toast-container--${position}`)}
      aria-label="Notifications"
    >
      {items.map(item => (
        <ToastItemComponent key={item.id} item={item} onDismiss={handleDismiss} />
      ))}
    </div>,
    document.body,
  );
};
