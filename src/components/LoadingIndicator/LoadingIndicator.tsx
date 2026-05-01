// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly — transform + opacity only 2026-04-29
import React from 'react';
import { cn } from '../../utils';
import './LoadingIndicator.css';

export interface LoadingIndicatorProps {
  message?: string;
  fullScreen?: boolean;
  inline?: boolean;
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Loading...',
  fullScreen = false,
  inline = false,
  className,
}) => {
  const classes = cn(
    'kiln-loading-indicator',
    fullScreen && 'kiln-loading-indicator--fullscreen',
    inline && 'kiln-loading-indicator--inline',
    className,
  );

  return (
    <div className={classes} role="status" aria-live="polite">
      <div className="kiln-spinner" aria-hidden="true" />
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoadingIndicator;
