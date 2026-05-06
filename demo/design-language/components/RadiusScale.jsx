import React from 'react';

const RADII = [
  { token: '--kiln-radius-sm',   label: 'sm',   value: '0.375rem', px: '6px',    use: 'Inputs, badges, code blocks' },
  { token: '--kiln-radius-md',   label: 'md',   value: '0.5rem',   px: '8px',    use: 'Buttons, chips, dropdowns' },
  { token: '--kiln-radius-lg',   label: 'lg',   value: '0.75rem',  px: '12px',   use: 'Cards, panels' },
  { token: '--kiln-radius-xl',   label: 'xl',   value: '1rem',     px: '16px',   use: 'Large cards, modals' },
  { token: '--kiln-radius-2xl',  label: '2xl',  value: '1.25rem',  px: '20px',   use: 'Hero sections, feature panels' },
  { token: '--kiln-radius-full', label: 'full', value: '9999px',   px: '9999px', use: 'Pills, toggles, avatar rings' },
];

export function RadiusScale() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--kiln-space-6)',
        marginBottom: 'var(--kiln-space-8)',
      }}
    >
      {RADII.map((r) => (
        <div
          key={r.token}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--kiln-space-3)',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: 'var(--kiln-primary-100)',
              border: '2px solid var(--kiln-primary-200)',
              borderRadius: `var(${r.token})`,
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', fontWeight: 600, color: 'var(--kiln-gray-700)' }}>
              radius-{r.label}
            </div>
            <div style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-400)', marginTop: 2 }}>
              {r.value}
            </div>
            <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', marginTop: 4, maxWidth: 90, textAlign: 'center' }}>
              {r.use}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
