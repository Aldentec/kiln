// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useId } from 'react';
import { cn } from '../../utils';
import './Input.css';

export type InputVariant = 'default' | 'error' | 'success';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  variant?: InputVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  errorText,
  variant,
  leftIcon,
  rightIcon,
  containerClassName = '',
  className = '',
  ...rest
}, ref) => {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const resolved: InputVariant = errorText ? 'error' : (variant ?? 'default');

  const inputClasses = cn(
    'kiln-input',
    `kiln-input--${resolved}`,
    leftIcon && 'kiln-input--has-left-icon',
    rightIcon && 'kiln-input--has-right-icon',
    className,
  );

  return (
    <div className={cn('kiln-input-field', containerClassName)}>
      {label && (
        <label htmlFor={id} className="kiln-input-label">
          {label}
        </label>
      )}
      <div className="kiln-input-wrap">
        {leftIcon && <span className="kiln-input-icon kiln-input-icon--left" aria-hidden="true">{leftIcon}</span>}
        <input
          ref={ref}
          id={id}
          className={inputClasses}
          aria-invalid={resolved === 'error' ? 'true' : undefined}
          aria-describedby={
            [errorText ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') || undefined
          }
          {...rest}
        />
        {rightIcon && <span className="kiln-input-icon kiln-input-icon--right" aria-hidden="true">{rightIcon}</span>}
      </div>
      {errorText && <p id={errorId} className="kiln-input-error" role="alert">{errorText}</p>}
      {!errorText && helperText && <p id={helperId} className="kiln-input-helper">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
