import React, { useState } from 'react';
import { SideNav } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const PREVIEW_GROUPS = [
  {
    label: 'Components',
    items: [
      { id: 'accordion', label: 'Accordion' },
      { id: 'button', label: 'Button' },
      { id: 'card', label: 'Card' },
      { id: 'chip', label: 'Chip', badge: 'New' },
      { id: 'input', label: 'Input' },
      { id: 'modal', label: 'Modal' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { id: 'grid', label: 'Grid' },
      { id: 'header', label: 'Header' },
    ],
  },
];

const LABEL: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--kiln-gray-500)',
};

const SideNavPreview: React.FC = () => {
  const [active, setActive] = useState('card');
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap', width: '100%' }}>

      {/* ── Plain mode (no header/toggle) ── */}
      <div>
        <p style={LABEL}>Plain</p>
        <div style={{
          width: 220,
          background: 'var(--kiln-surface)',
          border: '1px solid var(--kiln-gray-200)',
          borderRadius: 'var(--kiln-radius-xl)',
          overflow: 'hidden',
        }}>
          <SideNav
            groups={PREVIEW_GROUPS}
            activeId={active}
            onSelect={setActive}
          />
        </div>
      </div>

      {/* ── Collapsible mode (header + toggle) ── */}
      <div>
        <p style={LABEL}>Collapsible</p>
        <SideNav
          header="Navigation"
          open={open}
          onOpenChange={setOpen}
          groups={PREVIEW_GROUPS}
          activeId={active}
          onSelect={setActive}
        />
      </div>

    </div>
  );
};

export const sideNav: ComponentDoc = {
  id: 'side-nav',
  name: 'SideNav',
  description: 'Persistent vertical navigation sidebar with grouped items and keyboard navigation.',
  preview: SideNavPreview,
  code: `import { SideNav } from '@doriansmith/kiln';

const groups = [
  {
    label: 'Components',
    items: [
      { id: 'accordion', label: 'Accordion' },
      { id: 'button',    label: 'Button' },
      { id: 'card',      label: 'Card' },
      { id: 'chip',      label: 'Chip', badge: 'New' },
      { id: 'input',     label: 'Input' },
      { id: 'modal',     label: 'Modal' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { id: 'grid',   label: 'Grid' },
      { id: 'header', label: 'Header' },
    ],
  },
];

const [active, setActive] = useState('card');
const [open, setOpen] = useState(true);

// Plain mode — no toggle, always visible
<SideNav
  groups={groups}
  activeId={active}
  onSelect={setActive}
/>

// Collapsible mode — header + expand/collapse button
<SideNav
  header="Navigation"
  open={open}
  onOpenChange={setOpen}
  groups={groups}
  activeId={active}
  onSelect={setActive}
/>`,
  props: [
    { name: 'groups', type: 'SideNavGroup[]', default: '—', required: true, description: 'Navigation groups (each has optional label + items array)' },
    { name: 'activeId', type: 'string', default: '—', required: false, description: 'Currently active item id' },
    { name: 'onSelect', type: '(id: string) => void', default: '—', required: false, description: 'Called when an item is clicked' },
    { name: 'header', type: 'React.ReactNode', default: '—', required: false, description: 'Label shown in the collapsible header bar. Providing this (or open/onOpenChange) enables collapsible mode.' },
    { name: 'open', type: 'boolean', default: '—', required: false, description: 'Controlled open state. Enables collapsible mode.' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when open state should change.' },
    { name: 'defaultOpen', type: 'boolean', default: 'true on ≥768px', required: false, description: 'Initial open state (uncontrolled). Enables collapsible mode.' },
    { name: 'width', type: 'string', default: "'14rem'", required: false, description: 'Sidebar width — sets --kiln-side-nav-width.' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-side-nav-* token overrides' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { SideNav } from '@doriansmith/kiln';

const groups = [{ items: [{ id: 'home', label: 'Home' }, { id: 'about', label: 'About' }] }];

it('renders all items', () => {
  render(<SideNav groups={groups} />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
});

it('marks active item', () => {
  render(<SideNav groups={groups} activeId="home" />);
  expect(screen.getByText('Home').closest('button')).toHaveClass('kiln-side-nav__link--active');
});

it('calls onSelect with item id', () => {
  const onSelect = vi.fn();
  render(<SideNav groups={groups} onSelect={onSelect} />);
  fireEvent.click(screen.getByText('About'));
  expect(onSelect).toHaveBeenCalledWith('about');
});`,
  usage: `// Collapsible sidebar inside AppLayout
const [open, setOpen] = useState(true);

<AppLayout
  sideBar={
    <SideNav
      header="Navigation"
      open={open}
      onOpenChange={setOpen}
      width="15rem"
      activeId={page}
      onSelect={setPage}
      groups={NAV_GROUPS}
    />
  }
>
  <Content />
</AppLayout>

// Plain (non-collapsible) inline nav
<SideNav
  activeId={page}
  onSelect={setPage}
  groups={NAV_GROUPS}
/>`,
};
