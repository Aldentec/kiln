import React, { useState } from 'react';

const DURATIONS = [
  { token: '--kiln-duration-fast',   label: 'fast',   ms: 250,  use: 'Micro-interactions: hover, focus ring, tooltip appear' },
  { token: '--kiln-duration-normal', label: 'normal', ms: 380,  use: 'Component transitions: accordion, tabs, dropdown' },
  { token: '--kiln-duration-slow',   label: 'slow',   ms: 500,  use: 'Page-level transitions: modals, drawers, page fade' },
  { token: '--kiln-duration-slower', label: 'slower', ms: 700,  use: 'Onboarding, emphasis moments, delight animations' },
];

const RESET_DELAY = 1500;

export function MotionScale() {
  const [progress, setProgress] = useState({});

  function run(key, ms) {
    setProgress((p) => ({ ...p, [key]: true }));
    setTimeout(() => setProgress((p) => ({ ...p, [key]: false })), RESET_DELAY);
  }

  function runAll() {
    DURATIONS.forEach(({ token, ms }) => run(token, ms));
  }

  return (
    <div
      style={{
        background: 'var(--kiln-surface-raised)',
        border: '1px solid var(--kiln-gray-200)',
        borderRadius: 'var(--kiln-radius-xl)',
        padding: 'var(--kiln-space-6)',
        marginBottom: 'var(--kiln-space-8)',
        boxShadow: 'var(--kiln-shadow-sm)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--kiln-space-4)' }}>
        <button
          onClick={runAll}
          style={{
            padding: '8px 20px',
            background: 'var(--kiln-primary-bg)',
            color: 'var(--kiln-primary-fg)',
            border: 'none',
            borderRadius: 'var(--kiln-radius-md)',
            fontSize: 'var(--kiln-text-sm)',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--kiln-font-sans)',
          }}
        >
          Run all
        </button>
      </div>
      {DURATIONS.map((d, i) => {
        const active = !!progress[d.token];
        return (
          <div
            key={d.token}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--kiln-space-4)',
              padding: 'var(--kiln-space-4) 0',
              borderBottom: i < DURATIONS.length - 1 ? '1px solid var(--kiln-gray-100)' : 'none',
            }}
          >
            <div style={{ minWidth: 160, flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-800)' }}>
                duration-{d.label}
              </div>
              <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', marginTop: 2 }}>
                {d.ms}ms — {d.use}
              </div>
            </div>
            <div style={{ flex: 1, background: 'var(--kiln-gray-100)', borderRadius: 'var(--kiln-radius-full)', height: 8, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--kiln-primary-bg)',
                  borderRadius: 'var(--kiln-radius-full)',
                  width: active ? '100%' : '0%',
                  transition: active
                    ? `width ${d.ms}ms var(--kiln-ease-out)`
                    : 'none',
                }}
              />
            </div>
            <button
              onClick={() => run(d.token, d.ms)}
              disabled={active}
              style={{
                padding: '6px 16px',
                background: active ? 'var(--kiln-gray-200)' : 'var(--kiln-primary-bg)',
                color: active ? 'var(--kiln-gray-600)' : 'var(--kiln-primary-fg)',
                border: 'none',
                borderRadius: 'var(--kiln-radius-md)',
                fontSize: 'var(--kiln-text-sm)',
                fontWeight: 600,
                cursor: active ? 'default' : 'pointer',
                fontFamily: 'var(--kiln-font-sans)',
                minWidth: 56,
              }}
            >
              {active ? '…' : 'Run'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
