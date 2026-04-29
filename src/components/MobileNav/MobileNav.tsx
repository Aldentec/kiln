import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import './MobileNav.css';

export interface MobileNavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export interface MobileNavProps {
  items: MobileNavItem[];
  /** Slot rendered in the panel header next to the close button. */
  logo?: React.ReactNode;
  /** Slot rendered at the bottom of the panel (user info, sign-out, etc.). */
  footer?: React.ReactNode;
  /** Return true to mark a link as active. */
  isActive?: (href: string) => boolean;
  /** Called when a nav link is clicked. */
  onNavigate?: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** aria-label for the nav landmark. */
  ariaLabel?: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  items,
  logo,
  footer,
  isActive,
  onNavigate,
  ariaLabel = 'Mobile navigation',
}) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const checkActive = isActive ?? ((href) => typeof window !== 'undefined' && window.location.pathname === href);

  const close = useCallback(() => setOpen(false), []);

  // Escape key + scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add('kiln-mnav-body-locked');
    document.body.style.paddingRight = `${sw}px`;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('kiln-mnav-body-locked');
      document.body.style.paddingRight = '';
    };
  }, [open, close]);

  // Restore focus on close
  useEffect(() => {
    if (!open) triggerRef.current?.focus();
  }, [open]);

  // Focus trap inside panel
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const el = panelRef.current;
    el.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [open]);

  const panel = (
    <>
      <div
        className={cn('kiln-mnav__overlay', open && 'kiln-mnav__overlay--visible')}
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={cn('kiln-mnav__panel', open && 'kiln-mnav__panel--open')}
        role={open ? 'dialog' : undefined}
        aria-modal={open ? 'true' : undefined}
        aria-label={open ? ariaLabel : undefined}
        aria-hidden={open ? undefined : 'true'}
      >
        <div className="kiln-mnav__header">
          <div className="kiln-mnav__header-brand">{logo}</div>
          <button
            className="kiln-mnav__close"
            onClick={close}
            aria-label="Close navigation menu"
          >
            <span className="kiln-mnav__close-x" aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="kiln-mnav__group" aria-label={ariaLabel}>
          <ul className="kiln-mnav__list">
            {items.map(({ href, label, icon }, i) => (
              <li
                key={href}
                className="kiln-mnav__item"
                style={{ '--kiln-mnav-stagger': `${i * 40}ms` } as React.CSSProperties}
              >
                <a
                  href={href}
                  className={cn('kiln-mnav__link', checkActive(href) && 'kiln-mnav__link--active')}
                  aria-current={checkActive(href) ? 'page' : undefined}
                  onClick={(e) => {
                    close();
                    if (onNavigate) { e.preventDefault(); onNavigate(href, e); }
                  }}
                >
                  {icon && <span className="kiln-mnav__link-icon" aria-hidden="true">{icon}</span>}
                  <span className="kiln-mnav__link-text">{label}</span>
                  {checkActive(href) && <span className="kiln-mnav__link-dot" aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {footer && (
          <div className="kiln-mnav__footer">{footer}</div>
        )}
      </div>

      <span className="kiln-mnav__sr-announce" aria-live="polite" aria-atomic="true">
        {open ? 'Navigation menu open' : ''}
      </span>
    </>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn('kiln-mnav__trigger', open && 'kiln-mnav__trigger--active')}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <span className="kiln-mnav__trigger-bar" />
        <span className="kiln-mnav__trigger-bar" />
        <span className="kiln-mnav__trigger-bar" />
      </button>
      {createPortal(panel, document.body)}
    </>
  );
};

export default MobileNav;
