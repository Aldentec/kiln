// a11y: WCAG AA verified 2026-05-04 — renders semantic HTML elements; color contrast met via design tokens in both themes
// perf: CLS=0, GPU-friendly static typography 2026-05-04
// mobile: all variant text ≥ 14px; pre uses overflow-x: auto; no horizontal overflow at 375px; verified 375px/768px 2026-05-04
import React from 'react';
import { cn } from '../../utils';
import './Box.css';

export type BoxVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  | 'p' | 'strong' | 'small'
  | 'code' | 'pre' | 'samp';

export type BoxFontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type BoxTextAlign = 'left' | 'center' | 'right' | 'justify';
export type BoxFontWeight = 300 | 400 | 500 | 600 | 700;
export type BoxDisplay =
  | 'block' | 'inline' | 'inline-block'
  | 'flex' | 'inline-flex'
  | 'grid' | 'inline-grid'
  | 'none';
export type BoxFloat = 'left' | 'right' | 'none' | 'inline-start' | 'inline-end';

const FONT_SIZE_MAP: Record<BoxFontSize, string> = {
  xs:   'var(--kiln-text-xs)',
  sm:   'var(--kiln-text-sm)',
  base: 'var(--kiln-text-base)',
  lg:   'var(--kiln-text-lg)',
  xl:   'var(--kiln-text-xl)',
  '2xl': 'var(--kiln-text-2xl)',
  '3xl': 'var(--kiln-text-3xl)',
  '4xl': 'var(--kiln-text-4xl)',
};

export interface BoxProps {
  /**
   * The HTML element to render and the default typography style to apply.
   * Maps directly to the semantic HTML tag.
   * @default 'p'
   */
  variant?: BoxVariant;
  /**
   * Override the font size. Pass a named token ('xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl')
   * or any valid CSS value (e.g. '1.75rem').
   */
  fontSize?: BoxFontSize | (string & {});
  /** Override text alignment. */
  textAlign?: BoxTextAlign;
  /** Override text color. Accepts any CSS color value or a CSS custom property reference. */
  color?: string;
  /** Override font weight. Space Grotesk supports 300, 400, 500, 600, 700. */
  fontWeight?: BoxFontWeight | (number & {});
  /**
   * Override the CSS `display` property.
   * Useful to change inline elements (strong, small, code) to block, for example.
   */
  display?: BoxDisplay | (string & {});
  /** CSS `margin` shorthand (e.g. '0 0 1rem'). Overrides the variant default. */
  margin?: string;
  /** CSS `padding` shorthand (e.g. '1rem 1.5rem'). */
  padding?: string;
  /** CSS `float` value. */
  float?: BoxFloat;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Box = React.forwardRef<HTMLElement, BoxProps>(({
  variant = 'p',
  fontSize,
  textAlign,
  color,
  fontWeight,
  display,
  margin,
  padding,
  float: floatProp,
  className,
  style,
  children,
}, ref) => {
  const Tag = variant as React.ElementType;

  const resolvedFontSize = fontSize !== undefined
    ? (fontSize in FONT_SIZE_MAP ? FONT_SIZE_MAP[fontSize as BoxFontSize] : (fontSize as string))
    : undefined;

  const hasOverrides =
    resolvedFontSize !== undefined ||
    textAlign !== undefined ||
    color !== undefined ||
    fontWeight !== undefined ||
    display !== undefined ||
    margin !== undefined ||
    padding !== undefined ||
    floatProp !== undefined;

  const inlineStyle: React.CSSProperties | undefined =
    hasOverrides || style !== undefined
      ? {
          ...(resolvedFontSize !== undefined && { fontSize: resolvedFontSize }),
          ...(textAlign    !== undefined && { textAlign }),
          ...(color        !== undefined && { color }),
          ...(fontWeight   !== undefined && { fontWeight }),
          ...(display      !== undefined && { display: display as React.CSSProperties['display'] }),
          ...(margin       !== undefined && { margin }),
          ...(padding      !== undefined && { padding }),
          ...(floatProp    !== undefined && { float: floatProp as React.CSSProperties['float'] }),
          ...style,
        }
      : undefined;

  return (
    <Tag
      ref={ref}
      className={cn('kiln-box', `kiln-box--${variant}`, className)}
      style={inlineStyle}
    >
      {children}
    </Tag>
  );
});

Box.displayName = 'Box';
export default Box;
