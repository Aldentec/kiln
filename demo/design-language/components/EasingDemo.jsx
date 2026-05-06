import React, { useState, useRef } from 'react';

const CURVES = [
  {
    key: 'ease-out',
    label: '--kiln-ease-out',
    value: 'cubic-bezier(0.16, 1, 0.3, 1)',
    description: 'Fast start, gentle deceleration. Use for elements entering the screen.',
  },
  {
    key: 'ease-in-out',
    label: '--kiln-ease-in-out',
    value: 'cubic-bezier(0.65, 0, 0.35, 1)',
    description: 'Smooth acceleration and deceleration. Use for state transitions.',
  },
  {
    key: 'spring',
    label: '--kiln-ease-spring',
    value: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    description: 'Slight overshoot at the end. Use for interactive feedback.',
  },
  {
    key: 'bounce',
    label: '--kiln-ease-bounce',
    value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    description: 'Pronounced overshoot. Use sparingly for delight moments.',
  },
];

const DURATION = 500;

function EasingRow({ curve, playing, onPlay }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--kiln-space-4)',
        padding: 'var(--kiln-space-4) 0',
        borderBottom: '1px solid var(--kiln-gray-100)',
      }}
    >
      <div style={{ minWidth: 180 }}>
        <div style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-800)' }}>
          {curve.label}
        </div>
        <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-400)', marginTop: 2 }}>
          {curve.description}
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 4,
            background: 'var(--kiln-gray-200)',
            borderRadius: 'var(--kiln-radius-full)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: 16,
            height: 16,
            borderRadius: 'var(--kiln-radius-full)',
            background: 'var(--kiln-primary-bg)',
            transform: playing ? 'translateX(calc(100% * var(--track-width, 1) - 8px))' : 'translateX(-8px)',
            transition: playing ? `transform ${DURATION}ms ${curve.value}` : 'none',
            marginLeft: playing ? '100%' : 0,
          }}
        />
        {/* Use a simpler approach: translate from 0 to track width */}
        <div style={{ position: 'absolute', left: 8, right: 8, height: 16, pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: -8,
              width: 16,
              height: 16,
              borderRadius: 'var(--kiln-radius-full)',
              background: 'var(--kiln-primary-bg)',
              transform: playing ? 'translateX(calc(100cqw))' : 'translateX(0)',
              transition: playing ? `transform ${DURATION}ms ${curve.value}` : 'none',
              containerType: 'inline-size',
            }}
          />
        </div>
      </div>
      <button
        onClick={onPlay}
        style={{
          padding: '6px 16px',
          background: playing ? 'var(--kiln-gray-200)' : 'var(--kiln-primary-bg)',
          color: playing ? 'var(--kiln-gray-600)' : 'var(--kiln-primary-fg)',
          border: 'none',
          borderRadius: 'var(--kiln-radius-md)',
          fontSize: 'var(--kiln-text-sm)',
          fontWeight: 600,
          cursor: playing ? 'default' : 'pointer',
          fontFamily: 'var(--kiln-font-sans)',
          minWidth: 56,
          transition: 'background 200ms',
        }}
        disabled={playing}
        aria-label={`Play ${curve.label} animation`}
      >
        {playing ? '…' : 'Play'}
      </button>
    </div>
  );
}

export function EasingDemo() {
  const [playing, setPlaying] = useState({});
  const trackRefs = useRef({});

  function play(key) {
    setPlaying((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setPlaying((prev) => ({ ...prev, [key]: false }));
    }, DURATION + 100);
  }

  function playAll() {
    CURVES.forEach((c) => play(c.key));
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
          onClick={playAll}
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
          Play all
        </button>
      </div>
      {CURVES.map((curve) => (
        <CurveRow
          key={curve.key}
          curve={curve}
          playing={!!playing[curve.key]}
          onPlay={() => play(curve.key)}
        />
      ))}
    </div>
  );
}

function CurveRow({ curve, playing, onPlay }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--kiln-space-4)',
        padding: 'var(--kiln-space-4) 0',
        borderBottom: '1px solid var(--kiln-gray-100)',
      }}
    >
      <div style={{ minWidth: 200, flexShrink: 0 }}>
        <div style={{ fontFamily: 'var(--kiln-font-mono)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-800)' }}>
          {curve.label}
        </div>
        <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-400)', marginTop: 2 }}>
          {curve.value}
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            inset: '50% 0',
            height: 4,
            marginTop: -2,
            background: 'var(--kiln-gray-200)',
            borderRadius: 'var(--kiln-radius-full)',
          }}
        />
        <DotTrack playing={playing} easing={curve.value} />
      </div>
      <button
        onClick={onPlay}
        disabled={playing}
        aria-label={`Play ${curve.label} animation`}
        style={{
          padding: '6px 16px',
          background: playing ? 'var(--kiln-gray-200)' : 'var(--kiln-primary-bg)',
          color: playing ? 'var(--kiln-gray-600)' : 'var(--kiln-primary-fg)',
          border: 'none',
          borderRadius: 'var(--kiln-radius-md)',
          fontSize: 'var(--kiln-text-sm)',
          fontWeight: 600,
          cursor: playing ? 'default' : 'pointer',
          fontFamily: 'var(--kiln-font-sans)',
          minWidth: 56,
        }}
      >
        {playing ? '…' : 'Play'}
      </button>
    </div>
  );
}

function DotTrack({ playing, easing }) {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  React.useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  });

  const dotOffset = playing ? trackWidth - 16 : 0;

  return (
    <div ref={trackRef} style={{ flex: 1, position: 'relative', height: 16 }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          borderRadius: 'var(--kiln-radius-full)',
          background: 'var(--kiln-primary-bg)',
          transform: `translateX(${dotOffset}px)`,
          transition: playing ? `transform ${DURATION}ms ${easing}` : 'none',
        }}
      />
    </div>
  );
}
