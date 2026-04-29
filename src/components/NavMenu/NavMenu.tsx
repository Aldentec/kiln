import React from 'react';
import './NavMenu.css';

export interface NavItem {
  href: string;
  label: string;
}

export interface NavMenuProps {
  items: NavItem[];
  /** Called when a link is clicked. Use to integrate with your router (e.g. navigate(href)). */
  onNavigate?: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Return true to mark a link as active. Defaults to matching window.location.pathname. */
  isActive?: (href: string) => boolean;
  ariaLabel?: string;
  className?: string;
}

const NavMenu: React.FC<NavMenuProps> = ({
  items,
  onNavigate,
  isActive,
  ariaLabel = 'Main navigation',
  className,
}) => {
  const checkActive = isActive ?? ((href) => typeof window !== 'undefined' && window.location.pathname === href);

  return (
    <nav className={`kiln-nav-menu${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
      {items.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={`kiln-nav-menu__link${checkActive(href) ? ' kiln-nav-menu__link--active' : ''}`}
          aria-current={checkActive(href) ? 'page' : undefined}
          onClick={(e) => {
            if (onNavigate) { e.preventDefault(); onNavigate(href, e); }
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default NavMenu;
