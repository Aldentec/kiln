import React, { useId } from 'react';
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

  const textareaClasses = [
    'kiln-textarea',
    `kiln-textarea--${resolved}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={`kiln-textarea-field${containerClassName ? ` ${containerClassName}` : ''}`}>
      {label && (
        <label htmlFor={id} className="kiln-textarea-label">{label}</label>
      )}
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
      <div className="kiln-textarea-footer">
        <div>
          {errorText && <p id={errorId} className="kiln-textarea-error" role="alert">{errorText}</p>}
          {!errorText && helperText && <p id={helperId} className="kiln-textarea-helper">{helperText}</p>}
        </div>
        {showCharCount && (
          <span className={`kiln-textarea-charcount${isOver ? ' kiln-textarea-charcount--over' : ''}`}>
            {maxLength != null ? `${charCount}/${maxLength}` : charCount}
          </span>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
