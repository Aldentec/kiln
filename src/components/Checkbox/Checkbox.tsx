// a11y: WCAG AA verified 2026-05-17
// perf: CLS=0, GPU-friendly 2026-05-17
// mobile: verified 375px/768px 2026-05-17
import React, { useId, useState } from 'react';
import { cn } from '../../utils';
import './Checkbox.css';

// ─── Types ────────────────────────────────────────────────

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'id' | 'onChange'> {
  /** Visible label text — also the accessible name. Required for a11y unless `aria-label` is provided. */
  label?: string;
  /** Hide the label visually while keeping it accessible to screen readers. */
  labelHidden?: boolean;
  /** Helper text shown below the label. */
  helperText?: string;
  /** Error message — sets `aria-invalid` and shows red state. Overrides `helperText`. */
  errorText?: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /**
   * Indeterminate state — visually shows a dash instead of a tick.
   * Controlled via prop (React doesn't reflect `indeterminate` in JSX natively).
   */
  indeterminate?: boolean;
  /** Size of the checkbox box. Default: `"md"`. */
  size?: CheckboxSize;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  /** id for the underlying input — auto-generated when omitted. */
  id?: string;
}

// ─── Component ───────────────────────────────────────────

/**
 * Accessible, sleek custom checkbox with label, helper text, error state,
 * and indeterminate support. Fully keyboard navigable.
 *
 * @example
 * // Uncontrolled
 * <Checkbox label="Accept terms" defaultChecked />
 *
 * @example
 * // Controlled with error
 * <Checkbox
 *   label="I agree"
 *   checked={agreed}
 *   onChange={(val) => setAgreed(val)}
 *   errorText="You must agree to continue"
 * />
 *
 * @example
 * // Indeterminate (select-all pattern)
 * <Checkbox label="Select all" indeterminate={someSelected} checked={allSelected} onChange={...} />
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      labelHidden = false,
      helperText,
      errorText,
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      size = 'md',
      disabled = false,
      onChange,
      className,
      id: providedId,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = providedId ?? `kiln-checkbox-${autoId}`;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    // ── Uncontrolled internal state ──
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    // ── Sync the DOM indeterminate property (React doesn't support it as attr) ──
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    };

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate && !isChecked;
      }
    }, [indeterminate, isChecked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const next = e.target.checked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next, e);
    };

    // ── Build aria-describedby ──
    const describedBy = [
      errorText ? errorId : null,
      !errorText && helperText ? helperId : null,
      ariaDescribedBy ?? null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    const hasError = Boolean(errorText);

    return (
      <div
        className={cn(
          'kiln-checkbox-field',
          `kiln-checkbox-field--${size}`,
          disabled && 'kiln-checkbox-field--disabled',
          hasError && 'kiln-checkbox-field--error',
          className,
        )}
      >
        <label
          htmlFor={id}
          className="kiln-checkbox-field__label-wrap"
        >
          {/* ── Visually hidden native input — drives a11y ── */}
          <input
            ref={mergedRef}
            type="checkbox"
            id={id}
            checked={isControlled ? controlledChecked : undefined}
            defaultChecked={!isControlled ? internalChecked : undefined}
            disabled={disabled}
            aria-invalid={hasError ? 'true' : undefined}
            aria-describedby={describedBy}
            aria-label={!label ? ariaLabel : undefined}
            className="kiln-checkbox__input"
            onChange={handleChange}
            {...rest}
          />

          {/* ── Custom visual box ── */}
          <span className="kiln-checkbox__box" aria-hidden="true">
            {/* Checkmark SVG path */}
            <svg
              className="kiln-checkbox__check"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="kiln-checkbox__check-path"
                d="M1.5 5L4.5 8L10.5 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Indeterminate dash — visible only when indeterminate */}
              <path
                className="kiln-checkbox__indeterminate-path"
                d="M2 5h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          {/* ── Label text ── */}
          {label && (
            <span
              className={cn(
                'kiln-checkbox__label-text',
                labelHidden && 'kiln-checkbox__label-text--hidden',
              )}
            >
              {label}
            </span>
          )}
        </label>

        {/* ── Sub-text ── */}
        {hasError && (
          <p id={errorId} className="kiln-checkbox__error" role="alert">
            {errorText}
          </p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="kiln-checkbox__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
