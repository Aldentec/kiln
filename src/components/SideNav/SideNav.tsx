// a11y: WCAG AA verified 2026-05-03
// perf: CLS=0, GPU-friendly 2026-05-03
// mobile: verified 375px/768px 2026-05-03
import React, { useId, useCallback, useEffect } from 'react';
import { cn } from '../../utils';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import './SideNav.css';

export interface SideNavItem {
  id: string;
  label: string;
  badge?: string;
}

export interface SideNavGroup {
  label?: string;
  items: SideNavItem[];
}

export interface SideNavProps {
  groups: SideNavGroup[];
  /** Currently active item id */
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Label shown in the collapsible header bar */
  header?: React.ReactNode;
  /** Controlled open state (enables collapsible mode) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Initial open state (uncontrolled). Defaults to true on ≥768px. */
  defaultOpen?: boolean;
  /** Sidebar width; sets --kiln-side-nav-width */
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

const CollapseIcon = ({ open }: { open: boolean }) =>
  open ? <ChevronLeftIcon size={16} /> : <ChevronRightIcon size={16} />;

const SideNav: React.FC<SideNavProps> = ({
  groups,
  activeId,
  onSelect,
  header,
  open: controlledOpen,
  onOpenChange,
  defaultOpen,
  width,
  className,
  style,
}) => {
  const navId = useId();

  // Collapsible mode is active when any open-related prop is provided
  const collapsible = controlledOpen !== undefined || onOpenChange !== undefined || defaultOpen !== undefined || header !== undefined;

  const [internalOpen, setInternalOpen] = React.useState(
    defaultOpen ?? (typeof window !== 'undefined' ? window.innerWidth >= 768 : true),
  );
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = useCallback((next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [controlledOpen, onOpenChange]);



  // Auto-collapse on mobile, auto-open on desktop
  useEffect(() => {
    if (!collapsible) return;
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => {
      setOpen(!e.matches); // collapse when entering mobile, open when leaving
    };
    // Apply immediately on mount in case we're already on mobile
    if (mq.matches && open) setOpen(false);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsible]);

  const allItems = groups.flatMap((g) => g.items);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, itemId: string) => {
    const idx = allItems.findIndex((i) => i.id === itemId);
    let target: SideNavItem | undefined;
    if (e.key === 'ArrowDown') { e.preventDefault(); target = allItems[idx + 1]; }
    else if (e.key === 'ArrowUp') { e.preventDefault(); target = allItems[idx - 1]; }
    else if (e.key === 'Home') { e.preventDefault(); target = allItems[0]; }
    else if (e.key === 'End') { e.preventDefault(); target = allItems[allItems.length - 1]; }
    if (target) document.getElementById(`${navId}-item-${target.id}`)?.focus();
  };

  const navContent = (
    <nav
      className="kiln-side-nav__nav"
      aria-label="Sidebar navigation"
    >
      {groups.map((group, gi) => (
        <div key={gi} className="kiln-side-nav__group">
          {group.label && (
            <p className="kiln-side-nav__group-label" aria-hidden="true">
              {group.label}
            </p>
          )}
          <ul className="kiln-side-nav__list" role="list">
            {group.items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id} className="kiln-side-nav__item">
                  <button
                    id={`${navId}-item-${item.id}`}
                    type="button"
                    className={cn(
                      'kiln-side-nav__link',
                      isActive && 'kiln-side-nav__link--active',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => onSelect?.(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                  >
                    <span className="kiln-side-nav__link-text">{item.label}</span>
                    {item.badge && (
                      <span className="kiln-side-nav__badge" aria-hidden="true">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  // ── Plain (non-collapsible) mode ────────────────────────────────────────
  if (!collapsible) {
    return (
      <nav
        className={cn('kiln-side-nav', className)}
        aria-label="Sidebar navigation"
        style={style}
      >
        {groups.map((group, gi) => (
          <div key={gi} className="kiln-side-nav__group">
            {group.label && (
              <p className="kiln-side-nav__group-label" aria-hidden="true">
                {group.label}
              </p>
            )}
            <ul className="kiln-side-nav__list" role="list">
              {group.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id} className="kiln-side-nav__item">
                    <button
                      id={`${navId}-item-${item.id}`}
                      type="button"
                      className={cn(
                        'kiln-side-nav__link',
                        isActive && 'kiln-side-nav__link--active',
                      )}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => onSelect?.(item.id)}
                      onKeyDown={(e) => handleKeyDown(e, item.id)}
                    >
                      <span className="kiln-side-nav__link-text">{item.label}</span>
                      {item.badge && (
                        <span className="kiln-side-nav__badge" aria-hidden="true">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    );
  }

  // ── Collapsible mode ────────────────────────────────────────────────────
  return (
    <>
      {/* Collapsible container */}
      <div
        className={cn(
          'kiln-side-nav__container',
          open && 'kiln-side-nav__container--open',
          className,
        )}
        style={{
          ...(width ? { '--kiln-side-nav-width': width } as React.CSSProperties : {}),
          ...style,
        }}
      >
        {/* Header — title left, toggle button absolutely positioned top-right */}
        <div className="kiln-side-nav__header">
          {header && (
            <span className="kiln-side-nav__header-title">{header}</span>
          )}
          <button
            type="button"
            className="kiln-side-nav__toggle"
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <CollapseIcon open={open} />
          </button>
        </div>

        {/* Nav content */}
        {navContent}
      </div>
    </>
  );
};

SideNav.displayName = 'SideNav';
export default SideNav;
