import React from 'react';
import { Hero, Button, Badge } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const HeroPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-6)', width: '100%' }}>
    {/* Default centred hero */}
    <Hero
      size="sm"
      eyebrow="Why Kiln"
      title="Ship fast without compromise"
      description="A lightweight React component library with 25+ WCAG AA-compliant primitives."
      actions={
        <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" size="sm">Get started</Button>
          <Button variant="secondary" size="sm">View components</Button>
        </div>
      }
    />

    {/* Left-aligned with badges */}
    <Hero
      size="sm"
      align="left"
      eyebrow={
        <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap' }}>
          <Badge variant="success">WCAG AA</Badge>
          <Badge variant="info">TypeScript</Badge>
        </div>
      }
      title="Accessible components for indie developers"
      description="Install, import, and ship — no config, no wrappers."
      actions={
        <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap' }}>
          <Button variant="primary" size="sm">Install now</Button>
        </div>
      }
    />

    {/* Right-aligned */}
    <Hero
      size="sm"
      align="right"
      eyebrow="Release"
      title="v0.3.0 is here"
      description="New components, better performance, zero breaking changes."
      actions={
        <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="sm">Changelog</Button>
          <Button variant="primary" size="sm">Get started</Button>
        </div>
      }
    />

    {/* Gradient variant */}
    <Hero
      size="sm"
      variant="gradient"
      title="The design system that ships with you"
      description="Built for makers who refuse to choose between speed and quality."
      actions={
        <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" size="sm">Start building</Button>
          <Button variant="ghost" size="sm">Learn more</Button>
        </div>
      }
    />
  </div>
);

export const hero: ComponentDoc = {
  id: 'hero',
  name: 'Hero',
  description: 'A full-width page hero section with eyebrow, title, description, actions, and optional media slots. Renders as a semantic <section> landmark. Supports default, gradient, and glass variants; three sizes; left and center alignment.',
  preview: HeroPreview,
  code: `import { Hero, Button, Badge } from '@doriansmith/kiln';

// Centred hero with string eyebrow and CTAs
<Hero
  size="sm"
  eyebrow="Why Kiln"
  title="Ship fast without compromise"
  description="A lightweight React component library with 25+ WCAG AA-compliant primitives."
  actions={
    <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="primary" size="sm">Get started</Button>
      <Button variant="secondary" size="sm">View components</Button>
    </div>
  }
/>

// Right-aligned
<Hero
  size="sm"
  align="right"
  eyebrow="Release"
  title="v0.3.0 is here"
  description="New components, better performance, zero breaking changes."
  actions={
    <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
      <Button variant="secondary" size="sm">Changelog</Button>
      <Button variant="primary" size="sm">Get started</Button>
    </div>
  }
/>

// Left-aligned with badge eyebrow
<Hero
  size="sm"
  align="left"
  eyebrow={
    <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap' }}>
      <Badge variant="success">WCAG AA</Badge>
      <Badge variant="info">TypeScript</Badge>
    </div>
  }
  title="Accessible components for indie developers"
  description="Install, import, and ship — no config, no wrappers."
  actions={
    <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap' }}>
      <Button variant="primary" size="sm">Install now</Button>
    </div>
  }
/>

// Gradient variant
<Hero
  size="sm"
  variant="gradient"
  title="The design system that ships with you"
  description="Built for makers who refuse to choose between speed and quality."
  actions={
    <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="primary" size="sm">Start building</Button>
      <Button variant="ghost" size="sm">Learn more</Button>
    </div>
  }
/>`,
  props: [
    { name: 'title', type: 'React.ReactNode', default: '—', required: true, description: 'Main heading text — rendered as an <h1>.' },
    { name: 'eyebrow', type: 'React.ReactNode', default: '—', required: false, description: 'Content rendered above the title. Plain strings render as uppercase tracking-wide labels in the primary colour. Pass a Badge, custom element, or decorative wordmark for richer treatments.' },
    { name: 'description', type: 'React.ReactNode', default: '—', required: false, description: 'Body copy rendered below the title in muted, slightly larger text.' },
    { name: 'actions', type: 'React.ReactNode', default: '—', required: false, description: 'Slot for CTAs, badges, or any content below the description. Renders in a flex-column container; wrap buttons in a flex row for side-by-side layout.' },
    { name: 'media', type: 'React.ReactNode', default: '—', required: false, description: 'Optional right-side visual slot. When provided the layout becomes two-column (content left, media right). On mobile (≤768px) the columns stack vertically.' },
    { name: 'align', type: "'left' | 'center' | 'right'", default: "'center'", required: false, description: 'Content alignment. Left and right-aligned heroes collapse to centered on mobile.' },
    { name: 'variant', type: "'default' | 'gradient' | 'glass'", default: "'default'", required: false, description: 'Visual style. default: body background. gradient: dark brand gradient with primary glow. glass: frosted-glass surface with backdrop-filter blur.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'lg'", required: false, description: 'Controls min-height. lg=80vh, md=60vh, sm=no min-height. Override via --kiln-hero-min-height.' },
    { name: 'id', type: 'string', default: '—', required: false, description: 'Forwarded to the <h1> element. The parent <section> receives aria-labelledby pointing to this id — makes the hero a properly labelled landmark.' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the outer <section>.' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles. Use component tokens to override layout and typography: --kiln-hero-min-height, --kiln-hero-max-width, --kiln-hero-padding-x, --kiln-hero-padding-y, --kiln-hero-title-size, --kiln-hero-desc-size, --kiln-hero-gap.' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { Hero } from '@doriansmith/kiln';

it('renders title as h1', () => {
  render(<Hero title="Ship fast" />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ship fast');
});

it('renders section landmark with aria-labelledby when id provided', () => {
  render(<Hero id="hero-heading" title="Title" />);
  const section = screen.getByRole('region');
  expect(section).toHaveAttribute('aria-labelledby', 'hero-heading');
  expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'hero-heading');
});

it('renders eyebrow, description, and actions', () => {
  render(
    <Hero
      title="Title"
      eyebrow="New"
      description="A description."
      actions={<button>CTA</button>}
    />
  );
  expect(screen.getByText('New')).toBeInTheDocument();
  expect(screen.getByText('A description.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'CTA' })).toBeInTheDocument();
});

it('applies variant, size, and align classes', () => {
  const { container } = render(
    <Hero title="T" variant="gradient" size="md" align="left" />
  );
  const el = container.querySelector('.kiln-hero');
  expect(el).toHaveClass('kiln-hero--gradient', 'kiln-hero--md', 'kiln-hero--left');
});`,
  usage: `// Full landing page hero
<Hero
  id="landing-hero"
  eyebrow={
    <div aria-hidden="true" style={{
      fontSize: 'clamp(3rem, 8vw, 5rem)',
      fontWeight: 700,
      background: 'var(--kiln-gradient-brand)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      Acme
    </div>
  }
  title="Build products people love"
  description="The toolkit your team needs to ship accessible, performant UIs in record time."
  actions={
    <>
      <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" size="lg" href="/docs">Read the docs</Button>
        <Button variant="secondary" size="lg" href="/components">Browse components</Button>
      </div>
      <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Badge variant="success">WCAG AA</Badge>
        <Badge variant="info">TypeScript</Badge>
        <Badge variant="running">Zero config</Badge>
      </div>
    </>
  }
/>

// Section hero inside a page (size="md")
<Hero
  id="about-hero"
  size="md"
  eyebrow="About"
  title="Built for indie developers"
  description="One install. One CSS import. Ship accessible UIs in under 2 minutes."
/>

// Gradient variant for marketing splash
<Hero
  variant="gradient"
  size="lg"
  eyebrow="Launch week"
  title="v0.3.0 is here"
  description="New components, better performance, zero breaking changes."
  actions={
    <div style={{ display: 'flex', gap: 'var(--kiln-space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Button variant="primary" size="lg">See what's new</Button>
      <Button variant="ghost" size="lg" style={{ color: 'var(--kiln-gray-50)' }}>Changelog</Button>
    </div>
  }
/>`,
};
