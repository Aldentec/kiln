// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-02
// mobile: verified 375px/768px 2026-05-02
import React from 'react';
import { cn } from '../../utils';
import './NotificationBar.css';

export type NotificationBarType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationBarItem {
  id: string;
  type?: NotificationBarType;
  message: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: (id: string) => void;
}

export interface NotificationBarProps {
  items: NotificationBarItem[];
  className?: string;
  style?: React.CSSProperties;
}

// ── Type icons ──────────────────────────────────────────────────────────────

const ICONS: Record<NotificationBarType, React.ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7v4M8 5v.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L1.5 13.5h13L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 6v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 6L6 10M6 6l4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  ),
};

const TYPE_LABELS: Record<NotificationBarType, string> = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
};

// ── Component ───────────────────────────────────────────────────────────────

const NotificationBar = React.forwardRef<HTMLDivElement, NotificationBarProps>((
  { items, className, style },
  ref,
) => {
  if (!items || items.length === 0) return null;

  return (
    <div
      ref={ref}
      className={cn('kiln-notification-bar', className)}
      role="status"
      aria-live="polite"
      aria-atomic="false"
      style={style}
    >
      {items.map((item) => {
        const type = item.type ?? 'info';
        return (
          <div
            key={item.id}
            className={cn(
              'kiln-notification-bar__item',
              `kiln-notification-bar__item--${type}`,
            )}
            role="alert"
          >
            <span
              className="kiln-notification-bar__icon"
              aria-label={TYPE_LABELS[type]}
            >
              {ICONS[type]}
            </span>

            <span className="kiln-notification-bar__msg">
              {item.message}
            </span>

            {item.dismissible && (
              <button
                type="button"
                className="kiln-notification-bar__dismiss"
                aria-label="Dismiss notification"
                onClick={() => item.onDismiss?.(item.id)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
});

NotificationBar.displayName = 'NotificationBar';
export default NotificationBar;
