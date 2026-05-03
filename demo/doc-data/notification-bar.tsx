import React, { useState } from 'react';
import { NotificationBar } from '@doriansmith/kiln';
import type { NotificationBarItem } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const NotificationBarPreview: React.FC = () => {
  const [items, setItems] = React.useState<NotificationBarItem[]>([
    { id: 'i1', type: 'info',    message: 'Your deployment is queued.',             dismissible: true },
    { id: 'i2', type: 'success', message: 'v1.2.0 published successfully.',          dismissible: true },
    { id: 'i3', type: 'warning', message: 'API rate limit at 85%.',                  dismissible: true },
    { id: 'i4', type: 'error',   message: 'Build failed — check the logs.',          dismissible: true },
  ]);
  const dismiss = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));
  return (
    <div style={{ width: '100%', maxWidth: 520 }}>
      <NotificationBar items={items.map((n) => ({ ...n, onDismiss: dismiss }))} />
      {items.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)' }}>
          All dismissed — refresh to reset.
        </p>
      )}
    </div>
  );
};

export const notificationBar: ComponentDoc = {
  id: 'notification-bar',
  name: 'NotificationBar',
  description: 'Stacked dismissible notification banners with info, success, warning, and error variants, type icons, and aria-live announcement.',
  preview: NotificationBarPreview,
  code: `import { NotificationBar } from '@doriansmith/kiln';

const [items, setItems] = useState([
  { id: 'i1', type: 'info',    message: 'Your deployment is queued.',    dismissible: true },
  { id: 'i2', type: 'success', message: 'v1.2.0 published successfully.', dismissible: true },
  { id: 'i3', type: 'warning', message: 'API rate limit at 85%.',         dismissible: true },
  { id: 'i4', type: 'error',   message: 'Build failed — check the logs.', dismissible: true },
]);

const dismiss = (id) => setItems((prev) => prev.filter((n) => n.id !== id));

<NotificationBar items={items.map((n) => ({ ...n, onDismiss: dismiss }))} />`,
  props: [
    { name: 'items', type: 'NotificationBarItem[]', default: '—', required: true, description: 'Array of notification items to display.' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles for CSS token overrides.' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationBar } from '@doriansmith/kiln';

it('renders all items', () => {
  const items = [
    { id: 'a', type: 'info' as const, message: 'Hello' },
    { id: 'b', type: 'error' as const, message: 'Oh no' },
  ];
  render(<NotificationBar items={items} />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
  expect(screen.getByText('Oh no')).toBeInTheDocument();
});

it('calls onDismiss with the item id', () => {
  const onDismiss = vi.fn();
  render(<NotificationBar items={[{ id: 'x', message: 'Msg', dismissible: true, onDismiss }]} />);
  fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
  expect(onDismiss).toHaveBeenCalledWith('x');
});

it('renders nothing when items is empty', () => {
  const { container } = render(<NotificationBar items={[]} />);
  expect(container.firstChild).toBeNull();
});`,
  usage: `// Controlled dismiss pattern
const [notes, setNotes] = useState([
  { id: '1', type: 'info', message: 'Build queued.', dismissible: true },
]);
const dismiss = (id) => setNotes((n) => n.filter((x) => x.id !== id));

<NotificationBar items={notes.map((n) => ({ ...n, onDismiss: dismiss }))} />

// Non-dismissible system notice
<NotificationBar items={[
  { id: 'maintenance', type: 'warning', message: 'Scheduled maintenance tonight 2–4 AM UTC.' }
]} />

// Custom padding via token
<NotificationBar
  items={items}
  style={{ '--kiln-notification-bar-padding-x': 'var(--kiln-space-4)' } as React.CSSProperties}
/>`,
};
