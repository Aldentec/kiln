// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-02
// mobile: verified 375px/768px 2026-05-02
import React from 'react';
import { cn } from '../../utils';
import './Grid.css';

export type GridCols = 1 | 2 | 3 | 4;
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridProps {
  /**
   * Fixed columns with automatic responsive collapse.
   * 4 → 2-col at tablet → 1-col on mobile. Same for 3 and 2.
   * Ignored when minColWidth is set.
   */
  cols?: GridCols;
  /**
   * Auto-fit mode: items shrink until they reach this pixel width, then wrap to
   * a new row. The grid responds to any container width — no breakpoints needed.
   * Mutually exclusive with cols.
   *
   * Example: minColWidth={260} on a 1100px container → 4 cols.
   * Same prop on a 600px container → 2 cols. No config change.
   */
  minColWidth?: number;
  /**
   * Pack items into gaps when items vary in size (grid-auto-flow: dense).
   * Useful for image galleries and masonry-style layouts.
   */
  dense?: boolean;
  /** Gap between cells. Maps to Kiln space tokens. Override with --kiln-grid-gap. */
  gap?: GridGap;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ cols = 1, minColWidth, dense = false, gap = 'md', className, style, children }, ref) => {
    const autoFit = minColWidth !== undefined;
    return (
      <div
        ref={ref}
        className={cn('kiln-grid', dense && 'kiln-grid--dense', className)}
        data-cols={autoFit ? undefined : cols}
        data-gap={gap}
        style={
          autoFit
            ? ({ '--kiln-grid-min-col-width': `${minColWidth}px`, ...style } as React.CSSProperties)
            : style
        }
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';
export default Grid;
