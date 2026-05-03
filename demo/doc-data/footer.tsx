import React from 'react';
import { Footer } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

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

export const footer: ComponentDoc = {
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
};
