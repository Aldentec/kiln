import React from 'react';

const SHADOWS = [
  { token: '--kiln-shadow-xs',         label: 'xs',         value: '0 1px 2px rgba(0,0,0,0.05)',                                            use: 'Subtle separation, dividers' },
  { token: '--kiln-shadow-sm',         label: 'sm',         value: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',               use: 'Cards, chips, inputs' },
  { token: '--kiln-shadow-md',         label: 'md',         value: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',    use: 'Dropdowns, popovers' },
  { token: '--kiln-shadow-lg',         label: 'lg',         value: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)', use: 'Modals, drawers' },
  { token: '--kiln-shadow-xl',         label: 'xl',         value: '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)', use: 'Full-page overlays' },
  { token: '--kiln-shadow-2xl',        label: '2xl',        value: '0 25px 50px -12px rgba(0,0,0,0.15)',                                   use: 'Prominent floating UI' },
  { token: '--kiln-shadow-glow',       label: 'glow',       value: '0 0 20px rgba(137,33,107,0.2)',                                        use: 'Primary button focus glow' },
  { token: '--kiln-shadow-glow-accent',label: 'glow-accent',value: '0 0 20px rgba(247,183,51,0.2)',                                        use: 'Accent highlight glow' },
  { token: '--kiln-shadow-inner',      label: 'inner',      value: 'inset 0 2px 4px rgba(0,0,0,0.04)',                                     use: 'Pressed states, inset fields' },
];

export function ShadowScale() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 'var(--kiln-space-6)',
        marginBottom: 'var(--kiln-space-8)',
      }}
    >
      {SHADOWS.map((s) => (
        <div
          key={s.token}
          style={{
            background: 'var(--kiln-surface-raised)',
            borderRadius: 'var(--kiln-radius-lg)',
            boxShadow: `var(${s.token})`,
            padding: 'var(--kiln-space-6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--kiln-space-3)',
            border: '1px solid var(--kiln-gray-100)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--kiln-font-mono)',
              fontSize: 'var(--kiln-text-sm)',
              fontWeight: 600,
              color: 'var(--kiln-gray-800)',
            }}
          >
            shadow-{s.label}
          </div>
          <div
            style={{
              fontSize: 'var(--kiln-text-xs)',
              color: 'var(--kiln-gray-400)',
              textAlign: 'center',
              fontFamily: 'var(--kiln-font-mono)',
              wordBreak: 'break-all',
            }}
          >
            {s.value}
          </div>
          <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', textAlign: 'center' }}>
            {s.use}
          </div>
        </div>
      ))}
    </div>
  );
}
