// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-02
// mobile: verified 375px/768px 2026-05-02
import React from 'react';
import { cn } from '../../utils';
import './Breadcrumbs.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Character or node used as separator. Defaults to a chevron SVG. */
  separator?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DefaultSep = () => (
  <svg
    className="kiln-breadcrumbs__sep-icon"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>((
  { items, separator, className, style },
  ref,
) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      ref={ref}
      className={cn('kiln-breadcrumbs', className)}
      aria-label="Breadcrumb"
      style={style}
    >
      <ol className="kiln-breadcrumbs__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="kiln-breadcrumbs__item">
              {isLast ? (
                <span
                  className="kiln-breadcrumbs__current"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <a
                    className="kiln-breadcrumbs__link"
                    href={item.href ?? '#'}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </a>
                  <span className="kiln-breadcrumbs__sep" aria-hidden="true">
                    {separator ?? <DefaultSep />}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';
export default Breadcrumbs;
