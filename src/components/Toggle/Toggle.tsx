// a11y: WCAG AA verified 2026-05-03
// perf: CLS=0, GPU-friendly 2026-05-03
// mobile: verified 375px/768px 2026-05-03
import React, { useId, useState } from 'react';
import { cn } from '../../utils';
import './Toggle.css';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled initial state */
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Visible label text — also used as the accessible label */
  label?: string;
  /** Hide the label visually while keeping it accessible to screen readers */
  labelHidden?: boolean;
  size?: ToggleSize;
  className?: string;
  /** id for the underlying button; auto-generated when omitted */
  id?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      label,
      labelHidden = false,
      size = 'md',
      className,
      id: providedId,
    },
    ref,
  ) => {
    const autoId = useId();
    const id = providedId ?? `kiln-toggle-${autoId}`;
    const labelId = `${id}-label`;

    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = controlledChecked ?? internalChecked;

    const handleClick = () => {
      if (disabled) return;
      const next = !isChecked;
      if (controlledChecked === undefined) setInternalChecked(next);
      onChange?.(next);
    };

    return (
      <span
        className={cn(
          'kiln-toggle',
          `kiln-toggle--${size}`,
          disabled && 'kiln-toggle--disabled',
          className,
        )}
      >
        <button
          ref={ref}
          type="button"
          role="switch"
          id={id}
          aria-checked={isChecked}
          aria-disabled={disabled ? 'true' : undefined}
          aria-labelledby={label ? labelId : undefined}
          className={cn('kiln-toggle__btn', isChecked && 'kiln-toggle__btn--on')}
          onClick={handleClick}
        >
          <span className="kiln-toggle__track" aria-hidden="true">
            <span className="kiln-toggle__thumb" />
          </span>
        </button>

        {label && (
          <span
            id={labelId}
            className={cn(
              'kiln-toggle__label',
              labelHidden && 'kiln-toggle__label--hidden',
            )}
          >
            {label}
          </span>
        )}
      </span>
    );
  },
);

Toggle.displayName = 'Toggle';
export default Toggle;
