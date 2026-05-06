// a11y: WCAG AA — role="status" + aria-live="polite" announces copy result to screen readers;
//               keyboard events bubble naturally from child buttons; no focus trap imposed.
// perf: CLS=0  — tooltip is position:absolute (out of flow); animations use only opacity +
//               transform (GPU-composited, no layout recalc); timers cleaned up on unmount.

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CheckIcon, XCircleIcon } from '../../icons';
import './CopyToClipboard.css';

// ─── Four pillars ─────────────────────────────────────────────────────────────
//
//  1. ACCESSIBILITY  – Screen-reader live region always mounted; visual tooltip
//                      marked aria-hidden so it is not double-announced.
//  2. PERFORMANCE    – Absolutely-positioned tooltip never causes reflow; timer
//                      refs cleaned on unmount to prevent memory leaks.
//  3. COMPOSABILITY  – Thin wrapper; children own their semantics, role, and
//                      keyboard handling; copy is triggered via event bubbling.
//  4. CONSISTENCY    – All colours/radii/spacing use kiln design tokens;
//                      animation curve matches the rest of the system.
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

export type CopyStatus    = 'success' | 'error';
export type CopyPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface CopyToClipboardProps {
  /** The string written to the clipboard when the child is clicked. */
  value: string;
  /**
   * The element(s) whose click event triggers the copy. The child element
   * retains full ownership of its role, aria-label, and keyboard handling.
   * When wrapping a button, no extra markup or tabIndex is required.
   */
  children: React.ReactNode;
  /** Milliseconds to display the confirmation tooltip. Default: 2000. */
  duration?: number;
  /** Tooltip message on success. Default: 'Copied!'. */
  successMessage?: string;
  /** Tooltip message on failure. Default: 'Failed to copy'. */
  errorMessage?: string;
  /**
   * Which side of the trigger the tooltip appears on. Default: 'top'.
   * Choose based on available viewport space near the trigger.
   */
  placement?: CopyPlacement;
  /** Called with the copied value after a successful clipboard write. */
  onCopy?: (value: string) => void;
  /** Called with the caught error when the clipboard write fails. */
  onError?: (err: unknown) => void;
  /** Additional class names for the wrapper element. */
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Must match `--kiln-copy-exit-ms` consumed by the CSS animation. */
const EXIT_MS = 150;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * `CopyToClipboard` is a zero-intrusion wrapper that copies `value` to the
 * clipboard when any child element is clicked, then shows a small contextual
 * tooltip confirming the action.
 *
 * @example Basic usage wrapping an icon button
 * ```tsx
 * <CopyToClipboard value="<SearchIcon />" placement="top">
 *   <button aria-label="Copy SearchIcon import">
 *     <SearchIcon />
 *   </button>
 * </CopyToClipboard>
 * ```
 *
 * @example Wrapping plain text with a right-side tooltip
 * ```tsx
 * <CopyToClipboard value={apiKey} placement="right" successMessage="Key copied!">
 *   <code>{apiKey}</code>
 * </CopyToClipboard>
 * ```
 */
export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  value,
  children,
  duration     = 2000,
  successMessage = 'Copied!',
  errorMessage   = 'Failed to copy',
  placement    = 'top',
  onCopy,
  onError,
  className,
}) => {
  // 'idle'    → tooltip unmounted
  // 'visible' → tooltip entering / steady state
  // 'leaving' → tooltip playing exit animation before unmount
  type Phase = 'idle' | 'visible' | 'leaving';

  const [phase,      setPhase]      = useState<Phase>('idle');
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('success');

  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (enterTimer.current) { clearTimeout(enterTimer.current); enterTimer.current = null; }
    if (exitTimer.current)  { clearTimeout(exitTimer.current);  exitTimer.current  = null; }
  }, []);

  // Clean up on unmount to prevent setState on an unmounted component.
  useEffect(() => () => clearTimers(), [clearTimers]);

  // Show the tooltip for `duration` ms, then trigger the exit animation.
  const show = useCallback((status: CopyStatus) => {
    clearTimers();
    setCopyStatus(status);
    setPhase('visible');

    // Begin exit animation slightly before unmounting so it plays in full.
    const visibleMs = Math.max(duration - EXIT_MS, EXIT_MS);

    enterTimer.current = setTimeout(() => {
      setPhase('leaving');
      exitTimer.current = setTimeout(() => setPhase('idle'), EXIT_MS);
    }, visibleMs);
  }, [clearTimers, duration]);

  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      show('success');
      onCopy?.(value);
    } catch (err) {
      show('error');
      onError?.(err);
    }
  }, [value, show, onCopy, onError]);

  const message = copyStatus === 'success' ? successMessage : errorMessage;

  return (
    <span
      className={['kiln-copy', className].filter(Boolean).join(' ')}
      data-placement={placement}
      onClick={handleClick}
    >
      {children}

      {/*
       * ── Pillar 1 · Accessibility ──────────────────────────────────────────
       * An always-mounted aria-live region announces the result to screen
       * readers without the ARIA announcement racing against DOM mount timing.
       * The visual tooltip (below) carries aria-hidden="true" to prevent
       * double-announcement.
       */}
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="kiln-copy__sr"
      >
        {phase !== 'idle' ? message : ''}
      </span>

      {/*
       * ── Pillar 2 · Performance ────────────────────────────────────────────
       * Conditionally mounted so there is zero DOM cost at rest. The
       * animation runs on `opacity` and `transform` exclusively — no
       * width/height/top/left changes — keeping the browser in the
       * compositor thread and avoiding layout recalculation.
       */}
      {phase !== 'idle' && (
        <span
          aria-hidden="true"
          className="kiln-copy__tip"
          data-status={copyStatus}
          data-phase={phase}
        >
          {copyStatus === 'success'
            ? <CheckIcon    size={11} aria-hidden="true" />
            : <XCircleIcon  size={11} aria-hidden="true" />}
          {message}
        </span>
      )}
    </span>
  );
};
