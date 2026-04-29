import type React from 'react';

/**
 * Polymorphic `as` prop helper.
 *
 * Gives a component a fully-typed `as` prop that changes both the rendered element
 * AND the available HTML attribute props.
 *
 * @example
 * ```tsx
 * type CardProps<C extends React.ElementType = 'div'> =
 *   PolymorphicProps<C, { variant?: CardVariant }>;
 *
 * function Card<C extends React.ElementType = 'div'>({ as, ...props }: CardProps<C>) {
 *   const Tag = as ?? 'div';
 *   return <Tag {...props} />;
 * }
 *
 * // Usage:
 * <Card as="article" cite="...">...</Card>  // `cite` is valid on <article> → no TS error
 * ```
 */
export type PolymorphicProps<
  C extends React.ElementType = React.ElementType,
  OwnProps = object,
> = OwnProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof OwnProps | 'as'> & {
    as?: C;
  };

/**
 * Same as PolymorphicProps but includes a `ref` typed to the rendered element.
 */
export type PolymorphicPropsWithRef<
  C extends React.ElementType = React.ElementType,
  OwnProps = object,
> = PolymorphicProps<C, OwnProps> & {
  ref?: React.ComponentPropsWithRef<C>['ref'];
};
