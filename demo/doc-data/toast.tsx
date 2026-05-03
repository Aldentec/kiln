import React from 'react';
import { Button, toast as kilnToast, ToastContainer } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ToastPreview: React.FC = () => (
  <>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="secondary" size="sm" onClick={() => kilnToast.success('Project saved successfully')}>
        Success
      </Button>
      <Button variant="secondary" size="sm" onClick={() => kilnToast.info('Build started')}>
        Info
      </Button>
      <Button variant="secondary" size="sm" onClick={() => kilnToast.warning('Storage 90% full')}>
        Warning
      </Button>
      <Button variant="danger" size="sm" onClick={() => kilnToast.error('Deployment failed')}>
        Error
      </Button>
      <Button variant="secondary" size="sm" onClick={() => kilnToast.info('Deployment in progress…', { duration: 0 })}>
        Persistent
      </Button>
    </div>
    <ToastContainer />
  </>
);

export const toast: ComponentDoc = {
  id: 'toast',
  name: 'Toast',
  description: 'Non-blocking notification toasts with four severity variants and configurable position.',
  preview: ToastPreview,
  code: `import { Button, toast, ToastContainer } from '@doriansmith/kiln';

// Trigger buttons
<Button variant="secondary" size="sm" onClick={() => toast.success('Project saved successfully')}>Success</Button>
<Button variant="secondary" size="sm" onClick={() => toast.info('Build started')}>Info</Button>
<Button variant="secondary" size="sm" onClick={() => toast.warning('Storage 90% full')}>Warning</Button>
<Button variant="danger"    size="sm" onClick={() => toast.error('Deployment failed')}>Error</Button>
<Button variant="secondary" size="sm" onClick={() => toast.info('Deployment in progress…', { duration: 0 })}>Persistent</Button>

// Mount ToastContainer once at the app root
function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}`,
  props: [
    { name: 'toast.success(message, opts?)', type: 'function', default: '—', required: false, description: 'Show a success toast' },
    { name: 'toast.error(message, opts?)', type: 'function', default: '—', required: false, description: 'Show an error toast' },
    { name: 'toast.warning(message, opts?)', type: 'function', default: '—', required: false, description: 'Show a warning toast' },
    { name: 'toast.info(message, opts?)', type: 'function', default: '—', required: false, description: 'Show an info toast' },
    { name: 'opts.title', type: 'string', default: '—', required: false, description: 'Optional bold title above the message' },
    { name: 'opts.duration', type: 'number', default: '4000', required: false, description: 'Auto-dismiss delay in ms (0 = persistent)' },
    { name: 'ToastContainer.position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", default: "'bottom-right'", required: false, description: 'Screen position for the toast stack' },
  ],
  testing: `import { render, screen, act } from '@testing-library/react';
import { toast, ToastContainer } from '@doriansmith/kiln';

it('shows a success toast', async () => {
  render(<ToastContainer />);
  act(() => toast.success('Saved'));
  expect(await screen.findByText('Saved')).toBeInTheDocument();
});`,
  usage: `// After async action
async function handleSave() {
  try {
    await api.save(data);
    toast.success('Changes saved');
  } catch {
    toast.error('Failed to save — please try again');
  }
}

// Persistent toast (manual dismiss)
toast.info('Deployment in progress…', { duration: 0 });

// Mount once at root
<ToastContainer position="bottom-right" />`,
};
