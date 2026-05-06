import React from 'react';
import type { IconProps } from './types';

export function createIcon(
  displayName: string,
  children: React.ReactNode,
): React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 20, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden={ariaLabel ? undefined : (ariaHidden ?? true)}
        aria-label={ariaLabel}
        focusable="false"
        {...props}
      >
        {children}
      </svg>
    ),
  );
  Icon.displayName = displayName;
  return Icon;
}
