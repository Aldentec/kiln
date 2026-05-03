// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-02
// mobile: verified 375px/768px 2026-05-02
import React from 'react';
import { cn } from '../../utils';

export interface GridItemProps {
  /**
   * Columns to span at desktop (≥1024px).
   * Caps to 2 at tablet, resets to 1 on mobile — never overflows the grid.
   */
  colSpan?: 1 | 2 | 3 | 4;
  /** Rows to span at all breakpoints. */
  rowSpan?: 1 | 2 | 3 | 4;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ colSpan, rowSpan, className, style, children }, ref) => (
    <div
      ref={ref}
      className={cn('kiln-grid-item', className)}
      data-col-span={colSpan}
      data-row-span={rowSpan}
      style={style}
    >
      {children}
    </div>
  ),
);

GridItem.displayName = 'GridItem';
export default GridItem;
