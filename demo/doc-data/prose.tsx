import React from 'react';
import { Prose } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ProsePreview: React.FC = () => (
  <Prose maxWidth="full">
    <h2>The case for constraint</h2>
    <p className="lead">
      Every system that scales was built on a foundation of deliberate limits.
    </p>
    <p>
      Kiln makes choices so you don't have to relitigate them on every project.
      Color, spacing, motion, radius — each one resolved once and shared everywhere.
    </p>
    <blockquote>
      <p>Good design is as little design as possible.</p>
    </blockquote>
    <h3>What that means in practice</h3>
    <ul>
      <li>Install once, import CSS, start building.</li>
      <li>Dark mode is <code>data-theme="dark"</code> on <code>&lt;html&gt;</code>.</li>
      <li>No config files. No theme providers.</li>
    </ul>
  </Prose>
);

export const prose: ComponentDoc = {
  id: 'prose',
  name: 'Prose',
  description: 'Reading-optimized typography container. Applies consistent heading hierarchy, paragraph spacing, and inline element styles to arbitrary HTML content.',
  preview: ProsePreview,
  code: `import { Prose } from '@doriansmith/kiln';

<Prose>
  <h2>Article title</h2>
  <p className="lead">A short intro paragraph styled larger.</p>
  <p>Body copy with <a href="#">links</a> and <code>inline code</code>.</p>
  <blockquote>
    <p>A pull quote rendered with the Kiln accent border.</p>
  </blockquote>
  <h3>Sub-heading</h3>
  <ul>
    <li>Bullet one</li>
    <li>Bullet two</li>
  </ul>
</Prose>`,
  props: [
    { name: 'children', type: 'React.ReactNode', default: '—', required: true, description: 'Any HTML content — headings, paragraphs, lists, code, blockquotes, tables' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Base font size — scales the entire type hierarchy' },
    { name: 'maxWidth', type: "string | 'full'", default: "'68ch'", required: false, description: "Reading line length. 68ch is optimal for body copy. Pass 'full' to disable." },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles (supports CSS custom property overrides)' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import { Prose } from '@doriansmith/kiln';

it('renders children', () => {
  render(<Prose><p>Hello</p></Prose>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

it('applies size class', () => {
  const { container } = render(<Prose size="lg"><p>Text</p></Prose>);
  expect(container.firstChild).toHaveClass('kiln-prose--lg');
});`,
  usage: `// Blog post body
<Section background="default" padding="lg">
  <Prose>
    <h1>{post.title}</h1>
    <p className="lead">{post.excerpt}</p>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </Prose>
</Section>

// MDX page content
<Prose size="md" maxWidth="72ch">
  <MDXContent />
</Prose>

// Smaller annotation text
<Prose size="sm" maxWidth="full">
  <p>Terms and conditions apply.</p>
</Prose>`,
};
