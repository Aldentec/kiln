import React from 'react';
import { cn } from '../../utils';
import './Footer.css';

export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterProps {
  /** Logo / wordmark slot. */
  logo?: React.ReactNode;
  links?: FooterLink[];
  copyright?: string;
  /** Optional credit line, e.g. "Created by Dorian Smith". Accepts ReactNode for links. */
  credit?: React.ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  logo,
  links = [],
  copyright,
  credit,
  className = '',
}) => (
  <footer className={cn('kiln-footer', className)} aria-label="Site footer">
    <div className="kiln-footer__inner">
      {logo && <div className="kiln-footer__logo">{logo}</div>}

      {links.length > 0 && (
        <nav className="kiln-footer__nav" aria-label="Footer navigation">
          {links.map(({ href, label, external }) => (
            <a
              key={href}
              href={href}
              className="kiln-footer__link"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
              {external && <span className="kiln-sr-only"> (opens in new tab)</span>}
            </a>
          ))}
        </nav>
      )}

      {copyright && <p className="kiln-footer__copy">{copyright}</p>}
      {credit && <p className="kiln-footer__copy">{credit}</p>}
    </div>
  </footer>
);

export default Footer;
