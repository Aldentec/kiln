import React, { useState } from 'react';
import { Modal, Button } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ModalPreview: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm deletion">
        <p>This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export const modal: ComponentDoc = {
  id: 'modal',
  name: 'Modal',
  description: 'Accessible dialog overlay with focus trap, scroll lock, and keyboard dismissal.',
  preview: ModalPreview,
  code: `import { Modal, Button } from '@doriansmith/kiln';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm deletion">
  <p>This action cannot be undone.</p>
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '1rem' }}>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </div>
</Modal>`,
  props: [
    { name: 'isOpen', type: 'boolean', default: '—', required: true, description: 'Controls dialog visibility' },
    { name: 'onClose', type: '() => void', default: '—', required: true, description: 'Called when dismissed via Escape, overlay click, or close button' },
    { name: 'title', type: 'string', default: '—', required: false, description: 'Dialog heading (strongly recommended for accessibility)' },
    { name: 'ariaLabel', type: 'string', default: '—', required: false, description: 'Accessible label when no visible title is present' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: false, description: 'Dialog body content (body text, form, action buttons)' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes on the dialog panel' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@doriansmith/kiln';

it('renders when isOpen=true', () => {
  render(<Modal isOpen onClose={() => {}} title="Test"><p>Body</p></Modal>);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it('unmounts when isOpen=false', () => {
  render(<Modal isOpen={false} onClose={() => {}} title="Test"><p>Body</p></Modal>);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('calls onClose on Escape', () => {
  const onClose = vi.fn();
  render(<Modal isOpen onClose={onClose} title="Test"><p>Body</p></Modal>);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});`,
  usage: `// Confirmation dialog
<Modal
  isOpen={deleteConfirm}
  onClose={() => setDeleteConfirm(false)}
  title="Delete project?"
>
  <p>All data will be permanently removed.</p>
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '1rem' }}>
    <Button variant="ghost" onClick={() => setDeleteConfirm(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </div>
</Modal>

// Rich content modal
<Modal open={open} onClose={close} title="Edit profile">
  <form onSubmit={save}>
    <Input label="Display name" value={name} onChange={setName} />
    <Textarea label="Bio" value={bio} onChange={setBio} />
  </form>
</Modal>`,
};
