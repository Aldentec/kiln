import React from 'react';
import { AppLayout } from '@doriansmith/kiln';
import type { AppLayoutNotification } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

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

export const appLayout: ComponentDoc = {
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
};
