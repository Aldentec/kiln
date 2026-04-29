import React from 'react';
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
  const classes = [
    'kiln-loading-indicator',
    fullScreen ? 'kiln-loading-indicator--fullscreen' : '',
    inline ? 'kiln-loading-indicator--inline' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" aria-live="polite">
      <div className="kiln-spinner" aria-hidden="true" />
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoadingIndicator;
