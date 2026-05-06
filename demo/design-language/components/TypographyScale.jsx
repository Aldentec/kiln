import React from 'react';

const SIZES = [
  { token: '--kiln-text-xs',   value: '0.75rem',  px: '12px', hint: 'Captions, labels, helper text' },
  { token: '--kiln-text-sm',   value: '0.875rem', px: '14px', hint: 'Secondary text, metadata, badges' },
  { token: '--kiln-text-base', value: '1rem',     px: '16px', hint: 'Body copy, default UI text' },
  { token: '--kiln-text-lg',   value: '1.125rem', px: '18px', hint: 'Emphasized body, card titles' },
  { token: '--kiln-text-xl',   value: '1.25rem',  px: '20px', hint: 'Section headings (h3)' },
  { token: '--kiln-text-2xl',  value: '1.5rem',   px: '24px', hint: 'Page subheadings (h2)' },
  { token: '--kiln-text-3xl',  value: '1.875rem', px: '30px', hint: 'Page headings (h1)' },
  { token: '--kiln-text-4xl',  value: '2.25rem',  px: '36px', hint: 'Hero and display headings' },
];

const LEADING = [
  { token: '--kiln-leading-tight',   value: '1.25',  use: 'Headings — density over air' },
  { token: '--kiln-leading-normal',  value: '1.5',   use: 'UI elements, compact text' },
  { token: '--kiln-leading-relaxed', value: '1.625', use: 'Body copy — maximises readability' },
];

export function TypographyScale() {
  return (
    <div style={{ marginBottom: 'var(--kiln-space-8)' }}>
      {/* Type scale */}
      <div style={{ border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden', marginBottom: 'var(--kiln-space-6)' }}>
        {SIZES.map((size, i) => (
          <div
            key={size.token}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--kiln-space-4)',
              padding: 'var(--kiln-space-4) var(--kiln-space-5)',
              borderBottom: i < SIZES.length - 1 ? '1px solid var(--kiln-gray-100)' : 'none',
              background: i % 2 === 0 ? 'var(--kiln-surface-raised)' : 'var(--kiln-surface)',
            }}
          >
            <div style={{ minWidth: 120, flexShrink: 0 }}>
              <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-primary-50)', color: 'var(--kiln-primary)', padding: '2px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>
                {size.token}
              </code>
            </div>
            <div style={{ minWidth: 80, flexShrink: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-400)', fontFamily: 'var(--kiln-font-mono)' }}>
              {size.value} / {size.px}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <span
                style={{
                  fontSize: `var(${size.token})`,
                  color: 'var(--kiln-gray-800)',
                  fontFamily: 'var(--kiln-font-sans)',
                  lineHeight: 1.3,
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Kiln Design System
              </span>
            </div>
            <div style={{ minWidth: 200, flexShrink: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textAlign: 'right' }}>
              {size.hint}
            </div>
          </div>
        ))}
      </div>

      {/* Line height */}
      <p style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-700)', marginBottom: 'var(--kiln-space-3)', fontFamily: 'var(--kiln-font-sans)' }}>
        Line Height Tokens
      </p>
      <div style={{ border: '1px solid var(--kiln-gray-200)', borderRadius: 'var(--kiln-radius-xl)', overflow: 'hidden' }}>
        {LEADING.map((l, i) => (
          <div
            key={l.token}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--kiln-space-4)',
              padding: 'var(--kiln-space-4) var(--kiln-space-5)',
              borderBottom: i < LEADING.length - 1 ? '1px solid var(--kiln-gray-100)' : 'none',
              background: 'var(--kiln-surface-raised)',
            }}
          >
            <div style={{ minWidth: 160, flexShrink: 0 }}>
              <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-primary-50)', color: 'var(--kiln-primary)', padding: '2px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>
                {l.token}
              </code>
            </div>
            <div style={{ minWidth: 40, flexShrink: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-400)', fontFamily: 'var(--kiln-font-mono)', paddingTop: 3 }}>
              {l.value}
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--kiln-text-sm)',
                  lineHeight: l.value,
                  color: 'var(--kiln-gray-600)',
                  fontFamily: 'var(--kiln-font-sans)',
                }}
              >
                Kiln components use this line height. {l.use}.
                Notice the spacing between this line and the next.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
