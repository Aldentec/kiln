import React from 'react';

export function ColorPaletteViewer({ label, swatches }) {
  return (
    <div style={{ marginBottom: 'var(--kiln-space-8)' }}>
      <p style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-700)', marginBottom: 'var(--kiln-space-2)', fontFamily: 'var(--kiln-font-sans)' }}>
        {label}
      </p>
      <div style={{ display: 'flex', borderRadius: 'var(--kiln-radius-md)', overflow: 'hidden' }}>
        {swatches.map((swatch, i) => {
          const isFirst = i === 0;
          const isLast = i === swatches.length - 1;
          return (
            <div
              key={swatch.token}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  height: 64,
                  background: swatch.hex,
                  borderRadius: isFirst
                    ? 'var(--kiln-radius-md) 0 0 var(--kiln-radius-md)'
                    : isLast
                    ? '0 var(--kiln-radius-md) var(--kiln-radius-md) 0'
                    : 0,
                }}
              />
              <div style={{ padding: '4px 2px' }}>
                <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {swatch.label}
                </div>
                <div style={{ fontSize: 'var(--kiln-text-xs)', fontFamily: 'var(--kiln-font-mono)', color: 'var(--kiln-gray-400)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {swatch.hex}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
