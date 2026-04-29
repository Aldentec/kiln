import React from 'react';
import { cn, Slot } from '../../utils';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Renders as an <a> when provided */
  href?: string;
  /** Merges props onto child element instead of rendering a <button> */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  href,
  disabled,
  asChild = false,
  className = '',
  children,
  ...rest
}, ref) => {
  const classes = cn(
    'kiln-button',
    `kiln-button--${variant}`,
    `kiln-button--${size}`,
    loading && 'kiln-button--loading',
    className,
  );

  const content = (
    <>
      {loading && <span className="kiln-button__spinner" aria-hidden="true" />}
      {!loading && leftIcon && <span className="kiln-button__icon kiln-button__icon--left" aria-hidden="true">{leftIcon}</span>}
      {children && <span className="kiln-button__label">{children}</span>}
      {!loading && rightIcon && <span className="kiln-button__icon kiln-button__icon--right" aria-hidden="true">{rightIcon}</span>}
    </>
  );

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...rest}>
        {children}
      </Slot>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={disabled || loading ? 'true' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading ? 'true' : undefined}
      {...rest}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
