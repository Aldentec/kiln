import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import './Nav.css';

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export interface NavProps {
  /** Left-side brand / logo slot */
  logo?: React.ReactNode;
  items?: NavItem[];
  /** Right-side slot — theme toggle, avatar, CTA buttons, etc. */
  actions?: React.ReactNode;
  /** Sticks to the top of the viewport (default: true) */
  sticky?: boolean;
  /** Return true to mark a link active. Defaults to matching window.location.pathname. */
  isActive?: (href: string) => boolean;
  /** Called on link click — use to integrate with a client-side router. */
  onNavigate?: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
  className?: string;
}

const Nav: React.FC<NavProps> = ({
  logo,
  items = [],
  actions,
  sticky = true,
  isActive,
  onNavigate,
  ariaLabel = 'Main navigation',
  className,
}) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const checkActive = isActive ??
    ((href) => typeof window !== 'undefined' && window.location.pathname === href);

  const close = useCallback(() => setOpen(false), []);

  // Escape + scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add('kiln-nav-body-locked');
    document.body.style.paddingRight = `${sw}px`;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('kiln-nav-body-locked');
      document.body.style.paddingRight = '';
    };
  }, [open, close]);

  // Restore focus on close
  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  // Focus trap inside mobile panel
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const el = panelRef.current;
    el.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [open]);

  const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    close();
    if (onNavigate) { e.preventDefault(); onNavigate(href, e); }
  };

  const mobilePortal = (
    <>
      <div
        className={cn('kiln-nav__overlay', open && 'kiln-nav__overlay--visible')}
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={cn('kiln-nav__panel', open && 'kiln-nav__panel--open')}
        role={open ? 'dialog' : undefined}
        aria-modal={open ? 'true' : undefined}
        aria-label={open ? ariaLabel : undefined}
        aria-hidden={open ? undefined : 'true'}
      >
        <div className="kiln-nav__panel-header">
          {logo && <div className="kiln-nav__panel-brand">{logo}</div>}
          <button
            className="kiln-nav__panel-close"
            onClick={close}
            aria-label="Close navigation menu"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="kiln-nav__panel-body" aria-label={ariaLabel}>
          <ul className="kiln-nav__panel-list">
            {items.map(({ href, label, icon }, i) => (
              <li
                key={href}
                className="kiln-nav__panel-item"
                style={{ '--kiln-nav-stagger': `${i * 40}ms` } as React.CSSProperties}
              >
                <a
                  href={href}
                  className={cn('kiln-nav__panel-link', checkActive(href) && 'kiln-nav__panel-link--active')}
                  aria-current={checkActive(href) ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(href, e)}
                >
                  {icon && <span className="kiln-nav__panel-link-icon" aria-hidden="true">{icon}</span>}
                  <span className="kiln-nav__panel-link-label">{label}</span>
                  {checkActive(href) && <span className="kiln-nav__panel-link-dot" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <span className="kiln-nav__sr-only" aria-live="polite" aria-atomic="true">
        {open ? 'Navigation menu open' : ''}
      </span>
    </>
  );

  return (
    <>
      <header className={cn('kiln-nav', sticky && 'kiln-nav--sticky', className)}>
        <div className="kiln-nav__inner">
          {/* Brand */}
          {logo && <div className="kiln-nav__brand">{logo}</div>}

          {/* Desktop links */}
          {items.length > 0 && (
            <nav className="kiln-nav__links" aria-label={ariaLabel}>
              {items.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={cn('kiln-nav__link', checkActive(href) && 'kiln-nav__link--active')}
                  aria-current={checkActive(href) ? 'page' : undefined}
                  onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(href, e); } }}
                >
                  {label}
                </a>
              ))}
            </nav>
          )}

          {/* Right actions + mobile trigger */}
          <div className="kiln-nav__actions">
            {actions}
            {items.length > 0 && (
              <button
                ref={triggerRef}
                type="button"
                className={cn('kiln-nav__trigger', open && 'kiln-nav__trigger--open')}
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <span className="kiln-nav__trigger-bar" />
                <span className="kiln-nav__trigger-bar" />
                <span className="kiln-nav__trigger-bar" />
              </button>
            )}
          </div>
        </div>
      </header>

      {typeof document !== 'undefined' && createPortal(mobilePortal, document.body)}
    </>
  );
};

export default Nav;
