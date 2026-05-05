// a11y: WCAG AA verified 2026-05-04
// perf: CLS=0, GPU-friendly 2026-05-04
// mobile: verified 375px/768px 2026-05-04
import React, { useId } from 'react';
import { cn } from '../../utils';
import './RadioButton.css';

export interface RadioButtonProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Prevents interaction and dims the control */
  disabled?: boolean;
  /** Visually checked but not interactable */
  readOnly?: boolean;
  /** Radio group name */
  name?: string;
  /** Input value submitted with forms */
  value?: string;
  /** Secondary helper text rendered below the label */
  description?: string;
  /** Fired when the radio is selected */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  /** Explicit id; auto-generated when omitted */
  id?: string;
  children: React.ReactNode;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(({
  checked,
  defaultChecked,
  disabled = false,
  readOnly = false,
  name,
  value,
  description,
  onChange,
  className,
  style,
  id: providedId,
  children,
}, ref) => {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const descriptionId = description ? `${id}-desc` : undefined;

  return (
    <label
      className={cn(
        'kiln-radio',
        disabled && 'kiln-radio--disabled',
        readOnly && 'kiln-radio--readonly',
        className,
      )}
      style={style}
      htmlFor={id}
    >
      <span className="kiln-radio__track">
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={disabled || readOnly ? undefined : onChange}
          onClick={readOnly ? (e) => e.preventDefault() : undefined}
          aria-describedby={descriptionId}
          className="kiln-radio__input"
        />
        <span className="kiln-radio__indicator" aria-hidden="true">
          <span className="kiln-radio__dot" />
        </span>
      </span>
      <span className="kiln-radio__content">
        <span className="kiln-radio__label">{children}</span>
        {description && (
          <span id={descriptionId} className="kiln-radio__description">
            {description}
          </span>
        )}
      </span>
    </label>
  );
});

RadioButton.displayName = 'RadioButton';
export default RadioButton;
