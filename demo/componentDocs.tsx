import React, { useState } from 'react';
import {
  Accordion, AppLayout, Badge, Breadcrumbs, Button, Card, Chip, CodeBlock,
  DropdownMenu, ErrorMessage, Footer, Grid, GridItem, Input, LoadingIndicator,
  Modal, MobileNav, NavMenu, NotificationBar, ScrollToTop, SidebarPanel, SideNav,
  SplitPanel, Tabs, Textarea, ThemeToggle, Tooltip,
  TableOfContents, ToolsPanel, toast, ToastContainer,
} from '@doriansmith/kiln';
import type {
  DropdownMenuEntry, AccordionItem, AppLayoutNotification, BreadcrumbItem, NotificationBarItem,
} from '@doriansmith/kiln';

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

const APP_LAYOUT_STATS = ['Shipped', 'In Review', 'Drafts', 'Archived'];
const APP_LAYOUT_COUNTS = [12, 4, 7, 31];

const AppLayoutPreview: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [notifications, setNotifications] = React.useState<AppLayoutNotification[]>([
    { id: 'n1', type: 'info', message: 'AppLayout — sidebar, breadcrumbs, notifications, and more.', dismissible: true, onDismiss: (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id)) },
  ]);
  return (
    <div style={{ height: 420, border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden', position: 'relative' }}>
      <AppLayout
        topBar={
          <div style={{ height: 52, background: 'var(--kiln-gray-900)', display: 'flex', alignItems: 'center', padding: '0 var(--kiln-space-4)', color: '#fff', fontWeight: 700, fontSize: 'var(--kiln-text-base)', gap: 'var(--kiln-space-3)' }}>
            <span style={{ width: 28, height: 28, background: 'var(--kiln-primary)', borderRadius: 6, display: 'inline-block' }} />
            My App
          </div>
        }
        sidebar={
          <nav>
            {['Dashboard', 'Projects', 'Settings'].map((label) => (
              <div key={label} style={{ padding: 'var(--kiln-space-2) var(--kiln-space-3)', borderRadius: 'var(--kiln-radius-md)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', cursor: 'pointer' }}>{label}</div>
            ))}
          </nav>
        }
        sidebarOpen={sidebarOpen}
        onSidebarChange={setSidebarOpen}
        breadcrumbs={[{ label: 'Projects', href: '#' }, { label: 'Kiln' }]}
        notifications={notifications}
        header={<h2 style={{ margin: 0, fontSize: 'var(--kiln-text-xl)', fontWeight: 700 }}>Overview</h2>}
        sidebarWidth="160px"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--kiln-space-4)' }}>
          {APP_LAYOUT_STATS.map((s, i) => (
            <div key={s} style={{ background: 'var(--kiln-surface-raised)', border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-lg)', padding: 'var(--kiln-space-4)' }}>
              <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s}</div>
              <div style={{ fontSize: 'var(--kiln-text-2xl)', fontWeight: 700, marginTop: 4 }}>{APP_LAYOUT_COUNTS[i]}</div>
            </div>
          ))}
        </div>
      </AppLayout>
    </div>
  );
};

const BreadcrumbsPreview: React.FC = () => {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Kiln' },
  ];
  return <Breadcrumbs items={items} />;
};

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

const SidebarPanelPreview: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: 'flex', height: 320, border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden', position: 'relative', width: '100%' }}>
      <SidebarPanel
        header="Navigation"
        open={open}
        onOpenChange={setOpen}
        togglePlacement="both"
        style={{ '--kiln-sidebar-panel-width': '180px' } as React.CSSProperties}
      >
        {['Dashboard', 'Projects', 'Team', 'Settings'].map((l) => (
          <div key={l} style={{ padding: 'var(--kiln-space-2) var(--kiln-space-2)', borderRadius: 'var(--kiln-radius-md)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', cursor: 'pointer' }}>{l}</div>
        ))}
      </SidebarPanel>
      <div style={{ flex: 1, padding: 'var(--kiln-space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)' }}>
        Main content area
      </div>
    </div>
  );
};

const ToolsPanelPreview: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: 'flex', height: 320, border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden', position: 'relative', width: '100%' }}>
      <div style={{ flex: 1, padding: 'var(--kiln-space-6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)' }}>
        Main content area
      </div>
      <ToolsPanel
        header="Help"
        open={open}
        onOpenChange={setOpen}
        style={{ '--kiln-tools-panel-width': '200px' } as React.CSSProperties}
      >
        <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
          This panel provides contextual help and tools for the current view. Close it with the × button or by pressing Escape.
        </p>
      </ToolsPanel>
    </div>
  );
};

const SplitPanelPreview: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden', width: '100%' }}>
      <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)' }}>
        Main content area
      </div>
      <SplitPanel
        header="Logs"
        open={open}
        onOpenChange={setOpen}
        defaultHeight={140}
        resizable
      >
        <pre style={{ margin: 0, fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-600)', lineHeight: 1.6 }}>
          {`[10:42:01] Build started\n[10:42:03] Compiling TypeScript...\n[10:42:07] CSS bundle: 74 KB\n[10:42:08] Build complete ✓`}
        </pre>
      </SplitPanel>
    </div>
  );
};

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

const GridPreview: React.FC = () => {
  const labelStyle: React.CSSProperties = {
    margin: '0 0 var(--kiln-space-2)',
    fontSize: 'var(--kiln-text-xs)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--kiln-gray-500)',
  };
  const Cell = ({ label }: { label: string }) => (
    <Card variant="raised" style={{ '--kiln-card-padding': 'var(--kiln-space-4)' } as React.CSSProperties}>
      <span style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-600)' }}>{label}</span>
    </Card>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-8)', width: '100%' }}>
      <div>
        <p style={labelStyle}>Fixed cols — 4 cols at desktop, 2 at tablet, 1 on mobile</p>
        <Grid cols={4} gap="sm">
          {['A', 'B', 'C', 'D'].map((l) => <Cell key={l} label={l} />)}
        </Grid>
      </div>
      <div>
        <p style={labelStyle}>Auto-fit — minColWidth 140px, browser decides column count</p>
        <Grid minColWidth={140} gap="sm">
          {['A', 'B', 'C', 'D', 'E'].map((l) => <Cell key={l} label={l} />)}
        </Grid>
      </div>
      <div>
        <p style={labelStyle}>GridItem colSpan — 3-col grid, first item spans 2 columns</p>
        <Grid cols={3} gap="sm">
          <GridItem colSpan={2}><Cell label="spans 2" /></GridItem>
          <Cell label="1" />
          <Cell label="2" />
          <Cell label="3" />
        </Grid>
      </div>
    </div>
  );
};

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
      logo={<img src="/logo.png" alt="Kiln" style={{ height: 32, width: 'auto' }} />}
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
        <div className="mnav-preview-wrap" style={{ maxWidth: 320, border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-lg)', padding: 'var(--kiln-space-6)', background: 'var(--kiln-surface)' }}>
          <MobileNav
            items={items.map((i) => ({ ...i }))}
logo={<img src="/logo.png" alt="Kiln" style={{ height: 32, width: 'auto' }} />}
            isActive={(href) => href === active}
            onNavigate={(href, e) => { e.preventDefault(); setActive(href); }}
          />
        </div>
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
    id: 'app-layout',
    name: 'AppLayout',
    description: 'Full-page application shell with collapsible sidebar, tools panel, breadcrumbs, notifications, page header, and split panel.',
    preview: AppLayoutPreview,
    code: `import { AppLayout } from '@doriansmith/kiln';

<AppLayout
  topBar={<Nav logo={logo} items={navItems} />}
  sidebar={<SideNav groups={groups} activeId={activeId} onSelect={setActive} />}
  sidebarOpen={sidebarOpen}
  onSidebarChange={setSidebarOpen}
  breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
  notifications={[{ id: '1', type: 'info', message: 'Deployed successfully.', dismissible: true }]}
  header={<h1>Dashboard</h1>}
>
  <YourPageContent />
</AppLayout>`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Main page content' },
      { name: 'topBar', type: 'React.ReactNode', default: '—', required: false, description: 'Sticky top bar slot (e.g. <Nav />)' },
      { name: 'sidebar', type: 'React.ReactNode', default: '—', required: false, description: 'Collapsible left sidebar content' },
      { name: 'sidebarOpen', type: 'boolean', default: '—', required: false, description: 'Controlled sidebar open state' },
      { name: 'onSidebarChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when sidebar open state should change' },
      { name: 'defaultSidebarOpen', type: 'boolean', default: 'true on ≥768px', required: false, description: 'Initial sidebar state (uncontrolled)' },
      { name: 'sidebarWidth', type: 'string', default: "'260px'", required: false, description: 'Sidebar width (also overridable via --kiln-app-layout-sidebar-width)' },
      { name: 'toolsPanel', type: 'React.ReactNode', default: '—', required: false, description: 'Collapsible right tools/help panel content' },
      { name: 'toolsOpen', type: 'boolean', default: '—', required: false, description: 'Controlled tools panel open state' },
      { name: 'onToolsChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when tools panel open state should change' },
      { name: 'defaultToolsOpen', type: 'boolean', default: 'false', required: false, description: 'Initial tools panel state (uncontrolled)' },
      { name: 'breadcrumbs', type: 'AppLayoutBreadcrumb[]', default: '—', required: false, description: 'Breadcrumb trail rendered above notifications' },
      { name: 'notifications', type: 'AppLayoutNotification[]', default: '—', required: false, description: 'Notification banners with optional dismiss' },
      { name: 'header', type: 'React.ReactNode', default: '—', required: false, description: 'Page header rendered above main content' },
      { name: 'splitPanel', type: 'React.ReactNode', default: '—', required: false, description: 'Expandable bottom split panel' },
      { name: 'splitPanelOpen', type: 'boolean', default: '—', required: false, description: 'Controlled split panel open state' },
      { name: 'onSplitPanelChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when split panel open state should change' },
      { name: 'contentLabel', type: 'string', default: "'Main content'", required: false, description: 'aria-label for the <main> landmark' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes on the root element' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for CSS token overrides' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { AppLayout } from '@doriansmith/kiln';

it('renders children inside main landmark', () => {
  render(<AppLayout>Page content</AppLayout>);
  expect(screen.getByRole('main')).toHaveTextContent('Page content');
});

it('renders sidebar when sidebarOpen=true', () => {
  render(
    <AppLayout sidebar={<nav>Side</nav>} sidebarOpen={true}>Content</AppLayout>
  );
  expect(screen.getByRole('complementary', { name: /sidebar/i })).toBeInTheDocument();
});

it('calls onSidebarChange when FAB is clicked', () => {
  const onSidebarChange = vi.fn();
  render(
    <AppLayout sidebar={<nav>Side</nav>} sidebarOpen={false} onSidebarChange={onSidebarChange}>
      Content
    </AppLayout>
  );
  fireEvent.click(screen.getByRole('button', { name: /open sidebar/i }));
  expect(onSidebarChange).toHaveBeenCalledWith(true);
});

it('renders breadcrumbs with correct aria-current on last item', () => {
  render(
    <AppLayout breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}>
      Content
    </AppLayout>
  );
  expect(screen.getByText('Dashboard')).toHaveAttribute('aria-current', 'page');
});

it('calls onDismiss when notification dismiss button is clicked', () => {
  const onDismiss = vi.fn();
  render(
    <AppLayout notifications={[{ id: 'x', message: 'Hello', dismissible: true, onDismiss }]}>
      Content
    </AppLayout>
  );
  fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
  expect(onDismiss).toHaveBeenCalledWith('x');
});`,
    usage: `// Minimal — just a shell with sticky nav
<AppLayout topBar={<Nav logo={logo} items={navItems} />}>
  <Dashboard />
</AppLayout>

// Full application shell
const [sidebarOpen, setSidebarOpen] = useState(true);
const [notifications, setNotifications] = useState([
  { id: '1', type: 'success', message: 'Deployment complete.', dismissible: true,
    onDismiss: (id) => setNotifications((n) => n.filter((x) => x.id !== id)) },
]);

<AppLayout
  topBar={<Nav logo={logo} items={navItems} actions={<ThemeToggle />} />}
  sidebar={<SideNav groups={navGroups} activeId={activeId} onSelect={setActiveId} />}
  sidebarOpen={sidebarOpen}
  onSidebarChange={setSidebarOpen}
  breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: 'Kiln' }]}
  notifications={notifications}
  header={<h1>Kiln</h1>}
  splitPanel={<LogViewer />}
>
  <ProjectOverview />
</AppLayout>

// Override sidebar width via CSS token
<AppLayout
  sidebar={<SideNav groups={groups} />}
  style={{ '--kiln-app-layout-sidebar-width': '200px' } as React.CSSProperties}
>
  <Content />
</AppLayout>`,
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
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    description: 'Hierarchical navigation trail showing the user\'s location within the app, with chevron separators and mobile truncation.',
    preview: BreadcrumbsPreview,
    code: `import { Breadcrumbs } from '@doriansmith/kiln';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Kiln' },
  ]}
/>`,
    props: [
      { name: 'items', type: 'BreadcrumbItem[]', default: '—', required: true, description: 'Array of breadcrumb items. Last item is the current page (no link rendered).' },
      { name: 'separator', type: 'React.ReactNode', default: 'chevron SVG', required: false, description: 'Custom separator between items.' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes.' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles for CSS token overrides.' },
    ],
    testing: `import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '@doriansmith/kiln';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Dashboard' },
];

it('renders all labels', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});

it('marks last item as current page', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.getByText('Dashboard')).toHaveAttribute('aria-current', 'page');
});

it('does not render a link for the last item', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.queryByRole('link', { name: 'Dashboard' })).not.toBeInTheDocument();
});

it('renders links for non-last items', () => {
  render(<Breadcrumbs items={items} />);
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
});`,
    usage: `// Basic usage
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile' },
]} />

// With custom separator
<Breadcrumbs
  items={crumbs}
  separator={<span aria-hidden="true">›</span>}
/>

// With click handlers (for SPA navigation)
<Breadcrumbs
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Projects', onClick: () => navigate('/projects') },
    { label: 'Kiln' },
  ]}
/>

// Custom font size via token
<Breadcrumbs
  items={crumbs}
  style={{ '--kiln-breadcrumbs-font-size': 'var(--kiln-text-xs)' } as React.CSSProperties}
/>`,
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
  logo={<img src="/logo.png" alt="Kiln" style={{ height: 32, width: 'auto' }} />}
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
  render(<Footer logo={<img src="/logo.png" alt="Kiln" style={{ height: 32, width: 'auto' }} />} />);
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
    id: 'grid',
    name: 'Grid',
    description: 'Responsive CSS grid wrapper with fixed-column and container-aware auto-fit modes. Works inside any layout — no viewport breakpoint config needed.',
    preview: GridPreview,
    code: `import { Grid, GridItem } from '@doriansmith/kiln';

// Fixed cols: 4 at desktop → 2 at tablet → 1 on mobile
<Grid cols={4} gap="md">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
  <Card>Four</Card>
</Grid>

// Auto-fit: browser decides columns based on container width.
// Works inside modals, sidebars, or any nested layout automatically.
<Grid minColWidth={260} gap="md">
  {items.map((item) => <Card key={item.id}>{item.name}</Card>)}
</Grid>

// GridItem: span multiple columns or rows
<Grid cols={3} gap="md">
  <GridItem colSpan={2}><Card>Wide card</Card></GridItem>
  <Card>Narrow</Card>
</Grid>

// Dense packing for mixed-height items (masonry-style)
<Grid cols={4} gap="sm" dense>
  {photos.map((p) => <img key={p.id} src={p.src} alt={p.alt} />)}
</Grid>`,
    props: [
      { name: 'Grid.cols', type: '1 | 2 | 3 | 4', default: '1', required: false, description: 'Fixed columns at desktop. Collapses automatically: 4→2 at tablet, →1 on mobile. Ignored when minColWidth is set.' },
      { name: 'Grid.minColWidth', type: 'number', default: '', required: false, description: 'Auto-fit mode: items stay at least this many pixels wide; the browser calculates the column count from the container width. Mutually exclusive with cols.' },
      { name: 'Grid.dense', type: 'boolean', default: 'false', required: false, description: 'Fill gaps densely when items vary in size (grid-auto-flow: dense). Useful for image galleries.' },
      { name: 'Grid.gap', type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", required: false, description: 'Gap between cells. Override with --kiln-grid-gap on the element.' },
      { name: 'Grid.className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
      { name: 'Grid.style', type: 'React.CSSProperties', default: '', required: false, description: 'Inline styles — use for --kiln-grid-gap token override' },
      { name: 'Grid.children', type: 'React.ReactNode', default: '', required: true, description: 'Grid cells — any elements, or GridItem for spanning' },
      { name: 'GridItem.colSpan', type: '1 | 2 | 3 | 4', default: '', required: false, description: 'Columns to span at desktop. Caps to 2 at tablet, resets to 1 on mobile.' },
      { name: 'GridItem.rowSpan', type: '1 | 2 | 3 | 4', default: '', required: false, description: 'Rows to span at all breakpoints.' },
      { name: 'GridItem.className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
      { name: 'GridItem.children', type: 'React.ReactNode', default: '', required: true, description: 'Cell content' },
    ],
    testing: `import { render } from '@testing-library/react';
import { Grid, GridItem } from '@doriansmith/kiln';

it('sets data-cols attribute', () => {
  const { container } = render(<Grid cols={4}><div /></Grid>);
  expect(container.firstChild).toHaveAttribute('data-cols', '4');
});

it('auto-fit mode omits data-cols and sets --kiln-grid-min-col-width', () => {
  const { container } = render(<Grid minColWidth={260}><div /></Grid>);
  const grid = container.firstChild as HTMLElement;
  expect(grid).not.toHaveAttribute('data-cols');
  expect(grid.style.getPropertyValue('--kiln-grid-min-col-width')).toBe('260px');
});

it('dense mode adds kiln-grid--dense class', () => {
  const { container } = render(<Grid dense><div /></Grid>);
  expect(container.firstChild).toHaveClass('kiln-grid--dense');
});

it('GridItem sets data-col-span', () => {
  const { container } = render(<GridItem colSpan={2}><div /></GridItem>);
  expect(container.firstChild).toHaveAttribute('data-col-span', '2');
});`,
    usage: `// Feature grid on a landing page (what you see in the Kiln hero)
<Grid cols={4} gap="lg">
  {PILLARS.map(({ icon, title, description }) => (
    <Card key={title} variant="raised">
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  ))}
</Grid>

// Dashboard metrics row
<Grid cols={4} gap="md">
  <GridItem colSpan={2}>
    <Card variant="raised"><RevenueChart /></Card>
  </GridItem>
  <MetricCard label="MRR" value="$24k" />
  <MetricCard label="Churn" value="1.2%" />
</Grid>

// Auto-fit image gallery with dense packing
<Grid minColWidth={200} gap="sm" dense>
  {photos.map((p) => (
    <img key={p.id} src={p.src} alt={p.alt} style={{ width: '100%', borderRadius: 'var(--kiln-radius-md)' }} />
  ))}
</Grid>

// Override gap with CSS token
<Grid cols={3} style={{ '--kiln-grid-gap': '2rem' } as React.CSSProperties}>
  {cards}
</Grid>`,
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
  logo={<img src="/logo.png" alt="Kiln" style={{ height: 32, width: 'auto' }} />}
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
    id: 'notification-bar',
    name: 'NotificationBar',
    description: 'Stacked dismissible notification banners with info, success, warning, and error variants, type icons, and aria-live announcement.',
    preview: NotificationBarPreview,
    code: `import { NotificationBar } from '@doriansmith/kiln';

const [items, setItems] = useState([
  { id: '1', type: 'success', message: 'Deployed successfully.', dismissible: true },
  { id: '2', type: 'warning', message: 'API rate limit at 85%.', dismissible: true },
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
    id: 'sidebar-panel',
    name: 'SidebarPanel',
    description: 'Collapsible sidebar panel with a header, close button, desktop slide animation, and mobile overlay drawer with backdrop.',
    preview: SidebarPanelPreview,
    code: `import { SidebarPanel } from '@doriansmith/kiln';

const [open, setOpen] = useState(true);

<SidebarPanel
  header="Navigation"
  open={open}
  onOpenChange={setOpen}
  togglePlacement="both"
>
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/projects">Projects</a>
  </nav>
</SidebarPanel>`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Panel content.' },
      { name: 'header', type: 'React.ReactNode', default: '—', required: false, description: 'Header content rendered in the panel header bar.' },
      { name: 'open', type: 'boolean', default: '—', required: false, description: 'Controlled open state.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when open state should change.' },
      { name: 'defaultOpen', type: 'boolean', default: 'true on ≥768px', required: false, description: 'Initial open state (uncontrolled).' },
      { name: 'togglePlacement', type: "'inside' | 'outside' | 'both'", default: "'both'", required: false, description: "'inside' = close button in header only. 'outside' = FAB only. 'both' = both." },
      { name: 'label', type: 'string', default: "'Sidebar'", required: false, description: 'aria-label for the aside landmark.' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes.' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-sidebar-panel-width etc.' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarPanel } from '@doriansmith/kiln';

it('renders children when open', () => {
  render(<SidebarPanel open={true}><p>Side content</p></SidebarPanel>);
  expect(screen.getByText('Side content')).toBeInTheDocument();
});

it('calls onOpenChange(false) when close button clicked', () => {
  const fn = vi.fn();
  render(<SidebarPanel open={true} onOpenChange={fn} togglePlacement="inside">content</SidebarPanel>);
  fireEvent.click(screen.getByRole('button', { name: /close sidebar/i }));
  expect(fn).toHaveBeenCalledWith(false);
});

it('calls onOpenChange(true) when FAB clicked while closed', () => {
  const fn = vi.fn();
  render(<SidebarPanel open={false} onOpenChange={fn} togglePlacement="outside">content</SidebarPanel>);
  fireEvent.click(screen.getByRole('button', { name: /open sidebar/i }));
  expect(fn).toHaveBeenCalledWith(true);
});`,
    usage: `// Inside AppLayout
<AppLayout
  sidebar={<SideNav groups={navGroups} activeId={activeId} onSelect={setActiveId} />}
  sidebarHeader="Navigation"
  sidebarOpen={open}
  onSidebarChange={setOpen}
>
  <Content />
</AppLayout>

// Standalone — e.g. a filter drawer
const [open, setOpen] = useState(false);
<div style={{ display: 'flex' }}>
  <SidebarPanel
    header="Filters"
    open={open}
    onOpenChange={setOpen}
    style={{ '--kiln-sidebar-panel-width': '220px' } as React.CSSProperties}
  >
    <FilterForm />
  </SidebarPanel>
  <main style={{ flex: 1 }}>
    <ResultsGrid />
  </main>
</div>`,
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
    id: 'split-panel',
    name: 'SplitPanel',
    description: 'Expandable bottom panel with a drag handle for resizing, toggle bar, and keyboard-accessible resize via arrow keys.',
    preview: SplitPanelPreview,
    code: `import { SplitPanel } from '@doriansmith/kiln';

const [open, setOpen] = useState(false);

<SplitPanel
  header="Logs"
  open={open}
  onOpenChange={setOpen}
  defaultHeight={240}
  resizable
>
  <LogViewer />
</SplitPanel>`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Panel content.' },
      { name: 'header', type: 'React.ReactNode', default: '—', required: false, description: 'Toggle bar label.' },
      { name: 'open', type: 'boolean', default: '—', required: false, description: 'Controlled open state.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when open state should change.' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', required: false, description: 'Initial open state (uncontrolled).' },
      { name: 'defaultHeight', type: 'number', default: '280', required: false, description: 'Panel height in px when open.' },
      { name: 'minHeight', type: 'number', default: '80', required: false, description: 'Minimum height in px when dragging.' },
      { name: 'maxHeight', type: 'number', default: '600', required: false, description: 'Maximum height in px when dragging.' },
      { name: 'resizable', type: 'boolean', default: 'true', required: false, description: 'Whether the drag handle is shown.' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes.' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles for CSS token overrides.' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { SplitPanel } from '@doriansmith/kiln';

it('renders toggle bar', () => {
  render(<SplitPanel header="Logs">content</SplitPanel>);
  expect(screen.getByRole('button', { name: /expand panel/i })).toBeInTheDocument();
});

it('shows content when open', () => {
  render(<SplitPanel open={true} header="Logs">Log output</SplitPanel>);
  expect(screen.getByText('Log output')).toBeInTheDocument();
});

it('calls onOpenChange when toggle clicked', () => {
  const fn = vi.fn();
  render(<SplitPanel open={false} onOpenChange={fn} header="Logs">content</SplitPanel>);
  fireEvent.click(screen.getByRole('button'));
  expect(fn).toHaveBeenCalledWith(true);
});

it('resize handle responds to arrow keys', () => {
  render(<SplitPanel open={true} defaultHeight={200} resizable>content</SplitPanel>);
  const handle = screen.getByRole('separator');
  fireEvent.keyDown(handle, { key: 'ArrowUp' });
  // height increases — implementation detail tested via style token
  expect(handle).toBeInTheDocument();
});`,
    usage: `// Log output panel below a code editor
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <CodeEditor />
  <SplitPanel header="Terminal" defaultOpen defaultHeight={200} resizable>
    <Terminal />
  </SplitPanel>
</div>

// Non-resizable details panel
<SplitPanel header="Details" defaultHeight={160} resizable={false}>
  <DetailsView item={selected} />
</SplitPanel>

// Inside AppLayout
<AppLayout
  splitPanel={<LogOutput />}
  splitPanelHeader="Logs"
  splitPanelDefaultHeight={220}
  splitPanelResizable
>
  <MainContent />
</AppLayout>`,
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
  logo={<img src="/logo.png" alt="Kiln" style={{ height: 32, width: 'auto' }} />}
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

  {
    id: 'tools-panel',
    name: 'ToolsPanel',
    description: 'Collapsible right-side panel for help, context, or tools — with a header, close button, mobile drawer, and FAB toggle.',
    preview: ToolsPanelPreview,
    code: `import { ToolsPanel } from '@doriansmith/kiln';

const [open, setOpen] = useState(false);

<ToolsPanel
  header="Help"
  open={open}
  onOpenChange={setOpen}
>
  <p>Contextual help content for this view.</p>
</ToolsPanel>`,
    props: [
      { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Panel content.' },
      { name: 'header', type: 'React.ReactNode', default: '—', required: false, description: 'Header title rendered next to the tools icon.' },
      { name: 'open', type: 'boolean', default: '—', required: false, description: 'Controlled open state.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', required: false, description: 'Fired when open state should change.' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', required: false, description: 'Initial open state (uncontrolled).' },
      { name: 'label', type: 'string', default: "'Tools panel'", required: false, description: 'aria-label for the aside landmark.' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes.' },
      { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles — use for --kiln-tools-panel-width etc.' },
    ],
    testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { ToolsPanel } from '@doriansmith/kiln';

it('renders children when open', () => {
  render(<ToolsPanel open={true}><p>Help text</p></ToolsPanel>);
  expect(screen.getByText('Help text')).toBeInTheDocument();
});

it('calls onOpenChange(false) when close button clicked', () => {
  const fn = vi.fn();
  render(<ToolsPanel open={true} onOpenChange={fn}>content</ToolsPanel>);
  fireEvent.click(screen.getByRole('button', { name: /close tools panel/i }));
  expect(fn).toHaveBeenCalledWith(false);
});

it('calls onOpenChange(true) when FAB clicked while closed', () => {
  const fn = vi.fn();
  render(<ToolsPanel open={false} onOpenChange={fn}>content</ToolsPanel>);
  fireEvent.click(screen.getByRole('button', { name: /open tools panel/i }));
  expect(fn).toHaveBeenCalledWith(true);
});

it('closes on Escape key', async () => {
  const fn = vi.fn();
  render(<ToolsPanel open={true} onOpenChange={fn}>content</ToolsPanel>);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(fn).toHaveBeenCalledWith(false);
});`,
    usage: `// Standalone help panel
<div style={{ display: 'flex' }}>
  <main style={{ flex: 1 }}><Content /></main>
  <ToolsPanel
    header="Context"
    defaultOpen
    style={{ '--kiln-tools-panel-width': '300px' } as React.CSSProperties}
  >
    <HelpArticle />
  </ToolsPanel>
</div>

// Inside AppLayout
<AppLayout
  toolsPanel={<HelpContent />}
  toolsPanelHeader="Help"
  toolsOpen={toolsOpen}
  onToolsChange={setToolsOpen}
>
  <MainPage />
</AppLayout>

// Wider panel with custom token
<ToolsPanel
  header="Inspector"
  style={{ '--kiln-tools-panel-width': '360px' } as React.CSSProperties}
>
  <PropertiesInspector />
</ToolsPanel>`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const COMPONENT_GROUPS = [
  {
    label: 'Components',
    items: componentDocs.map((doc) => ({ id: doc.id, label: doc.name })),
  },
];
