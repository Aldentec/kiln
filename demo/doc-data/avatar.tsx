import React from 'react';
import { Avatar } from '@doriansmith/kiln';
import type { DropdownMenuEntry } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const menuItems: DropdownMenuEntry[] = [
  { label: 'Profile', onSelect: () => {} },
  { label: 'Settings', onSelect: () => {} },
  { type: 'separator' },
  { label: 'Sign out', onSelect: () => {}, variant: 'danger' },
];

const AvatarPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>

    {/* Initials row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar name="Dorian Smith" size="xs" />
      <Avatar name="Dorian Smith" size="sm" />
      <Avatar name="Dorian Smith" size="md" />
      <Avatar name="Dorian Smith" size="lg" />
      <Avatar name="Dorian Smith" size="xl" />
    </div>

    {/* Image fallback + color variety */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar name="Alice Chen" size="md" />
      <Avatar name="Bob Martinez" size="md" />
      <Avatar name="Carol White" size="md" />
      <Avatar name="Diana Patel" size="md" />
      <Avatar size="md" />
    </div>

    {/* With dropdown menu */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar
        name="Dorian Smith"
        size="md"
        menuItems={menuItems}
        menuAlign="end"
      />
      <span style={{ fontSize: '0.8125rem', color: 'var(--kiln-gray-500)' }}>
        Click the avatar →
      </span>
    </div>

  </div>
);

export const avatar: ComponentDoc = {
  id: 'avatar',
  name: 'Avatar',
  description: 'Circular user avatar showing an image, auto-derived initials, or a fallback icon. Optionally opens a dropdown menu — ideal for navbar user menus.',
  preview: AvatarPreview,
  code: `import { Avatar } from '@doriansmith/kiln';
import type { DropdownMenuEntry } from '@doriansmith/kiln';

// ── All five sizes ─────────────────────────────────────────
<Avatar name="Dorian Smith" size="xs" />
<Avatar name="Dorian Smith" size="sm" />
<Avatar name="Dorian Smith" size="md" />
<Avatar name="Dorian Smith" size="lg" />
<Avatar name="Dorian Smith" size="xl" />

// ── Color variety (deterministic hue from name) + fallback ─
<Avatar name="Alice Chen"   size="md" />
<Avatar name="Bob Martinez" size="md" />
<Avatar name="Carol White"  size="md" />
<Avatar name="Diana Patel"  size="md" />
<Avatar size="md" />  {/* no name → fallback icon */}

// ── Dropdown menu (click to open) ─────────────────────────
const menuItems: DropdownMenuEntry[] = [
  { label: 'Profile',  onSelect: () => {} },
  { label: 'Settings', onSelect: () => {} },
  { type: 'separator' },
  { label: 'Sign out', onSelect: () => {}, variant: 'danger' },
];

<Avatar
  name="Dorian Smith"
  size="md"
  menuItems={menuItems}
  menuAlign="end"
/>`,
  props: [
    { name: 'name', type: 'string', default: '—', required: false, description: 'Full name — initials are derived automatically (first + last initial). Also used as the accessible label.' },
    { name: 'initials', type: 'string', default: '—', required: false, description: 'Explicit 1–2 character initials. Overrides derivation from name.' },
    { name: 'src', type: 'string', default: '—', required: false, description: 'URL of the avatar image. Takes priority over initials. Falls back to initials on load error.' },
    { name: 'alt', type: 'string', default: 'name', required: false, description: 'Alt text for the avatar image. Defaults to the name prop when omitted.' },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", required: false, description: 'Diameter of the avatar circle.' },
    { name: 'menuItems', type: 'DropdownMenuEntry[]', default: '—', required: false, description: 'When provided, the avatar becomes a button that opens a dropdown menu. Same entry format as DropdownMenu.' },
    { name: 'menuAlign', type: "'start' | 'end'", default: "'end'", required: false, description: 'Horizontal alignment of the dropdown relative to the avatar.' },
    { name: 'menuSide', type: "'bottom' | 'top'", default: "'bottom'", required: false, description: 'Which side of the avatar the dropdown opens on.' },
    { name: 'menuAriaLabel', type: 'string', default: '"[name] menu"', required: false, description: 'Accessible label for the trigger button and menu. Defaults to "[name] menu".' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the root element.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles. Use CSS token overrides like --kiln-avatar-size-md.' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '@doriansmith/kiln';

it('renders initials derived from name', () => {
  render(<Avatar name="Jane Smith" />);
  expect(screen.getByText('JS')).toBeInTheDocument();
});

it('renders a button when menuItems are provided', () => {
  render(
    <Avatar
      name="Jane Smith"
      menuItems={[{ label: 'Sign out', onSelect: vi.fn() }]}
    />
  );
  expect(screen.getByRole('button', { name: 'Jane Smith menu' })).toBeInTheDocument();
});

it('opens menu on click', async () => {
  render(
    <Avatar
      name="Jane Smith"
      menuItems={[{ label: 'Sign out', onSelect: vi.fn() }]}
    />
  );
  fireEvent.click(screen.getByRole('button'));
  expect(await screen.findByRole('menu')).toBeInTheDocument();
});

it('falls back to initials on image error', async () => {
  render(<Avatar src="broken.jpg" name="Jane Smith" />);
  const img = screen.getByRole('img', { name: 'Jane Smith' });
  fireEvent.error(img);
  expect(await screen.findByText('JS')).toBeInTheDocument();
});`,
  usage: `// Navbar user menu (most common use)
import { Nav, Avatar } from '@doriansmith/kiln';

<Nav
  logo={logo}
  items={navItems}
  actions={
    <Avatar
      name={user.name}
      src={user.avatarUrl}
      size="sm"
      menuItems={[
        { label: 'My profile',  onSelect: () => navigate('/profile') },
        { label: 'Settings',    onSelect: () => navigate('/settings') },
        { type: 'separator' },
        { label: 'Sign out',    onSelect: () => auth.signOut(), variant: 'danger' },
      ]}
      menuAlign="end"
    />
  }
/>

// Avatar group (stack of users)
<div style={{ display: 'flex', marginLeft: '8px' }}>
  {assignees.map((user, i) => (
    <Avatar
      key={user.id}
      name={user.name}
      src={user.avatar}
      size="sm"
      style={{ marginLeft: i > 0 ? '-8px' : 0, zIndex: assignees.length - i }}
    />
  ))}
</div>`,
};
