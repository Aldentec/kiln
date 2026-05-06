import React, { useState } from 'react';
import { contrastRatio } from '../../../src/theme/colorUtils.js';

function PassFail({ label, threshold, ratio }) {
  const pass = ratio >= threshold;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 10px',
        borderRadius: 'var(--kiln-radius-full)',
        fontSize: 'var(--kiln-text-xs)',
        fontWeight: 600,
        background: pass ? 'var(--kiln-status-success)' : 'var(--kiln-status-error)',
        color: '#ffffff',
        marginRight: 'var(--kiln-space-2)',
      }}
    >
      {pass ? '✓' : '✗'} {label}
    </span>
  );
}

function isValidHex(val) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val);
}

export function ContrastChecker() {
  const [fg, setFg] = useState('#89216b');
  const [bg, setBg] = useState('#ffffff');
  const [fgText, setFgText] = useState('#89216b');
  const [bgText, setBgText] = useState('#ffffff');

  const fgValid = isValidHex(fg);
  const bgValid = isValidHex(bg);
  const ratio = fgValid && bgValid ? contrastRatio(fg, bg) : null;

  function handleFgText(val) {
    setFgText(val);
    if (isValidHex(val)) setFg(val);
  }
  function handleBgText(val) {
    setBgText(val);
    if (isValidHex(val)) setBg(val);
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
      <div style={{ display: 'flex', gap: 'var(--kiln-space-6)', flexWrap: 'wrap', marginBottom: 'var(--kiln-space-6)' }}>
        {/* Foreground */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-2)' }}>
          <label style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-700)' }}>
            Foreground
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
            <input
              type="color"
              value={fgValid ? fg : '#89216b'}
              onChange={(e) => { setFg(e.target.value); setFgText(e.target.value); }}
              style={{ width: 40, height: 40, border: 'none', borderRadius: 'var(--kiln-radius-md)', cursor: 'pointer', padding: 0 }}
            />
            <input
              type="text"
              value={fgText}
              onChange={(e) => handleFgText(e.target.value)}
              style={{
                fontFamily: 'var(--kiln-font-mono)',
                fontSize: 'var(--kiln-text-sm)',
                padding: '6px 10px',
                borderRadius: 'var(--kiln-radius-md)',
                border: `1px solid ${fgValid ? 'var(--kiln-gray-200)' : 'var(--kiln-status-error)'}`,
                background: 'var(--kiln-surface)',
                color: 'var(--kiln-gray-900)',
                width: 110,
              }}
            />
          </div>
        </div>
        {/* Background */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-2)' }}>
          <label style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-700)' }}>
            Background
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
            <input
              type="color"
              value={bgValid ? bg : '#ffffff'}
              onChange={(e) => { setBg(e.target.value); setBgText(e.target.value); }}
              style={{ width: 40, height: 40, border: 'none', borderRadius: 'var(--kiln-radius-md)', cursor: 'pointer', padding: 0 }}
            />
            <input
              type="text"
              value={bgText}
              onChange={(e) => handleBgText(e.target.value)}
              style={{
                fontFamily: 'var(--kiln-font-mono)',
                fontSize: 'var(--kiln-text-sm)',
                padding: '6px 10px',
                borderRadius: 'var(--kiln-radius-md)',
                border: `1px solid ${bgValid ? 'var(--kiln-gray-200)' : 'var(--kiln-status-error)'}`,
                background: 'var(--kiln-surface)',
                color: 'var(--kiln-gray-900)',
                width: 110,
              }}
            />
          </div>
        </div>
        {/* Ratio */}
        {ratio !== null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-2)' }}>
            <span style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-700)' }}>Contrast Ratio</span>
            <span style={{ fontSize: 'var(--kiln-text-3xl)', fontWeight: 700, color: 'var(--kiln-gray-900)', lineHeight: 1 }}>
              {ratio.toFixed(2)}<span style={{ fontSize: 'var(--kiln-text-lg)', color: 'var(--kiln-gray-500)' }}>:1</span>
            </span>
          </div>
        )}
      </div>

      {/* Badges */}
      {ratio !== null && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)', marginBottom: 'var(--kiln-space-6)' }}>
          <PassFail label="AA Normal (4.5:1)" threshold={4.5} ratio={ratio} />
          <PassFail label="AA Large (3.0:1)" threshold={3.0} ratio={ratio} />
          <PassFail label="AAA Normal (7.0:1)" threshold={7.0} ratio={ratio} />
        </div>
      )}

      {/* Preview */}
      <div
        style={{
          background: bgValid ? bg : '#ffffff',
          borderRadius: 'var(--kiln-radius-lg)',
          padding: 'var(--kiln-space-4) var(--kiln-space-6)',
          border: '1px solid var(--kiln-gray-200)',
        }}
      >
        <p style={{ margin: 0, color: fgValid ? fg : '#000000', fontSize: 'var(--kiln-text-base)', fontFamily: 'var(--kiln-font-sans)' }}>
          The quick brown fox jumps over the lazy dog.
        </p>
        <p style={{ margin: '8px 0 0', color: fgValid ? fg : '#000000', fontSize: 'var(--kiln-text-sm)', fontFamily: 'var(--kiln-font-sans)' }}>
          Small text — same color pairing at a smaller size.
        </p>
      </div>
    </div>
  );
}
