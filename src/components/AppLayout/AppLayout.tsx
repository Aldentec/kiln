// a11y: WCAG AA verified 2026-05-02
// perf: CLS=0, GPU-friendly 2026-05-02
// mobile: verified 375px/768px 2026-05-02
import React from 'react';
import { cn } from '../../utils';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import NotificationBar from '../NotificationBar/NotificationBar';
import ToolsPanel from '../ToolsPanel/ToolsPanel';
import SplitPanel from '../SplitPanel/SplitPanel';
import './AppLayout.css';

// Re-export sub-types for convenience
export type { BreadcrumbItem as AppLayoutBreadcrumb } from '../Breadcrumbs/Breadcrumbs';
export type { NotificationBarItem as AppLayoutNotification } from '../NotificationBar/NotificationBar';

// ─── Props ───────────────────────────────────────────────────────────────────

import type { BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs';
import type { NotificationBarItem } from '../NotificationBar/NotificationBar';

export interface AppLayoutProps {
  /** Sticky top navigation bar */
  topBar?: React.ReactNode;

  /**
   * Sidebar content — pass a <SideNav> with its own open/onOpenChange/header
   * props for collapsible behaviour.
   */
  sideBar?: React.ReactNode;

  /** Tools panel content — rendered inside a ToolsPanel */
  toolsPanel?: React.ReactNode;
  /** Tools panel header label */
  toolsPanelHeader?: React.ReactNode;
  /** Controlled tools panel open state */
  toolsOpen?: boolean;
  onToolsChange?: (open: boolean) => void;
  defaultToolsOpen?: boolean;

  /** Breadcrumb trail */
  breadcrumbs?: BreadcrumbItem[];
  /** Notification banners */
  notifications?: NotificationBarItem[];

  /** Page header rendered above children */
  header?: React.ReactNode;
  /** Main content */
  children: React.ReactNode;

  /** Bottom split panel content */
  splitPanel?: React.ReactNode;
  /** Split panel toggle bar label */
  splitPanelHeader?: React.ReactNode;
  /** Controlled split panel open state */
  splitPanelOpen?: boolean;
  onSplitPanelChange?: (open: boolean) => void;
  defaultSplitPanelOpen?: boolean;
  splitPanelDefaultHeight?: number;
  splitPanelResizable?: boolean;

  /** aria-label for the <main> landmark */
  contentLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Component ───────────────────────────────────────────────────────────────

const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>((
  {
    topBar,
    sideBar,
    toolsPanel,
    toolsPanelHeader,
    toolsOpen,
    onToolsChange,
    defaultToolsOpen,
    breadcrumbs,
    notifications,
    header,
    children,
    splitPanel,
    splitPanelHeader,
    splitPanelOpen,
    onSplitPanelChange,
    defaultSplitPanelOpen,
    splitPanelDefaultHeight,
    splitPanelResizable,
    contentLabel = 'Main content',
    className,
    style,
  },
  ref,
) => (
  <div
    ref={ref}
    className={cn('kiln-app-layout', className)}
    style={style}
  >
    {/* ── Top bar ───────────────────────────────────────────────── */}
    {topBar && (
      <header className="kiln-app-layout__topbar" role="banner">
        {topBar}
      </header>
    )}

    {/* ── Body row ──────────────────────────────────────────────── */}
    <div className="kiln-app-layout__body">

      {/* ── Sidebar — rendered directly; SideNav manages its own state */}
      {sideBar}

      {/* ── Content column ──────────────────────────────────────── */}
      <div className="kiln-app-layout__content-column">

        {/* ── Breadcrumbs ───────────────────────────────────────── */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="kiln-app-layout__breadcrumb-bar">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        {/* ── Notifications ─────────────────────────────────────── */}
        {notifications && notifications.length > 0 && (
          <div className="kiln-app-layout__notification-bar">
            <NotificationBar items={notifications} />
          </div>
        )}

        {/* ── Page header ───────────────────────────────────────── */}
        {header && (
          <div className="kiln-app-layout__page-header">
            {header}
          </div>
        )}

        {/* ── Main ──────────────────────────────────────────────── */}
        <main className="kiln-app-layout__main" aria-label={contentLabel}>
          {children}
        </main>

        {/* ── Split panel ───────────────────────────────────────── */}
        {splitPanel && (
          <SplitPanel
            header={splitPanelHeader}
            open={splitPanelOpen}
            onOpenChange={onSplitPanelChange}
            defaultOpen={defaultSplitPanelOpen}
            defaultHeight={splitPanelDefaultHeight}
            resizable={splitPanelResizable}
            className="kiln-app-layout__split"
          >
            {splitPanel}
          </SplitPanel>
        )}
      </div>

      {/* ── Tools panel ─────────────────────────────────────────── */}
      {toolsPanel && (
        <ToolsPanel
          header={toolsPanelHeader}
          open={toolsOpen}
          onOpenChange={onToolsChange}
          defaultOpen={defaultToolsOpen}
          label="Tools panel"
          className="kiln-app-layout__tools"
        >
          {toolsPanel}
        </ToolsPanel>
      )}
    </div>
  </div>
));

AppLayout.displayName = 'AppLayout';
export default AppLayout;
