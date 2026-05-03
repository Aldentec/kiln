import React from 'react';
import { AppLayout, Nav, SideNav } from '@doriansmith/kiln';
import type { AppLayoutNotification } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const APP_LAYOUT_STATS = ['Shipped', 'In Review', 'Drafts', 'Archived'];
const APP_LAYOUT_COUNTS = [12, 4, 7, 31];

const APP_LAYOUT_NAV_ITEMS = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Docs' },
];
const APP_LAYOUT_SIDE_NAV_GROUPS = [
  { items: [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects',  label: 'Projects'  },
    { id: 'settings',  label: 'Settings'  },
  ]},
];
const APP_LAYOUT_LOGO = (
  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)', fontWeight: 700 }}>
    <span style={{ width: 24, height: 24, background: 'var(--kiln-primary)', borderRadius: 4, display: 'inline-block' }} />
    My App
  </span>
);

const AppLayoutPreview: React.FC = () => {
  const [activeId, setActiveId] = React.useState('dashboard');
  const [notifications, setNotifications] = React.useState<AppLayoutNotification[]>([
    { id: 'n1', type: 'info', message: 'AppLayout — sidebar, breadcrumbs, notifications, and more.', dismissible: true, onDismiss: (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id)) },
  ]);
  return (
    <div style={{ height: 420, border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden', position: 'relative' }}>
      <AppLayout
        topBar={<Nav logo={APP_LAYOUT_LOGO} items={APP_LAYOUT_NAV_ITEMS} sticky={false} />}
        sideBar={<SideNav groups={APP_LAYOUT_SIDE_NAV_GROUPS} activeId={activeId} onSelect={setActiveId} />}
        breadcrumbs={[{ label: 'Projects', href: '#' }, { label: 'Kiln' }]}
        notifications={notifications}
        header={<h2 style={{ margin: 0, fontSize: 'var(--kiln-text-xl)', fontWeight: 700 }}>Overview</h2>}
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

export const appLayout: ComponentDoc = {
  id: 'app-layout',
  name: 'AppLayout',
  description: 'Full-page application shell with collapsible sidebar, tools panel, breadcrumbs, notifications, page header, and split panel.',
  preview: AppLayoutPreview,
  code: `import { AppLayout, Nav, SideNav } from '@doriansmith/kiln';

const logo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)', fontWeight: 700 }}>
    <span style={{ width: 24, height: 24, background: 'var(--kiln-primary)', borderRadius: 4, display: 'inline-block' }} />
    My App
  </span>
);
const navItems = [{ href: '#', label: 'Home' }, { href: '#', label: 'Docs' }];
const groups = [{ items: [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects',  label: 'Projects'  },
  { id: 'settings',  label: 'Settings'  },
]}];

const [activeId, setActiveId] = useState('dashboard');
const [notifications, setNotifications] = useState([
  {
    id: 'n1', type: 'info',
    message: 'AppLayout — sidebar, breadcrumbs, notifications, and more.',
    dismissible: true,
    onDismiss: (id) => setNotifications((prev) => prev.filter((n) => n.id !== id)),
  },
]);

<AppLayout
  topBar={<Nav logo={logo} items={navItems} />}
  sideBar={<SideNav groups={groups} activeId={activeId} onSelect={setActiveId} />}
  breadcrumbs={[{ label: 'Projects', href: '#' }, { label: 'Kiln' }]}
  notifications={notifications}
  header={<h2 style={{ margin: 0, fontSize: 'var(--kiln-text-xl)', fontWeight: 700 }}>Overview</h2>}
>
  <YourPageContent />
</AppLayout>`,
  props: [
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Main page content' },
    { name: 'topBar', type: 'React.ReactNode', default: '—', required: false, description: 'Sticky top bar slot (e.g. <Nav />)' },
    { name: 'sideBar', type: 'React.ReactNode', default: '—', required: false, description: 'Left sidebar content — pass a <SideNav> that manages its own open/collapse state' },
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

it('renders sideBar content', () => {
  render(
    <AppLayout sideBar={<nav>Side</nav>}>Content</AppLayout>
  );
  expect(screen.getByText('Side')).toBeInTheDocument();
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
<AppLayout topBar={<MyTopBar />}>
  <Dashboard />
</AppLayout>

// Full application shell
const [notifications, setNotifications] = useState([
  { id: '1', type: 'success', message: 'Deployment complete.', dismissible: true,
    onDismiss: (id) => setNotifications((n) => n.filter((x) => x.id !== id)) },
]);

// Full shell — SideNav manages its own open/collapse state internally
<AppLayout
  topBar={<Nav logo={logo} items={navItems} />}
  sideBar={<SideNav groups={groups} activeId={activeId} onSelect={setActiveId} />}
  breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: 'Kiln' }]}
  notifications={notifications}
  header={<h1>Kiln</h1>}
  splitPanel={<LogViewer />}
>
  <ProjectOverview />
</AppLayout>

// With a tools panel (controlled)
const [toolsOpen, setToolsOpen] = useState(false);
<AppLayout
  sideBar={<SideNav groups={groups} />}
  toolsPanel={<HelpPanel />}
  toolsOpen={toolsOpen}
  onToolsChange={setToolsOpen}
>
  <Content />
</AppLayout>`,
};
