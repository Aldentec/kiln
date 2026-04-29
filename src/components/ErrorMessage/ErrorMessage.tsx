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
        <button onClick={retryAction} className="kiln-error-retry">
          {retryLabel}
        </button>
      )}
    </div>
  </div>
);

export default ErrorMessage;
