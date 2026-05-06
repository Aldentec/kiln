import React from 'react';

const TOKENS = [
  { token: '--kiln-space-1',  value: '0.25rem', px: '4px'  },
  { token: '--kiln-space-2',  value: '0.5rem',  px: '8px'  },
  { token: '--kiln-space-3',  value: '0.75rem', px: '12px' },
  { token: '--kiln-space-4',  value: '1rem',    px: '16px' },
  { token: '--kiln-space-5',  value: '1.25rem', px: '20px' },
  { token: '--kiln-space-6',  value: '1.5rem',  px: '24px' },
  { token: '--kiln-space-8',  value: '2rem',    px: '32px' },
  { token: '--kiln-space-10', value: '2.5rem',  px: '40px' },
  { token: '--kiln-space-12', value: '3rem',    px: '48px' },
  { token: '--kiln-space-16', value: '4rem',    px: '64px' },
];

// Widths as fractions of 64px base (space-16 = max bar width at 100%)
const MAX_PX = 64;

export function SpacingScale() {
  return (
    <div
      style={{
        background: 'var(--kiln-surface-raised)',
        border: '1px solid var(--kiln-gray-200)',
        borderRadius: 'var(--kiln-radius-xl)',
        overflow: 'hidden',
        marginBottom: 'var(--kiln-space-8)',
      }}
    >
      {TOKENS.map((t, i) => {
        const pxVal = parseInt(t.px, 10);
        const barPct = Math.min((pxVal / MAX_PX) * 100, 100);
        return (
          <div
            key={t.token}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--kiln-space-4)',
              padding: 'var(--kiln-space-3) var(--kiln-space-5)',
              borderBottom: i < TOKENS.length - 1 ? '1px solid var(--kiln-gray-100)' : 'none',
              background: i % 2 === 0 ? 'var(--kiln-surface-raised)' : 'var(--kiln-surface)',
            }}
          >
            <div style={{ minWidth: 130, flexShrink: 0 }}>
              <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-primary-50)', color: 'var(--kiln-primary)', padding: '2px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>
                {t.token}
              </code>
            </div>
            <div style={{ flex: 1, position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  height: 12,
                  width: `${barPct}%`,
                  minWidth: 4,
                  background: 'var(--kiln-primary-200)',
                  borderRadius: 2,
                  transition: 'width 0.3s var(--kiln-ease-out)',
                }}
              />
            </div>
            <div style={{ minWidth: 80, flexShrink: 0, textAlign: 'right', fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
              {t.value} / {t.px}
            </div>
          </div>
        );
      })}
    </div>
  );
}
