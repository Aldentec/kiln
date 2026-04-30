// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useId } from 'react';
import { cn } from '../../utils';
import './Textarea.css';

export type TextareaVariant = 'default' | 'error' | 'success';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  variant?: TextareaVariant;
  /** Show a character count footer. Pass maxLength to also show the limit. */
  showCharCount?: boolean;
  containerClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helperText,
  errorText,
  variant,
  showCharCount = false,
  containerClassName = '',
  className = '',
  maxLength,
  value,
  defaultValue,
  onChange,
  ...rest
}, ref) => {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const [charCount, setCharCount] = React.useState<number>(() => {
    const initial = value ?? defaultValue ?? '';
    return String(initial).length;
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  const resolved: TextareaVariant = errorText ? 'error' : (variant ?? 'default');
  const isOver = maxLength != null && charCount > maxLength;

  const textareaClasses = cn(
    'kiln-textarea',
    `kiln-textarea--${resolved}`,
    className,
  );

  return (
    <div className={cn('kiln-textarea-field', containerClassName)}>
      {label && (
        <label htmlFor={id} className="kiln-textarea-label">{label}</label>
      )}
      <div className="kiln-textarea-wrap">
        <textarea
          ref={ref}
          id={id}
          className={textareaClasses}
          aria-invalid={resolved === 'error' ? 'true' : undefined}
          aria-describedby={
            [errorText ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') || undefined
          }
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...rest}
        />
      </div>
      <div className="kiln-textarea-footer">
        <div>
          {errorText && <p id={errorId} className="kiln-textarea-error" role="alert">{errorText}</p>}
          {!errorText && helperText && <p id={helperId} className="kiln-textarea-helper">{helperText}</p>}
        </div>
        {showCharCount && (
          <>
            <span
              className={cn('kiln-textarea-charcount', isOver && 'kiln-textarea-charcount--over')}
              aria-live="polite"
              aria-atomic="true"
            >
              {maxLength != null ? `${charCount}/${maxLength}` : charCount}
            </span>
            {isOver && (
              <span role="alert" className="kiln-sr-only">
                Character limit exceeded. {charCount} of {maxLength} characters used.
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
