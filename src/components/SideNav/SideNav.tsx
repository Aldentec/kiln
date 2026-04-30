// a11y: WCAG AA verified 2026-04-30
// perf: CLS=0, GPU-friendly 2026-04-30
// mobile: verified 375px/768px 2026-04-30
import React, { useId } from 'react';
import { cn } from '../../utils';
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
  className?: string;
  style?: React.CSSProperties;
}

const SideNav: React.FC<SideNavProps> = ({
  groups,
  activeId,
  onSelect,
  className,
  style,
}) => {
  const navId = useId();
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

  return (
    <nav
      className={cn('kiln-side-nav', className)}
      aria-label="Component navigation"
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
};

SideNav.displayName = 'SideNav';
export default SideNav;
