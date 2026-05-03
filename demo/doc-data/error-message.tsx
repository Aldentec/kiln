import React from 'react';
import { ErrorMessage } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ErrorMessagePreview: React.FC = () => (
  <ErrorMessage
    message="Failed to load data — the server returned a 500 error."
    retryAction={() => {}}
    retryLabel="Retry"
  />
);

export const errorMessage: ComponentDoc = {
  id: 'error-message',
  name: 'ErrorMessage',
  description: 'Structured error state with message text and an optional retry button.',
  preview: ErrorMessagePreview,
  code: `import { ErrorMessage } from '@doriansmith/kiln';

<ErrorMessage
  message="Failed to load projects — the server returned an error."
  retryAction={() => refetch()}
  retryLabel="Retry"
/>`,
  props: [
    { name: 'message', type: 'string', default: '—', required: true, description: 'Error message text' },
    { name: 'retryAction', type: '() => void', default: '—', required: false, description: 'Callback for the retry button (shown when provided)' },
    { name: 'retryLabel', type: 'string', default: "'Retry'", required: false, description: 'Retry button label' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '@doriansmith/kiln';

it('renders message', () => {
  render(<ErrorMessage message="Something went wrong" />);
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});

it('shows retry button when retryAction provided', () => {
  const retry = vi.fn();
  render(<ErrorMessage message="Oops" retryAction={retry} />);
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  expect(retry).toHaveBeenCalled();
});`,
  usage: `// Error boundary fallback
{error && (
  <ErrorMessage
    message={error.message}
    retryAction={refetch}
    retryLabel="Try again"
  />
)}`,
};
