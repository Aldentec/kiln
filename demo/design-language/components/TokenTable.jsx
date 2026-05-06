import React from 'react';

function Preview({ type, value }) {
  if (!type) return null;

  if (type === 'color') {
    return (
      <div
        style={{
          width: 32,
          height: 32,
          background: value,
          borderRadius: 'var(--kiln-radius-sm)',
          boxShadow: 'var(--kiln-shadow-sm)',
          border: '1px solid var(--kiln-gray-200)',
        }}
      />
    );
  }
  if (type === 'shadow') {
    return (
      <div
        style={{
          width: 32,
          height: 32,
          background: 'var(--kiln-surface-raised)',
          boxShadow: value,
          borderRadius: 'var(--kiln-radius-sm)',
        }}
      />
    );
  }
  if (type === 'radius') {
    return (
      <div
        style={{
          width: 32,
          height: 32,
          background: 'var(--kiln-gray-200)',
          borderRadius: value,
        }}
      />
    );
  }
  if (type === 'spacing') {
    return (
      <div
        style={{
          background: 'var(--kiln-primary-200)',
          height: 16,
          width: value,
          minWidth: 4,
          borderRadius: 2,
        }}
      />
    );
  }
  if (type === 'text') {
    return (
      <span style={{ fontSize: value, color: 'var(--kiln-gray-700)', fontFamily: 'var(--kiln-font-sans)' }}>
        Kiln
      </span>
    );
  }
  return null;
}

export function TokenTable({ tokens }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 'var(--kiln-space-8)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--kiln-text-sm)' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 'var(--kiln-space-3) var(--kiln-space-4)', background: 'var(--kiln-gray-100)', color: 'var(--kiln-gray-700)', fontWeight: 600, borderBottom: '2px solid var(--kiln-gray-200)' }}>Token</th>
            <th style={{ textAlign: 'left', padding: 'var(--kiln-space-3) var(--kiln-space-4)', background: 'var(--kiln-gray-100)', color: 'var(--kiln-gray-700)', fontWeight: 600, borderBottom: '2px solid var(--kiln-gray-200)' }}>Value</th>
            <th style={{ textAlign: 'left', padding: 'var(--kiln-space-3) var(--kiln-space-4)', background: 'var(--kiln-gray-100)', color: 'var(--kiln-gray-700)', fontWeight: 600, borderBottom: '2px solid var(--kiln-gray-200)', width: 60 }}>Preview</th>
            <th style={{ textAlign: 'left', padding: 'var(--kiln-space-3) var(--kiln-space-4)', background: 'var(--kiln-gray-100)', color: 'var(--kiln-gray-700)', fontWeight: 600, borderBottom: '2px solid var(--kiln-gray-200)' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name}>
              <td style={{ padding: 'var(--kiln-space-3) var(--kiln-space-4)', borderBottom: '1px solid var(--kiln-gray-100)', color: 'var(--kiln-gray-600)', whiteSpace: 'nowrap' }}>
                <code style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', background: 'var(--kiln-primary-50)', color: 'var(--kiln-primary)', padding: '2px 6px', borderRadius: 'var(--kiln-radius-sm)' }}>
                  {token.name}
                </code>
              </td>
              <td style={{ padding: 'var(--kiln-space-3) var(--kiln-space-4)', borderBottom: '1px solid var(--kiln-gray-100)', color: 'var(--kiln-gray-500)', fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-xs)', whiteSpace: 'nowrap' }}>
                {token.value}
              </td>
              <td style={{ padding: 'var(--kiln-space-3) var(--kiln-space-4)', borderBottom: '1px solid var(--kiln-gray-100)' }}>
                <Preview type={token.preview} value={token.value} />
              </td>
              <td style={{ padding: 'var(--kiln-space-3) var(--kiln-space-4)', borderBottom: '1px solid var(--kiln-gray-100)', color: 'var(--kiln-gray-600)' }}>
                {token.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
