import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names, filtering falsy values.
 * Accepts strings, arrays, and conditional objects: cn('base', active && 'active', { hidden: !show })
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
