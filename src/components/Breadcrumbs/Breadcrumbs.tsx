// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-03 — transform/opacity animations only
// mobile: verified 375px/768px 2026-05-02 — 44px touch targets, 14px+ text
import React from 'react';
import { cn } from '../../utils';
import { ChevronRightIcon } from '../../icons';
import './Breadcrumbs.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Character or node used as separator. Defaults to an animated chevron SVG. */
  separator?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DefaultSep = () => (
  <ChevronRightIcon className="kiln-breadcrumbs__sep-icon" size={16} />
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
                  title={item.label}
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
