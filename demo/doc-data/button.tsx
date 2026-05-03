import React from 'react';
import { Button } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ButtonPreview: React.FC = () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="primary" loading>Loading</Button>
    <Button variant="primary" disabled>Disabled</Button>
  </div>
);

export const button: ComponentDoc = {
  id: 'button',
  name: 'Button',
  description: 'Triggers actions and navigates with four semantic variants and three sizes.',
  preview: ButtonPreview,
  code: `import { Button } from '@doriansmith/kiln';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// States
<Button loading>Saving…</Button>
<Button disabled>Disabled</Button>

// As a router link
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>`,
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", required: false, description: 'Visual semantic variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Button size' },
    { name: 'loading', type: 'boolean', default: 'false', required: false, description: 'Shows a spinner and disables interaction' },
    { name: 'leftIcon', type: 'React.ReactNode', default: '—', required: false, description: 'Icon rendered before the label' },
    { name: 'rightIcon', type: 'React.ReactNode', default: '—', required: false, description: 'Icon rendered after the label' },
    { name: 'href', type: 'string', default: '—', required: false, description: 'Renders an <a> tag when provided' },
    { name: 'asChild', type: 'boolean', default: 'false', required: false, description: 'Merges props onto child element (use with router links)' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the button' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Button label or content' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@doriansmith/kiln';

it('calls onClick handler', () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Click</Button>);
  fireEvent.click(screen.getByRole('button', { name: 'Click' }));
  expect(onClick).toHaveBeenCalledOnce();
});

it('does not fire onClick when disabled', () => {
  const onClick = vi.fn();
  render(<Button disabled onClick={onClick}>Click</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
});

it('shows spinner when loading', () => {
  render(<Button loading>Save</Button>);
  expect(screen.getByRole('button')).toHaveClass('kiln-button--loading');
});`,
  usage: `// Form submit
<Button type="submit" loading={submitting}>
  {submitting ? 'Saving…' : 'Save changes'}
</Button>

// Destructive action
<Button variant="danger" onClick={handleDelete}>
  Delete project
</Button>

// React Router / Next.js link
<Button asChild variant="secondary">
  <Link href="/settings">Settings</Link>
</Button>

// Icon button with accessible label
<Button variant="ghost" aria-label="Delete item">
  <TrashIcon aria-hidden />
</Button>`,
};
