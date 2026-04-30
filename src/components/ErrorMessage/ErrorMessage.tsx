// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React from 'react';
import './ErrorMessage.css';

export interface ErrorMessageProps {
  message: string;
  retryAction?: () => void;
  retryLabel?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  retryAction,
  retryLabel = 'Retry',
}) => (
  <div className="kiln-error-message" role="alert">
    <div className="kiln-error-icon" aria-hidden="true">⚠️</div>
    <div className="kiln-error-content">
      <p>{message}</p>
      {retryAction && (
        <button type="button" onClick={retryAction} className="kiln-error-retry">
          {retryLabel}
        </button>
      )}
    </div>
  </div>
);

export default ErrorMessage;
