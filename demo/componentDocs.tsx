import React, { useState } from 'react';
import {
  Accordion, Badge, Button, Card, Chip, CodeBlock,
  DropdownMenu, ErrorMessage, Footer, Input, LoadingIndicator,
  Modal, MobileNav, NavMenu, ScrollToTop, Tabs, Textarea, ThemeToggle, Tooltip,
  TableOfContents, SideNav, toast, ToastContainer,
} from '@doriansmith/kiln';
import type { DropdownMenuEntry, AccordionItem } from '@doriansmith/kiln';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PropDef {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  description: string;
  preview: React.FC;
  code: string;
  props: PropDef[];
  testing: string;
  usage: string;
}

// ─── Preview components ────────────────────────────────────────────────────────

const AccordionPreview: React.FC = () => {
  const items: AccordionItem[] = [
    { id: 'q1', title: 'What is Kiln?', content: 'A CSS-first React component library built for indie developers and small teams.' },
    { id: 'q2', title: 'Does it support dark mode?', content: 'Yes — add data-theme="dark" to <html> and every component adapts automatically.' },
    { id: 'q3', title: 'Is TypeScript required?', content: 'No, but all props are fully typed with inferred generics for a smooth DX.' },
  ];
  return <Accordion items={items} defaultOpenIds={['q1']} />;
};

const BadgePreview: React.FC = () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="pending">Pending</Badge>
    <Badge variant="critical">Critical</Badge>
  </div>
);

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

const CardPreview: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', width: '100%' }}>
    <Card variant="default">
      <p style={{ margin: 0, fontWeight: 600 }}>Default</p>
      <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>Standard card with top strip</p>
    </Card>
    <Card variant="raised">
      <p style={{ margin: 0, fontWeight: 600 }}>Raised</p>
      <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>Elevated shadow with glow</p>
    </Card>
    <Card variant="gradient-border">
      <p style={{ margin: 0, fontWeight: 600 }}>Gradient Border</p>
      <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>Animated gradient outline</p>
    </Card>
  </div>
);

const ChipPreview: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set(['react']));
  const chips = ['React', 'TypeScript', 'CSS', 'Accessibility', 'Performance'];
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {chips.map((c) => (
        <Chip
          key={c}
          selected={selected.has(c.toLowerCase())}
          onToggle={(sel) => {
            const next = new Set(selected);
            if (sel) next.add(c.toLowerCase()); else next.delete(c.toLowerCase());
            setSelected(next);
          }}
        >
          {c}
        </Chip>
      ))}
    </div>
  );
};

const CodeBlockPreview: React.FC = () => (
  <CodeBlock
    language="tsx"
    code={`import { Button } from '@doriansmith/kiln';

export default function App() {
  return <Button variant="primary">Ship it</Button>;
}`}
  />
);

const DropdownMenuPreview: React.FC = () => {
  const items: DropdownMenuEntry[] = [
    { label: 'Edit', onSelect: () => {} },
    { label: 'Duplicate', onSelect: () => {} },
    { type: 'separator' },
    { label: 'Archive', onSelect: () => {}, variant: 'danger' },
  ];
  return (
    <DropdownMenu
      trigger={<Button variant="secondary">Actions ▾</Button>}
      items={items}
    />
  );
};

const ErrorMessagePreview: React.FC = () => (
  <ErrorMessage
    message="Failed to load data — the server returned a 500 error."
    retryAction={() => {}}
    retryLabel="Retry"
  />
);

const InputPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
    <Input label="Email address" placeholder="you@example.com" />
    <Input label="Username" helperText="3–20 characters, letters and numbers only" defaultValue="dorian_dev" />
    <Input label="Password" errorText="Must be at least 8 characters" defaultValue="pass" type="password" />
  </div>
);

const LoadingIndicatorPreview: React.FC = () => (
  <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
    <LoadingIndicator inline message="Inline" />
    <LoadingIndicator message="Default" />
  </div>
);

const ModalPreview: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
      >
        <p style={{ margin: '0 0 1.25rem', color: 'var(--kiln-gray-600)' }}>
          This will permanently delete the selected item. This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
        </div>
      </Modal>
    </>
  );
};

const SideNavPreview: React.FC = () => {
  const [active, setActive] = useState('badge');
  return (
    <Card variant="default" style={{ '--kiln-card-padding': '0' } as React.CSSProperties}>
      <SideNav
        style={{ padding: '12px 8px' }}
        activeId={active}
        onSelect={setActive}
        groups={[{
          label: 'Components',
          items: [
            { id: 'accordion', label: 'Accordion' },
            { id: 'badge', label: 'Badge' },
            { id: 'button', label: 'Button' },
            { id: 'card', label: 'Card' },
            { id: 'chip', label: 'Chip', badge: 'New' },
          ],
        }]}
      />
    </Card>
  );
};

const TabsPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>Pill (default)</p>
      <Tabs
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'settings', label: 'Settings' },
          { value: 'logs', label: 'Logs' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
        defaultValue="overview"
      />
    </div>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>Underline</p>
      <Tabs
        variant="underline"
        items={[
          { value: 'preview', label: 'Preview' },
          { value: 'api', label: 'API' },
          { value: 'testing', label: 'Testing' },
          { value: 'usage', label: 'Usage' },
        ]}
        defaultValue="preview"
      />
    </div>
  </div>
);

const TableOfContentsPreview: React.FC = () => (
  <TableOfContents
    items={[
      { id: 'install', label: 'Installation', level: 1 },
      { id: 'usage', label: 'Basic usage', level: 2 },
      { id: 'variants', label: 'Variants', level: 2 },
      { id: 'props', label: 'Props', level: 1 },
      { id: 'dark', label: 'Dark mode', level: 1 },
    ]}
    heading="On this page"
  />
);

const TextareaPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
    <Textarea label="Description" placeholder="Describe your project..." rows={3} />
    <Textarea label="Bio" helperText="Up to 200 characters" defaultValue="Indie developer building things." rows={3} />
    <Textarea label="Notes" errorText="This field is required" rows={3} />
  </div>
);

const ThemeTogglePreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
    <ThemeToggle />
    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>
      Persists preference to localStorage
    </p>
  </div>
);

const FooterPreview: React.FC = () => (
  <div style={{ width: '100%' }}>
    <Footer
      logo={<strong style={{ fontSize: '1.125rem' }}>Kiln</strong>}
      links={[
        { href: '#', label: 'Docs' },
        { href: '#', label: 'GitHub', external: true },
        { href: '#', label: 'npm', external: true },
      ]}
      copyright="© 2026 Dorian Smith"
      credit="Built with Kiln"
    />
  </div>
);

const NavMenuPreview: React.FC = () => {
  const [active, setActive] = useState('/');
  const items = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
    { href: '/components', label: 'Components' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start', width: '100%' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>NavMenu — desktop links</p>
        <NavMenu
          items={items}
          isActive={(href) => href === active}
          onNavigate={(href, e) => { e.preventDefault(); setActive(href); }}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>MobileNav — hamburger drawer</p>
        <MobileNav
          items={items.map((i) => ({ ...i }))}
          logo={<strong>Kiln</strong>}
          isActive={(href) => href === active}
          onNavigate={(href, e) => { e.preventDefault(); setActive(href); }}
        />
      </div>
    </div>
  );
};

const ScrollToTopPreview: React.FC = () => {
  const [trigger, setTrigger] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <ScrollToTop trigger={trigger} behavior="smooth" />
      <Button variant="secondary" onClick={() => setTrigger((t) => t + 1)}>
        Scroll to top
      </Button>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>
        Renders null — fires window.scrollTo on trigger change
      </p>
    </div>
  );
};

const ToastPreview: React.FC = () => (
  <>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="secondary" size="sm" onClick={() => toast.success('Project saved successfully')}>
        Success
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast.info('Build started')}>
        Info
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast.warning('Storage 90% full')}>
        Warning
      </Button>
      <Button variant="danger" size="sm" onClick={() => toast.error('Deployment failed')}>
        Error
      </Button>
    </div>
    <ToastContainer />
  </>
);

const TooltipPreview: React.FC = () => (
  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
    <Tooltip content="Appears above" side="top"><Button variant="ghost" size="sm">Top</Button></Tooltip>
    <Tooltip content="Appears below" side="bottom"><Button variant="ghost" size="sm">Bottom</Button></Tooltip>
    <Tooltip content="Appears to the left" side="left"><Button variant="ghost" size="sm">Left</Button></Tooltip>
    <Tooltip content="Appears to the right" side="right"><Button variant="ghost" size="sm">Right</Button></Tooltip>
  </div>
);

// ─── Docs data ────────────────────────────────────────────────────────────────

export const componentDocs: ComponentDoc[] = [
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'Collapsible content panels for revealing hierarchical information progressively.',
    preview: AccordionPreview,
    code: `import { Accordion } from '@doriansmith/kiln';

const items = [
  { id: 'q1', title: 'What is Kiln?', content: 'A CSS-first React component library.' },
  { id: 'q2', title: 'Does it support dark mode?', content: 'Yes — set data-theme="dark" on <html>.' },
];

<Accordion items={items} defaultOpenIds={['q1']} />`,
    props: [
      { name: 'items', type: 'AccordionItem[]', default: '—', required: true, description: 'Array of accordion items (id, title, content, disabled?)' },
      { name: 'allowMultiple', type: 'boolean', default: 'false', required: false, description: 'Allow multiple items open simultaneously' },
      { name: 'defaultOpenIds', type: 'string[]', default: '[]', required: false, description: 'IDs open on first render (uncontrolled)' },
      { name: 'openIds', type: 'string[]', default: '—', required: false, description: 'Controlled open IDs array' },
      { name: 'onChange', type: '(openIds: string[]) => void', default: '—', required: false, description: 'Fired when open state changes' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles for token overrides' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '@doriansmith/kiln';

const items = [
  { id: 'a', title: 'Section A', content: 'Content A' },
  { id: 'b', title: 'Section B', content: 'Content B' },
];

it('opens an item on click', async () => {
  render(<Accordion items={items} />);
  fireEvent.click(screen.getByText('Section A'));
  expect(screen.getByText('Content A')).toBeVisible();
});

it('closes an open item on second click', async () => {
  render(<Accordion items={items} defaultOpenIds={['a']} />);
  fireEvent.click(screen.getByText('Section A'));
  expect(screen.queryByText('Content A')).not.toBeVisible();
});

it('allows multiple open when allowMultiple=true', () => {
  render(<Accordion items={items} allowMultiple />);
  fireEvent.click(screen.getByText('Section A'));
  fireEvent.click(screen.getByText('Section B'));
  expect(screen.getByText('Content A')).toBeVisible();
  expect(screen.getByText('Content B')).toBeVisible();
});`,
    usage: `// FAQ section
<Accordion
  items={faqs}
  allowMultiple
/>

// Controlled — manage open state externally
const [openIds, setOpenIds] = useState(['intro']);
<Accordion
  items={sections}
  openIds={openIds}
  onChange={setOpenIds}
/>

// Disabled item
const items = [
  { id: 'a', title: 'Available', content: '...' },
  { id: 'b', title: 'Coming soon', content: '...', disabled: true },
];`,
  },

  {
    id: 'badge',
    name: 'Badge',
    description: 'Compact status labels for communicating severity, state, or category at a glance.',
    preview: BadgePreview,
    code: `import { Badge } from '@doriansmith/kiln';

<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning">Degraded</Badge>
<Badge variant="info">Scheduled</Badge>
<Badge variant="critical">Outage</Badge>`,
    props: [
      { name: 'variant', type: "'neutral' | 'success' | 'warning' | 'error' | 'info' | 'pending' | 'running' | 'critical' | 'high' | 'medium' | 'low'", default: "'neutral'", required: false, description: 'Visual severity or status variant' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", required: false, description: 'Badge size' },
      { name: 'aria-label', type: 'string', default: '—', required: false, description: 'Custom accessible label (overrides auto-prefix)' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Badge label' },
    ],
    testing: `import { render, screen } from '@testing-library/react';
import { Badge } from '@doriansmith/kiln';

it('renders children', () => {
  render(<Badge>Active</Badge>);
  expect(screen.getByText('Active')).toBeInTheDocument();
});

it('applies variant class', () => {
  const { container } = render(<Badge variant="success">Active</Badge>);
  expect(container.firstChild).toHaveClass('kiln-badge--success');
});

it('prepends hidden variant label for colour-blind accessibility', () => {
  render(<Badge variant="error">Degraded</Badge>);
  expect(screen.getByText('error:')).toHaveClass('kiln-sr-only');
});`,
    usage: `// Status column in a table
<td>
  <Badge variant={row.healthy ? 'success' : 'error'}>
    {row.status}
  </Badge>
</td>

// Severity indicator in a log list
<Badge variant={entry.severity} size="sm">
  {entry.severity}
</Badge>

// Custom accessible label when context makes variant obvious
<Badge variant="critical" aria-label="Severity: critical">
  P0
</Badge>`,
  },

  {
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
  },

  {
    id: 'card',
    name: 'Card',
    description: 'Elevated content containers with four visual treatments and optional hover interaction.',
    preview: CardPreview,
    code: `import { Card } from '@doriansmith/kiln';

<Card variant="default">Default card</Card>
<Card variant="raised">Raised with gradient glow</Card>
<Card variant="glass">Glass morphism</Card>
<Card variant="gradient-border">Animated gradient border</Card>

// Clickable card
<Card onClick={() => navigate('/detail')} hoverLift>
  <h3>Project Alpha</h3>
</Card>`,
    props: [
      { name: 'variant', type: "'default' | 'raised' | 'glass' | 'gradient-border'", default: "'default'", required: false, description: 'Visual treatment variant' },
      { name: 'hoverLift', type: 'boolean', default: 'false', required: false, description: 'Lifts the card on hover with shadow enhancement' },
      { name: 'onClick', type: 'React.MouseEventHandler', default: '—', required: false, description: 'Makes the card interactive (adds role=button)' },
      { name: 'asChild', type: 'boolean', default: 'false', required: false, description: 'Merges props onto child element' },
      { name: 'as', type: 'React.ElementType', default: "'div'", required: false, description: 'Override the rendered HTML element' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-card-* token overrides' },
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Card content' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@doriansmith/kiln';

it('renders children', () => {
  render(<Card>Content</Card>);
  expect(screen.getByText('Content')).toBeInTheDocument();
});

it('applies variant class', () => {
  const { container } = render(<Card variant="raised">X</Card>);
  expect(container.firstChild).toHaveClass('kiln-card--raised');
});

it('adds role=button and handles click when onClick provided', () => {
  const onClick = vi.fn();
  render(<Card onClick={onClick}>Clickable</Card>);
  const card = screen.getByRole('button');
  fireEvent.click(card);
  expect(onClick).toHaveBeenCalled();
});`,
    usage: `// Dashboard metric card
<Card variant="raised" style={{ '--kiln-card-padding': '1.5rem' }}>
  <p className="label">Total revenue</p>
  <h2>$24,500</h2>
</Card>

// Navigable list item
<Card variant="default" hoverLift onClick={() => navigate(\`/items/\${id}\`)}>
  <h3>{item.name}</h3>
  <Badge variant={item.status}>{item.status}</Badge>
</Card>

// Override padding per instance
<Card style={{ '--kiln-card-padding': 'var(--kiln-space-4)' }}>
  Compact card
</Card>`,
  },

  {
    id: 'chip',
    name: 'Chip',
    description: 'Toggleable filter tags for multi-select interactions with controlled and uncontrolled modes.',
    preview: ChipPreview,
    code: `import { Chip } from '@doriansmith/kiln';
import { useState } from 'react';

// Uncontrolled
<Chip defaultSelected onToggle={(sel) => console.log(sel)}>React</Chip>

// Controlled group
const [tags, setTags] = useState(new Set(['react']));
{['React', 'TypeScript', 'CSS'].map((t) => (
  <Chip
    key={t}
    selected={tags.has(t.toLowerCase())}
    onToggle={(sel) => {
      const next = new Set(tags);
      sel ? next.add(t.toLowerCase()) : next.delete(t.toLowerCase());
      setTags(next);
    }}
  >
    {t}
  </Chip>
))}`,
    props: [
      { name: 'selected', type: 'boolean', default: '—', required: false, description: 'Controlled selected state' },
      { name: 'defaultSelected', type: 'boolean', default: 'false', required: false, description: 'Initial selected state (uncontrolled)' },
      { name: 'onToggle', type: '(selected: boolean) => void', default: '—', required: false, description: 'Fired when selection changes' },
      { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Prevents interaction' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Chip label' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from '@doriansmith/kiln';

it('toggles selection on click', () => {
  const onToggle = vi.fn();
  render(<Chip onToggle={onToggle}>Tag</Chip>);
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onToggle).toHaveBeenCalledWith(true);
});

it('does not toggle when disabled', () => {
  const onToggle = vi.fn();
  render(<Chip disabled onToggle={onToggle}>Tag</Chip>);
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onToggle).not.toHaveBeenCalled();
});`,
    usage: `// Filter bar
const FILTERS = ['All', 'Active', 'Paused', 'Archived'];
const [active, setActive] = useState('All');

{FILTERS.map((f) => (
  <Chip
    key={f}
    selected={active === f}
    onToggle={() => setActive(f)}
  >
    {f}
  </Chip>
))}

// Tag input pattern
{selectedTags.map((tag) => (
  <Chip key={tag} selected onToggle={() => removeTag(tag)}>
    {tag}
  </Chip>
))}`,
  },

  {
    id: 'code-block',
    name: 'CodeBlock',
    description: 'Monospace code display with language label and one-click copy-to-clipboard.',
    preview: CodeBlockPreview,
    code: `import { CodeBlock } from '@doriansmith/kiln';

<CodeBlock
  language="tsx"
  code={\`import { Button } from '@doriansmith/kiln';
export default () => <Button>Hello</Button>;\`}
/>

// Copy button hidden
<CodeBlock code={shellScript} language="bash" showCopy={false} />`,
    props: [
      { name: 'code', type: 'string', default: '—', required: true, description: 'The code string to display' },
      { name: 'language', type: 'string', default: '—', required: false, description: 'Language label shown in toolbar (e.g. "tsx", "bash")' },
      { name: 'showCopy', type: 'boolean', default: 'true', required: false, description: 'Show the copy-to-clipboard button' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles' },
    ],
    testing: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeBlock } from '@doriansmith/kiln';

it('renders code content', () => {
  render(<CodeBlock code="const x = 1;" />);
  expect(screen.getByText('const x = 1;')).toBeInTheDocument();
});

it('shows language label', () => {
  render(<CodeBlock code="x = 1" language="python" />);
  expect(screen.getByText('python')).toBeInTheDocument();
});

it('copies code on button click', async () => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn() } });
  render(<CodeBlock code="hello" showCopy />);
  await userEvent.click(screen.getByRole('button', { name: /copy/i }));
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
});`,
    usage: `// Installation snippet
<CodeBlock language="bash" code="npm install @doriansmith/kiln" />

// Component example in docs
<CodeBlock
  language="tsx"
  code={dedent\`
    import { Card } from '@doriansmith/kiln';
    <Card variant="raised">Hello world</Card>
  \`}
/>

// No copy button for inline reference
<CodeBlock code={configJson} language="json" showCopy={false} />`,
  },

  {
    id: 'dropdown-menu',
    name: 'DropdownMenu',
    description: 'Contextual action menus anchored to a trigger element with keyboard navigation.',
    preview: DropdownMenuPreview,
    code: `import { DropdownMenu, Button } from '@doriansmith/kiln';

const items = [
  { label: 'Edit', onSelect: () => openEditor() },
  { label: 'Duplicate', onSelect: () => duplicate() },
  { type: 'separator' },
  { label: 'Delete', onSelect: () => confirmDelete(), variant: 'danger' },
];

<DropdownMenu
  trigger={<Button variant="secondary">Actions ▾</Button>}
  items={items}
/>`,
    props: [
      { name: 'trigger', type: 'React.ReactElement', default: '—', required: true, description: 'The element that opens the menu on click' },
      { name: 'items', type: 'DropdownMenuEntry[]', default: '—', required: true, description: 'Array of items, separators, and labels' },
      { name: 'align', type: "'start' | 'end'", default: "'start'", required: false, description: 'Horizontal alignment relative to trigger' },
      { name: 'side', type: "'bottom' | 'top'", default: "'bottom'", required: false, description: 'Which side the menu opens on' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the menu panel' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownMenu, Button } from '@doriansmith/kiln';

const items = [{ label: 'Edit', onSelect: vi.fn() }];

it('opens menu on trigger click', () => {
  render(<DropdownMenu trigger={<Button>Open</Button>} items={items} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open' }));
  expect(screen.getByRole('menu')).toBeInTheDocument();
});

it('closes on item select', () => {
  render(<DropdownMenu trigger={<Button>Open</Button>} items={items} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open' }));
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});`,
    usage: `// Row actions in a data table
<DropdownMenu
  trigger={<Button variant="ghost" aria-label="Row actions">⋯</Button>}
  items={[
    { label: 'View details', onSelect: () => openDrawer(row.id) },
    { label: 'Edit', onSelect: () => openEditor(row.id) },
    { type: 'separator' },
    { label: 'Remove', onSelect: () => remove(row.id), variant: 'danger' },
  ]}
  align="end"
/>

// With grouped labels
const items = [
  { type: 'label', label: 'Sort by' },
  { label: 'Newest first', onSelect: () => setSort('desc') },
  { label: 'Oldest first', onSelect: () => setSort('asc') },
];`,
  },

  {
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
  },

  {
    id: 'footer',
    name: 'Footer',
    description: 'Site footer with logo slot, navigation links, copyright, and credit line.',
    preview: FooterPreview,
    code: `import { Footer } from '@doriansmith/kiln';

<Footer
  logo={<strong>Kiln</strong>}
  links={[
    { href: '/docs', label: 'Docs' },
    { href: 'https://github.com/...', label: 'GitHub', external: true },
    { href: 'https://npmjs.com/...', label: 'npm', external: true },
  ]}
  copyright="© 2026 Your Name"
  credit="Built with Kiln"
/>`,
    props: [
      { name: 'logo', type: 'React.ReactNode', default: '—', required: false, description: 'Logo or wordmark rendered on the left' },
      { name: 'links', type: 'FooterLink[]', default: '[]', required: false, description: 'Navigation links (href, label, external?)' },
      { name: 'copyright', type: 'string', default: '—', required: false, description: 'Copyright line (e.g. "© 2026 Acme Inc.")' },
      { name: 'credit', type: 'React.ReactNode', default: '—', required: false, description: 'Credit line — accepts a ReactNode for links' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    ],
    testing: `import { render, screen } from '@testing-library/react';
import { Footer } from '@doriansmith/kiln';

it('renders logo slot', () => {
  render(<Footer logo={<span>Kiln</span>} />);
  expect(screen.getByText('Kiln')).toBeInTheDocument();
});

it('renders links with correct href', () => {
  render(<Footer links={[{ href: '/docs', label: 'Docs' }]} />);
  expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
});

it('adds rel=noopener and screen-reader hint for external links', () => {
  render(<Footer links={[{ href: 'https://example.com', label: 'Site', external: true }]} />);
  const link = screen.getByRole('link', { name: /site/i });
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(link).toHaveAttribute('target', '_blank');
});

it('renders copyright text', () => {
  render(<Footer copyright="© 2026 Acme" />);
  expect(screen.getByText('© 2026 Acme')).toBeInTheDocument();
});`,
    usage: `// Typical app footer
<Footer
  logo={<img src="/logo.svg" alt="Acme" />}
  links={[
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: 'https://twitter.com/acme', label: 'Twitter', external: true },
  ]}
  copyright={\`© \${new Date().getFullYear()} Acme Inc.\`}
/>

// Minimal — copyright only
<Footer copyright="© 2026 Dorian Smith. All rights reserved." />

// With rich credit line
<Footer
  copyright="© 2026 Acme"
  credit={<>Built with <a href="https://kiln.dev">Kiln</a></>}
/>`,
  },

  {
    id: 'input',
    name: 'Input',
    description: 'Text input with floating label, helper text, error state, and loading indicator.',
    preview: InputPreview,
    code: `import { Input } from '@doriansmith/kiln';

// Basic
<Input label="Email" placeholder="you@example.com" type="email" />

// With helper text
<Input
  label="Username"
  helperText="3–20 characters, letters and numbers only"
/>

// Error state
<Input
  label="Password"
  type="password"
  errorText="Must be at least 8 characters"
/>`,
    props: [
      { name: 'label', type: 'string', default: '—', required: false, description: 'Visible label linked via htmlFor/id' },
      { name: 'helperText', type: 'string', default: '—', required: false, description: 'Subtext shown below the input' },
      { name: 'errorText', type: 'string', default: '—', required: false, description: 'Validation error (overrides helperText)' },
      { name: 'loading', type: 'boolean', default: 'false', required: false, description: 'Shows a spinner inside the input' },
      { name: 'id', type: 'string', default: 'auto', required: false, description: 'HTML id (auto-generated if omitted)' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the wrapper' },
      { name: '...rest', type: 'React.InputHTMLAttributes', default: '—', required: false, description: 'All standard <input> attributes' },
    ],
    testing: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@doriansmith/kiln';

it('renders label', () => {
  render(<Input label="Email" />);
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
});

it('shows error text and sets aria-describedby', () => {
  render(<Input label="Email" errorText="Invalid email" />);
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby');
});

it('accepts typed input', async () => {
  render(<Input label="Name" />);
  await userEvent.type(screen.getByRole('textbox'), 'Alice');
  expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
});`,
    usage: `// Controlled form field
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<Input
  label="Email address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  errorText={error}
/>

// With React Hook Form
<Input
  label="Username"
  {...register('username', { required: 'Required' })}
  errorText={errors.username?.message}
/>`,
  },

  {
    id: 'loading-indicator',
    name: 'LoadingIndicator',
    description: 'GPU-accelerated spinner for async operation feedback with full-screen and inline modes.',
    preview: LoadingIndicatorPreview,
    code: `import { LoadingIndicator } from '@doriansmith/kiln';

<LoadingIndicator />
<LoadingIndicator message="Loading projects…" />
<LoadingIndicator inline message="Fetching…" />
<LoadingIndicator fullScreen message="Loading workspace…" />`,
    props: [
      { name: 'message', type: 'string', default: "'Loading...'", required: false, description: 'Accessible status message shown below the spinner' },
      { name: 'fullScreen', type: 'boolean', default: 'false', required: false, description: 'Centers the spinner over the full viewport' },
      { name: 'inline', type: 'boolean', default: 'false', required: false, description: 'Renders the spinner inline for use within text/buttons' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
    ],
    testing: `import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from '@doriansmith/kiln';

it('has role=status', () => {
  render(<LoadingIndicator />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});

it('shows message text', () => {
  render(<LoadingIndicator message="Saving…" />);
  expect(screen.getByText('Saving…')).toBeInTheDocument();
});`,
    usage: `// Full-page loading gate
{loading && <LoadingIndicator fullScreen message="Loading workspace…" />}

// Inline content area
<div aria-busy={loading}>
  {loading ? <LoadingIndicator message="Fetching projects…" /> : <ProjectList />}
</div>

// Button loading — prefer Button's built-in loading prop
<Button loading>Saving…</Button>`,
  },

  {
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
  },

  {
    id: 'nav-menu',
    name: 'NavMenu',
    description: 'Horizontal navigation links for desktop (NavMenu) and a slide-out drawer for mobile (MobileNav).',
    preview: NavMenuPreview,
    code: `import { NavMenu, MobileNav } from '@doriansmith/kiln';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/components', label: 'Components' },
];

// Desktop — render inside your Nav bar
<NavMenu
  items={NAV_ITEMS}
  isActive={(href) => window.location.pathname === href}
  onNavigate={(href) => navigate(href)}
/>

// Mobile — self-contained hamburger + slide-out drawer
<MobileNav
  items={NAV_ITEMS}
  logo={<strong>Kiln</strong>}
  isActive={(href) => window.location.pathname === href}
  onNavigate={(href) => navigate(href)}
/>`,
    props: [
      { name: 'NavMenu.items', type: 'NavItem[]', default: '—', required: true, description: 'Array of { href, label } navigation links' },
      { name: 'NavMenu.isActive', type: '(href: string) => boolean', default: 'pathname match', required: false, description: 'Returns true to mark a link as active (aria-current="page")' },
      { name: 'NavMenu.onNavigate', type: '(href, e) => void', default: '—', required: false, description: 'Called on link click — call e.preventDefault() to handle routing' },
      { name: 'NavMenu.ariaLabel', type: 'string', default: "'Main navigation'", required: false, description: 'Accessible label for the nav landmark' },
      { name: 'NavMenu.className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
      { name: 'MobileNav.items', type: 'MobileNavItem[]', default: '—', required: true, description: 'Array of { href, label, icon? } — icon renders before label' },
      { name: 'MobileNav.logo', type: 'React.ReactNode', default: '—', required: false, description: 'Slot in the panel header' },
      { name: 'MobileNav.footer', type: 'React.ReactNode', default: '—', required: false, description: 'Slot at bottom of panel (user info, sign-out, etc.)' },
      { name: 'MobileNav.isActive', type: '(href: string) => boolean', default: 'pathname match', required: false, description: 'Returns true to mark a link as active' },
      { name: 'MobileNav.onNavigate', type: '(href, e) => void', default: '—', required: false, description: 'Called on link click inside the drawer' },
      { name: 'MobileNav.ariaLabel', type: 'string', default: "'Mobile navigation'", required: false, description: 'Accessible label for the nav landmark' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { NavMenu, MobileNav } from '@doriansmith/kiln';

const items = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
];

// NavMenu tests
it('renders all nav links', () => {
  render(<NavMenu items={items} />);
  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Docs' })).toBeInTheDocument();
});

it('marks active link with aria-current', () => {
  render(<NavMenu items={items} isActive={(href) => href === '/'} />);
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');
});

// MobileNav tests
it('opens drawer on hamburger click', () => {
  render(<MobileNav items={items} />);
  fireEvent.click(screen.getByRole('button', { name: /open navigation/i }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it('closes drawer on Escape', () => {
  render(<MobileNav items={items} />);
  fireEvent.click(screen.getByRole('button', { name: /open navigation/i }));
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});`,
    usage: `// Integrate both into your Nav bar
function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <Nav
      logo={<strong>MyApp</strong>}
      items={NAV_ITEMS}
      actions={
        <>
          <ThemeToggle />
          {/* MobileNav renders a hamburger button — hide on desktop via CSS */}
          <MobileNav
            items={NAV_ITEMS}
            logo={<strong>MyApp</strong>}
            isActive={(href) => location.pathname === href}
            onNavigate={(href) => navigate(href)}
          />
        </>
      }
      isActive={(href) => location.pathname === href}
      onNavigate={(href) => navigate(href)}
    />
  );
}`,
  },

  {
    id: 'scroll-to-top',
    name: 'ScrollToTop',
    description: 'Invisible utility that fires window.scrollTo whenever a trigger value changes — ideal for route transitions.',
    preview: ScrollToTopPreview,
    code: `import { ScrollToTop } from '@doriansmith/kiln';

// Scroll to top on every route change
// Pass your router's current pathname as trigger
<ScrollToTop trigger={location.pathname} />

// Smooth scroll behavior
<ScrollToTop trigger={location.pathname} behavior="smooth" />`,
    props: [
      { name: 'trigger', type: 'unknown', default: '—', required: true, description: 'When this value changes, the page scrolls to top. Pass your router pathname/location.' },
      { name: 'behavior', type: "'auto' | 'smooth' | 'instant'", default: "'auto'", required: false, description: 'ScrollBehavior passed to window.scrollTo' },
    ],
    testing: `import { render } from '@testing-library/react';
import { ScrollToTop } from '@doriansmith/kiln';

it('renders nothing', () => {
  const { container } = render(<ScrollToTop trigger="/" />);
  expect(container).toBeEmptyDOMElement();
});

it('calls window.scrollTo on trigger change', () => {
  const scrollTo = vi.spyOn(window, 'scrollTo');
  const { rerender } = render(<ScrollToTop trigger="/" />);
  rerender(<ScrollToTop trigger="/docs" />);
  expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
});`,
    usage: `// React Router v6 — mount once at app root
import { useLocation } from 'react-router-dom';
import { ScrollToTop } from '@doriansmith/kiln';

function App() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop trigger={location.pathname} behavior="smooth" />
      <Outlet />
    </>
  );
}

// Hash-based router — pass the hash value
<ScrollToTop trigger={window.location.hash} />`,
  },

  {
    id: 'side-nav',
    name: 'SideNav',
    description: 'Persistent vertical navigation sidebar with grouped items and keyboard navigation.',
    preview: SideNavPreview,
    code: `import { SideNav } from '@doriansmith/kiln';

const [active, setActive] = useState('dashboard');

<SideNav
  activeId={active}
  onSelect={setActive}
  groups={[
    {
      label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'projects', label: 'Projects', badge: '12' },
        { id: 'team', label: 'Team' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { id: 'account', label: 'Account' },
        { id: 'billing', label: 'Billing' },
      ],
    },
  ]}
/>`,
    props: [
      { name: 'groups', type: 'SideNavGroup[]', default: '—', required: true, description: 'Navigation groups (each has optional label + items array)' },
      { name: 'activeId', type: 'string', default: '—', required: false, description: 'Currently active item id' },
      { name: 'onSelect', type: '(id: string) => void', default: '—', required: false, description: 'Called when an item is clicked' },
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
    usage: `// App shell with persistent sidebar
function AppShell() {
  const [page, setPage] = useState('dashboard');

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '14rem', borderRight: '1px solid var(--kiln-gray-200)' }}>
        <SideNav
          activeId={page}
          onSelect={setPage}
          groups={NAV_GROUPS}
        />
      </aside>
      <main style={{ flex: 1 }}>
        {page === 'dashboard' && <Dashboard />}
        {page === 'projects' && <Projects />}
      </main>
    </div>
  );
}`,
  },

  {
    id: 'table-of-contents',
    name: 'TableOfContents',
    description: 'Sticky in-page navigation with IntersectionObserver-based active section tracking.',
    preview: TableOfContentsPreview,
    code: `import { TableOfContents } from '@doriansmith/kiln';

const items = [
  { id: 'intro', label: 'Introduction', level: 1 },
  { id: 'install', label: 'Installation', level: 1 },
  { id: 'npm', label: 'npm', level: 2 },
  { id: 'cdn', label: 'CDN', level: 2 },
  { id: 'usage', label: 'Usage', level: 1 },
];

// In a sidebar — offset matches your sticky nav height
<TableOfContents items={items} offsetTop={64} heading="On this page" />`,
    props: [
      { name: 'items', type: 'TocItem[]', default: '—', required: true, description: 'Array of { id, label, level? } — id must match an element on the page' },
      { name: 'offsetTop', type: 'number', default: '0', required: false, description: 'Scroll offset in px (set to sticky nav height)' },
      { name: 'heading', type: 'string', default: "'On this page'", required: false, description: 'Heading text above the list' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-toc-* token overrides' },
    ],
    testing: `import { render, screen } from '@testing-library/react';
import { TableOfContents } from '@doriansmith/kiln';

const items = [
  { id: 'a', label: 'Section A' },
  { id: 'b', label: 'Section B', level: 2 as const },
];

it('renders all items', () => {
  render(<TableOfContents items={items} />);
  expect(screen.getByText('Section A')).toBeInTheDocument();
  expect(screen.getByText('Section B')).toBeInTheDocument();
});

it('renders heading', () => {
  render(<TableOfContents items={items} heading="Contents" />);
  expect(screen.getByText('Contents')).toBeInTheDocument();
});`,
    usage: `// Docs layout — sidebar TOC
<div style={{ display: 'flex', gap: '4rem' }}>
  <article style={{ flex: 1 }}>
    <h2 id="intro">Introduction</h2>
    <h2 id="install">Installation</h2>
  </article>
  <aside>
    <TableOfContents
      items={[
        { id: 'intro', label: 'Introduction' },
        { id: 'install', label: 'Installation' },
      ]}
      offsetTop={64}
    />
  </aside>
</div>`,
  },

  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Horizontal tab navigation in pill or underline variants with full keyboard support.',
    preview: TabsPreview,
    code: `import { Tabs } from '@doriansmith/kiln';

// Pill (default)
<Tabs
  items={[
    { value: 'overview', label: 'Overview' },
    { value: 'settings', label: 'Settings' },
    { value: 'logs', label: 'Logs', disabled: true },
  ]}
  defaultValue="overview"
  onChange={(val) => console.log(val)}
/>

// Underline — typical for docs/detail pages
<Tabs
  variant="underline"
  items={docTabs}
  value={activeTab}
  onChange={setActiveTab}
/>`,
    props: [
      { name: 'items', type: 'TabItem[]', default: '—', required: true, description: 'Tab definitions (value, label, icon?, disabled?)' },
      { name: 'variant', type: "'pill' | 'underline'", default: "'pill'", required: false, description: 'Visual style — pill strip or underline indicator' },
      { name: 'value', type: 'string', default: '—', required: false, description: 'Controlled active tab value' },
      { name: 'defaultValue', type: 'string', default: 'first item', required: false, description: 'Initial active value (uncontrolled)' },
      { name: 'onChange', type: '(value: string) => void', default: '—', required: false, description: 'Fired when active tab changes' },
      { name: 'ariaLabel', type: 'string', default: "'Tabs'", required: false, description: 'Accessible label for the tablist' },
      { name: 'id', type: 'string', default: '—', required: false, description: 'Base ID — enables aria-controls linking to tab panels' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '@doriansmith/kiln';

const items = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab B' },
];

it('renders all tabs', () => {
  render(<Tabs items={items} />);
  expect(screen.getAllByRole('tab')).toHaveLength(2);
});

it('selects tab on click', () => {
  const onChange = vi.fn();
  render(<Tabs items={items} onChange={onChange} />);
  fireEvent.click(screen.getByText('Tab B'));
  expect(onChange).toHaveBeenCalledWith('b');
});

it('navigates with arrow keys', () => {
  render(<Tabs items={items} defaultValue="a" />);
  screen.getByText('Tab A').focus();
  fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
  expect(screen.getByText('Tab B')).toHaveFocus();
});`,
    usage: `// Controlled tabs with panel rendering
const [tab, setTab] = useState('overview');

<Tabs
  id="detail-tabs"
  items={TABS}
  value={tab}
  onChange={setTab}
  variant="underline"
/>

<div role="tabpanel" id={\`detail-tabs-panel-\${tab}\`}>
  {tab === 'overview' && <Overview />}
  {tab === 'settings' && <Settings />}
</div>`,
  },

  {
    id: 'textarea',
    name: 'Textarea',
    description: 'Multi-line text input with label, character count, and validation state.',
    preview: TextareaPreview,
    code: `import { Textarea } from '@doriansmith/kiln';

<Textarea label="Description" placeholder="Describe your project…" rows={4} />

<Textarea
  label="Bio"
  helperText="Up to 200 characters"
  maxLength={200}
/>

<Textarea
  label="Notes"
  errorText="This field is required"
/>`,
    props: [
      { name: 'label', type: 'string', default: '—', required: false, description: 'Visible label linked via htmlFor/id' },
      { name: 'helperText', type: 'string', default: '—', required: false, description: 'Subtext shown below the textarea' },
      { name: 'errorText', type: 'string', default: '—', required: false, description: 'Validation error (overrides helperText)' },
      { name: 'id', type: 'string', default: 'auto', required: false, description: 'HTML id (auto-generated if omitted)' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the wrapper' },
      { name: '...rest', type: 'React.TextareaHTMLAttributes', default: '—', required: false, description: 'All standard <textarea> attributes' },
    ],
    testing: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '@doriansmith/kiln';

it('renders label', () => {
  render(<Textarea label="Notes" />);
  expect(screen.getByLabelText('Notes')).toBeInTheDocument();
});

it('shows error and links aria-describedby', () => {
  render(<Textarea label="Bio" errorText="Required" />);
  expect(screen.getByText('Required')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby');
});`,
    usage: `// Controlled with React Hook Form
<Textarea
  label="Project description"
  rows={5}
  {...register('description', { required: 'Required' })}
  errorText={errors.description?.message}
/>`,
  },

  {
    id: 'theme-toggle',
    name: 'ThemeToggle',
    description: 'Light/dark mode switch that sets data-theme on <html> and persists to localStorage.',
    preview: ThemeTogglePreview,
    code: `import { ThemeToggle } from '@doriansmith/kiln';

// In your Nav actions slot
<Nav
  logo={<span>Kiln</span>}
  actions={<ThemeToggle />}
/>

// Standalone
<ThemeToggle />`,
    props: [
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@doriansmith/kiln';

it('renders toggle button', () => {
  render(<ThemeToggle />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('toggles data-theme on html element', () => {
  render(<ThemeToggle />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.documentElement.dataset.theme).toBe('dark');
});`,
    usage: `// Place in Nav actions
<Nav
  logo={<strong>MyApp</strong>}
  items={navItems}
  actions={<ThemeToggle />}
/>

// ThemeToggle reads and writes to localStorage('kiln-theme')
// and sets/removes data-theme="dark" on document.documentElement`,
  },

  {
    id: 'toast',
    name: 'Toast',
    description: 'Non-blocking notification toasts with four severity variants and configurable position.',
    preview: ToastPreview,
    code: `import { toast, ToastContainer } from '@doriansmith/kiln';

// Trigger from anywhere using named severity methods
toast.success('Saved successfully');
toast.info('Build started');
toast.warning('Storage 90% full');
toast.error('Deploy failed');

// With optional title
toast.success('Project deployed', { title: 'Success' });

// Mount ToastContainer once at the app root
function App() {
  return (
    <>
      <Router />
      <ToastContainer position="bottom-right" />
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
  },

  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'Contextual popup label that attaches to any interactive element via hover or focus.',
    preview: TooltipPreview,
    code: `import { Tooltip, Button } from '@doriansmith/kiln';

<Tooltip content="Save changes (Ctrl+S)" side="top">
  <Button variant="primary">Save</Button>
</Tooltip>

<Tooltip content="Remove item" side="left" delayMs={0}>
  <button aria-label="Delete">🗑</button>
</Tooltip>`,
    props: [
      { name: 'content', type: 'React.ReactNode', default: '—', required: true, description: 'Tooltip text or content' },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", required: false, description: 'Preferred placement relative to the trigger' },
      { name: 'delayMs', type: 'number', default: '200', required: false, description: 'Hover delay before tooltip shows (ms)' },
      { name: 'children', type: 'React.ReactElement', default: '—', required: true, description: 'Trigger element (must accept ref + aria attributes)' },
      { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the tooltip bubble' },
    ],
    testing: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip, Button } from '@doriansmith/kiln';

it('shows tooltip on hover', async () => {
  render(
    <Tooltip content="Hello" delayMs={0}>
      <Button>Trigger</Button>
    </Tooltip>
  );
  await userEvent.hover(screen.getByRole('button'));
  expect(await screen.findByRole('tooltip')).toBeInTheDocument();
});

it('hides tooltip when mouse leaves', async () => {
  render(
    <Tooltip content="Hello" delayMs={0}>
      <Button>Trigger</Button>
    </Tooltip>
  );
  await userEvent.hover(screen.getByRole('button'));
  await userEvent.unhover(screen.getByRole('button'));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});`,
    usage: `// Icon button — always add a tooltip when the label is icon-only
<Tooltip content="Settings" side="bottom">
  <Button variant="ghost" aria-label="Settings">⚙️</Button>
</Tooltip>

// Keyboard shortcut hint
<Tooltip content="Save (⌘S)" delayMs={400}>
  <Button variant="primary" onClick={save}>Save</Button>
</Tooltip>

// Explanatory tooltip on a disabled field
<Tooltip content="Requires admin access">
  <span> {/* wrapper needed when child is disabled */}
    <Input label="API key" disabled />
  </span>
</Tooltip>`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const COMPONENT_GROUPS = [
  {
    label: 'Components',
    items: componentDocs.map((doc) => ({ id: doc.id, label: doc.name })),
  },
];
