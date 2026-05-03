import React from 'react';
import { Header, Button } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const HeaderPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
    {/* Page-level header with decorative tagline */}
    <Header
      variant="h1"
      tagline="My App"
      description="Summarises what's on this page."
    >
      Dashboard
    </Header>

    {/* Section header with inline actions */}
    <Header
      variant="h2"
      description="Manage your team members and their roles."
      actions={
        <>
          <Button variant="secondary">Export</Button>
          <Button variant="primary">Invite member</Button>
        </>
      }
      divider
    >
      Team
    </Header>

    {/* Sub-section header */}
    <Header variant="h3">Recent activity</Header>
  </div>
);

export const header: ComponentDoc = {
  id: 'header',
  name: 'Header',
  description: 'A consistent page and section heading block with optional tagline, description, and actions slot. Provides standardised vertical spacing so every page title sits the same distance from the Nav.',
  preview: HeaderPreview,
  code: `import { Header, Button } from '@doriansmith/kiln';

// Page-level header with decorative tagline
<Header
  variant="h1"
  tagline="My App"
  description="Summarises what's on this page."
>
  Dashboard
</Header>

// Section header with inline actions
<Header
  variant="h2"
  description="Manage your team members and their roles."
  actions={
    <>
      <Button variant="secondary">Export</Button>
      <Button variant="primary">Invite member</Button>
    </>
  }
  divider
>
  Team
</Header>

// Sub-section header
<Header variant="h3">Recent activity</Header>`,
  props: [
    { name: 'variant', type: "'h1' | 'h2' | 'h3'", default: "'h2'", required: false, description: 'Heading level — controls the semantic tag, font size, and spacing. h1 centres its content for page-hero use; h2/h3 are left-aligned for section use.' },
    { name: 'tagline', type: 'string', default: '—', required: false, description: 'Optional large decorative display text rendered above the heading with the Kiln brand gradient. Hidden from assistive technology.' },
    { name: 'description', type: 'React.ReactNode', default: '—', required: false, description: 'Subtitle rendered below the heading in muted, smaller text.' },
    { name: 'actions', type: 'React.ReactNode', default: '—', required: false, description: 'Right-aligned slot for buttons, badges, or other controls. Centres below the description for h1.' },
    { name: 'divider', type: 'boolean', default: 'false', required: false, description: 'Renders a hairline separator below the header block.' },
    { name: 'id', type: 'string', default: '—', required: false, description: 'Forwards to the heading element — use with aria-labelledby on the parent <section>.' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the outer wrapper.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles. Use --kiln-header-max-width to override the 1100px content width, and --kiln-header-padding-x to override horizontal padding.' },
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'The heading text.' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { Header } from '@doriansmith/kiln';

it('renders the heading text', () => {
  render(<Header>Page Title</Header>);
  expect(screen.getByText('Page Title')).toBeInTheDocument();
});

it('defaults to an h2 element', () => {
  const { container } = render(<Header>Section</Header>);
  expect(container.querySelector('h2')).toBeInTheDocument();
});

it('renders h1 when variant="h1"', () => {
  const { container } = render(<Header variant="h1">Title</Header>);
  expect(container.querySelector('h1')).toBeInTheDocument();
});

it('renders description and actions', () => {
  render(
    <Header description="A subtitle" actions={<button>Save</button>}>
      Title
    </Header>
  );
  expect(screen.getByText('A subtitle')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
});`,
  usage: `// Consistent page hero — replaces custom hero sections
<section aria-labelledby="page-heading">
  <Header
    id="page-heading"
    variant="h1"
    tagline="Reports"
    description="Monitor usage, performance, and billing across all workspaces."
  >
    Analytics
  </Header>
  {/* page content */}
</section>

// Section with CRUD actions
<section aria-labelledby="users-heading">
  <Header
    id="users-heading"
    variant="h2"
    description="Manage access for your organisation."
    actions={
      <>
        <Button variant="secondary">Export CSV</Button>
        <Button variant="primary" leftIcon={<PlusIcon />}>Add user</Button>
      </>
    }
    divider
  >
    Users
  </Header>
  <UserTable />
</section>`,
};
