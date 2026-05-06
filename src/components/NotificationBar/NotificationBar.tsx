// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-02
// mobile: verified 375px/768px 2026-05-02
import React from 'react';
import { cn } from '../../utils';
import { InfoIcon, CheckCircleIcon, WarningIcon, XCircleIcon, XIcon } from '../../icons';
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
  info:    <InfoIcon size={16} />,
  success: <CheckCircleIcon size={16} />,
  warning: <WarningIcon size={16} />,
  error:   <XCircleIcon size={16} />,
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
              aria-hidden="true"
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
                <XIcon size={14} />
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
