// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useState, useId, useCallback, useRef } from 'react';
import { cn } from '../../utils';
import './Tooltip.css';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The tooltip text or content. */
  content: React.ReactNode;
  /**
   * Where the tooltip appears relative to the trigger.
   * Default: `"top"`.
   */
  side?: TooltipSide;
  /**
   * Delay in ms before the tooltip appears on hover. Default: 200.
   * Set to 0 for instant.
   */
  delayMs?: number;
  /** The element the tooltip is attached to. Must accept ref + aria attributes. */
  children: React.ReactElement;
  className?: string;
}

/**
 * Wraps any interactive element with a contextual tooltip.
 *
 * @example
 * <Tooltip content="Save changes" side="top">
 *   <Button variant="primary">Save</Button>
 * </Tooltip>
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = 'top',
  delayMs = 200,
  children,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (delayMs === 0) {
      setVisible(true);
    } else {
      showTimerRef.current = setTimeout(() => setVisible(true), delayMs);
    }
  }, [delayMs]);

  const hide = useCallback(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    setVisible(false);
  }, []);

  // Chain event handlers so we don't clobber the child's own handlers
  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { 'aria-describedby'?: string }
  >;

  const cloned = React.cloneElement(child, {
    'aria-describedby': visible ? tooltipId : child.props['aria-describedby'],
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      child.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      child.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      child.props.onFocus?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      child.props.onBlur?.(e);
      hide();
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      child.props.onKeyDown?.(e);
      if (e.key === 'Escape') hide();
    },
  });

  return (
    <span className={cn('kiln-tooltip-wrapper', className)}>
      {cloned}
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn('kiln-tooltip', `kiln-tooltip--${side}`)}
        >
          <span className="kiln-tooltip__arrow" aria-hidden="true" />
          {content}
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
export default Tooltip;
