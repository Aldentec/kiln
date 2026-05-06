import React, { useState } from 'react';
import { navigate } from '../../useRouter';

export function DesignLanguageCard({ title, description, href, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); navigate(href); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'var(--kiln-surface-raised)',
        borderRadius: 'var(--kiln-radius-xl)',
        boxShadow: hovered ? 'var(--kiln-shadow-md)' : 'var(--kiln-shadow-sm)',
        padding: 'var(--kiln-space-6)',
        border: '1px solid var(--kiln-gray-200)',
        transition: `box-shadow var(--kiln-duration-fast) var(--kiln-ease-out), transform var(--kiln-duration-fast) var(--kiln-ease-out)`,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {icon && (
        <div style={{ fontSize: '1.75rem', marginBottom: 'var(--kiln-space-3)', lineHeight: 1 }}>
          {icon}
        </div>
      )}
      <div style={{ fontSize: 'var(--kiln-text-base)', fontWeight: 700, color: 'var(--kiln-gray-900)', marginBottom: 'var(--kiln-space-2)', fontFamily: 'var(--kiln-font-sans)' }}>
        {title}
      </div>
      <div style={{ fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-500)', lineHeight: 'var(--kiln-leading-relaxed)', fontFamily: 'var(--kiln-font-sans)' }}>
        {description}
      </div>
    </a>
  );
}
