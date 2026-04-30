// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
// mobile: verified 375px/768px 2026-04-29
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../utils';
import './TableOfContents.css';

export interface TocItem {
  /** The `id` attribute of the target element on the page */
  id: string;
  /** Text label shown in the navigation list */
  label: string;
  /**
   * Heading depth for visual indentation.
   * 1 = top-level, 2 = sub-section, 3 = sub-sub-section.
   * @default 1
   */
  level?: 1 | 2 | 3;
}

export interface TableOfContentsProps {
  items: TocItem[];
  /**
   * Vertical pixel offset subtracted when scrolling to a section.
   * Set this to the height of your sticky navigation bar so headings
   * are not hidden beneath it. Also controls the sticky `top` position.
   * @default 0
   */
  offsetTop?: number;
  /**
   * Heading text rendered above the link list. Also serves as the
   * accessible label for the `<nav>` landmark.
   * @default "On this page"
   */
  heading?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  offsetTop = 0,
  heading = 'On this page',
  className,
  style,
}) => {
  const headingId = useId();
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const rafRef = useRef<number>(0);
  // Tracks the last item the user clicked so the bottom-of-page fallback can
  // prefer it over whatever the threshold spy computes.
  const lastClickedRef = useRef<string>('');
  // Prevents the spy from firing during the smooth scroll animation, stopping
  // the highlight from flickering through every passing section in between.
  const clickLockRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActive = useCallback(() => {
    if (clickLockRef.current) return;

    const threshold = offsetTop + 1;
    let current = items[0]?.id ?? '';
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) current = item.id;
    }

    // When the page is at its maximum scroll position, sections near the bottom
    // may never get their heading above the threshold. If the last-clicked item
    // is still visible on screen, prefer it so the highlight doesn't land
    // several items up from where the user scrolled to.
    const distanceFromBottom =
      document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    if (distanceFromBottom < 10 && lastClickedRef.current) {
      const targetEl = document.getElementById(lastClickedRef.current);
      if (targetEl) {
        const top = targetEl.getBoundingClientRect().top;
        if (top > threshold && top < window.innerHeight) current = lastClickedRef.current;
      }
    }

    setActiveId(current);
  }, [items, offsetTop]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActive);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateActive();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateActive]);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      // Highlight immediately and lock the spy until the smooth scroll
      // animation finishes (~500 ms; lock for 700 ms to be safe).
      lastClickedRef.current = id;
      setActiveId(id);
      clickLockRef.current = true;
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => { clickLockRef.current = false; }, 700);
      const el = document.getElementById(id);
      if (!el) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const top = el.getBoundingClientRect().top + window.scrollY - offsetTop;
      window.scrollTo({ top, behavior: prefersReduced ? 'instant' : 'smooth' });
    },
    [offsetTop],
  );

  return (
    <nav
      className={cn('kiln-toc', className)}
      aria-labelledby={headingId}
      style={{ '--kiln-toc-offset-top': `${offsetTop}px`, ...style } as React.CSSProperties}
    >
      <p id={headingId} className="kiln-toc__heading">
        {heading}
      </p>
      <ol className="kiln-toc__list" role="list">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const level = item.level ?? 1;
          return (
            <li key={item.id} className="kiln-toc__item">
              <a
                href={`#${item.id}`}
                className={cn(
                  'kiln-toc__link',
                  `kiln-toc__link--level-${level}`,
                  isActive && 'kiln-toc__link--active',
                )}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

TableOfContents.displayName = 'TableOfContents';
export default TableOfContents;
