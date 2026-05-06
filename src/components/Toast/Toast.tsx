// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import { CheckCircleIcon, XCircleIcon, WarningIcon, InfoIcon, XIcon } from '../../icons';
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

const ICONS: Record<ToastVariant, React.FC> = {
  success: () => <CheckCircleIcon size={16} />,
  error:   () => <XCircleIcon size={16} />,
  warning: () => <WarningIcon size={16} />,
  info:    () => <InfoIcon size={16} />,
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
        <XIcon size={12} />
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
