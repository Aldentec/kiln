import React, { useState } from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';

const Anchor = ({ href, children, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      {...props}
      style={{
        color: 'var(--kiln-primary)',
        textDecoration: hovered ? 'underline' : 'none',
        transition: `color var(--kiln-duration-fast) var(--kiln-ease-out)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
};

const InlineCode = ({ children }) => (
  <code
    style={{
      fontFamily: 'var(--kiln-font-mono)',
      fontSize: 'var(--kiln-text-sm)',
      background: 'var(--kiln-primary-50)',
      color: 'var(--kiln-primary)',
      padding: '2px 6px',
      borderRadius: 'var(--kiln-radius-sm)',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </code>
);

const Pre = ({ children }) => (
  <pre
    style={{
      background: 'var(--kiln-gray-900)',
      color: 'var(--kiln-gray-100)',
      borderRadius: 'var(--kiln-radius-lg)',
      padding: 'var(--kiln-space-6)',
      overflowX: 'auto',
      marginBottom: 'var(--kiln-space-8)',
      boxShadow: 'var(--kiln-shadow-md)',
    }}
  >
    {children}
  </pre>
);

const BlockquoteParagraph = ({ children }) => (
  <p style={{ marginBottom: 0, color: 'var(--kiln-gray-700)' }}>{children}</p>
);

const components = {
  h1: (props) => (
    <h1
      {...props}
      style={{
        fontFamily: 'var(--kiln-font-sans)',
        fontSize: 'var(--kiln-text-3xl)',
        fontWeight: 700,
        color: 'var(--kiln-gray-900)',
        letterSpacing: 'var(--kiln-tracking-tight)',
        lineHeight: 'var(--kiln-leading-tight)',
        paddingBottom: 'var(--kiln-space-4)',
        marginBottom: 'var(--kiln-space-6)',
        borderBottom: '1px solid var(--kiln-gray-200)',
      }}
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      style={{
        fontFamily: 'var(--kiln-font-sans)',
        fontSize: 'var(--kiln-text-2xl)',
        fontWeight: 700,
        color: 'var(--kiln-gray-900)',
        letterSpacing: 'var(--kiln-tracking-tight)',
        marginTop: 'var(--kiln-space-12)',
        marginBottom: 'var(--kiln-space-4)',
      }}
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      style={{
        fontSize: 'var(--kiln-text-xl)',
        fontWeight: 600,
        color: 'var(--kiln-gray-800)',
        marginTop: 'var(--kiln-space-8)',
        marginBottom: 'var(--kiln-space-3)',
      }}
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      style={{
        fontSize: 'var(--kiln-text-lg)',
        fontWeight: 600,
        color: 'var(--kiln-gray-700)',
        marginTop: 'var(--kiln-space-6)',
        marginBottom: 'var(--kiln-space-2)',
      }}
    />
  ),
  p: (props) => (
    <p
      {...props}
      style={{
        fontSize: 'var(--kiln-text-base)',
        color: 'var(--kiln-gray-600)',
        lineHeight: 'var(--kiln-leading-relaxed)',
        marginBottom: 'var(--kiln-space-5)',
        maxWidth: '72ch',
      }}
    />
  ),
  a: Anchor,
  code: InlineCode,
  pre: Pre,
  ul: (props) => (
    <ul
      {...props}
      style={{
        color: 'var(--kiln-gray-600)',
        lineHeight: 'var(--kiln-leading-relaxed)',
        paddingLeft: 'var(--kiln-space-6)',
        marginBottom: 'var(--kiln-space-5)',
      }}
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      style={{
        color: 'var(--kiln-gray-600)',
        lineHeight: 'var(--kiln-leading-relaxed)',
        paddingLeft: 'var(--kiln-space-6)',
        marginBottom: 'var(--kiln-space-5)',
      }}
    />
  ),
  li: (props) => (
    <li {...props} style={{ marginBottom: 'var(--kiln-space-2)' }} />
  ),
  blockquote: ({ children }) => (
    <blockquote
      style={{
        borderLeft: '3px solid var(--kiln-primary)',
        background: 'var(--kiln-primary-50)',
        borderRadius: 'var(--kiln-radius-md)',
        padding: 'var(--kiln-space-4) var(--kiln-space-6)',
        marginBottom: 'var(--kiln-space-6)',
      }}
    >
      <BaseMDXProvider components={{ p: BlockquoteParagraph }}>
        {children}
      </BaseMDXProvider>
    </blockquote>
  ),
  hr: () => (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid var(--kiln-gray-200)',
        margin: 'var(--kiln-space-12) 0',
      }}
    />
  ),
  table: (props) => (
    <table
      {...props}
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: 'var(--kiln-space-8)',
        fontSize: 'var(--kiln-text-sm)',
      }}
    />
  ),
  th: (props) => (
    <th
      {...props}
      style={{
        textAlign: 'left',
        padding: 'var(--kiln-space-3) var(--kiln-space-4)',
        background: 'var(--kiln-gray-100)',
        color: 'var(--kiln-gray-700)',
        fontWeight: 600,
        borderBottom: '2px solid var(--kiln-gray-200)',
      }}
    />
  ),
  td: (props) => (
    <td
      {...props}
      style={{
        padding: 'var(--kiln-space-3) var(--kiln-space-4)',
        color: 'var(--kiln-gray-600)',
        borderBottom: '1px solid var(--kiln-gray-100)',
      }}
    />
  ),
};

export function MDXProvider({ children }) {
  return (
    <BaseMDXProvider components={components}>
      {children}
    </BaseMDXProvider>
  );
}
