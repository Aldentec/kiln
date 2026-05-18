import React, { useState, useCallback } from 'react';
import {
  AppLayout, Nav, SideNav, Tabs, CodeBlock,
} from '@doriansmith/kiln';
import { componentDocs, COMPONENT_GROUPS } from './componentDocs';
import type { ComponentDoc, PropDef } from './componentDocs';
import { NAV_ITEMS, NAV_LOGO, isNavActive, navigate, NavActions } from './nav';
import './ComponentsPage.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const DOC_TABS = [
  { value: 'preview', label: 'Preview' },
  { value: 'api',     label: 'API' },
  { value: 'testing', label: 'Testing' },
  { value: 'usage',   label: 'Usage' },
];

type DocTab = 'preview' | 'api' | 'testing' | 'usage';

function resolveInitialId(slug: string): string {
  if (slug && componentDocs.some((d) => d.id === slug)) return slug;
  return componentDocs[0].id;
}

// ─── Contextual tips per component ────────────────────────────────────────────

interface ToolTip {
  label: string;
  text: string;
}

const TOOLS_CONTENT: Record<string, { tips: ToolTip[]; quickProps: string[] }> = {
  accordion: {
    tips: [
      { label: 'Multi-select', text: 'Set allowMultiple to let users open more than one panel at a time.' },
      { label: 'Accessibility', text: 'Each trigger auto-receives aria-expanded, aria-controls, and aria-labelledby — no extra wiring needed.' },
    ],
    quickProps: ['items', 'allowMultiple', 'defaultOpenIds', 'openIds', 'onChange'],
  },
  'app-layout': {
    tips: [
      { label: 'Responsive', text: 'The SideNav you pass manages its own collapse state. On mobile it auto-hides.' },
      { label: 'Tools panel', text: 'Pass a ToolsPanel via the toolsPanel slot for right-side context help.' },
    ],
    quickProps: ['topBar', 'sideBar', 'toolsPanel', 'breadcrumbs', 'notifications', 'children'],
  },
  avatar: {
    tips: [
      { label: 'Initials', text: 'Pass name and initials are derived automatically — first letter of the first and last word. Override with the initials prop.' },
      { label: 'Navbar pattern', text: 'Place Avatar in the Nav actions slot with menuItems for a ready-made user menu — it aligns to the right and opens a dropdown.' },
      { label: 'Image fallback', text: 'If src fails to load, the component automatically falls back to initials or the icon — no broken image placeholders.' },
      { label: 'Color variety', text: 'The 8 hue variants are deterministic — same name always yields the same color across sessions and devices.' },
    ],
    quickProps: ['name', 'src', 'size', 'menuItems', 'menuAlign'],
  },
  badge: {
    tips: [
      { label: 'Colour-blind safe', text: 'Each variant auto-prepends a sr-only label like "success:" for screen readers.' },
      { label: 'Size', text: 'Use size="sm" for compact inline badges inside tables or lists.' },
    ],
    quickProps: ['variant', 'size', 'children'],
  },
  card: {
    tips: [
      { label: 'Coming soon', text: 'The coming-soon variant renders a WIP placeholder — no children needed.' },
      { label: 'Hover lift', text: 'Add hoverLift for an elevated shadow effect on hover.' },
    ],
    quickProps: ['variant', 'hoverLift', 'onClick', 'children'],
  },
  checkbox: {
    tips: [
      { label: 'Indeterminate', text: 'Set indeterminate={someSelected && !allSelected} on a select-all checkbox — it shows a dash instead of a tick and announces correctly to screen readers.' },
      { label: 'Controlled vs uncontrolled', text: 'Pass checked + onChange for controlled mode. Omit checked and use defaultChecked for uncontrolled — the component manages its own state.' },
      { label: 'Error state', text: 'Pass errorText to show inline validation — it auto-sets aria-invalid and links the message via aria-describedby.' },
    ],
    quickProps: ['label', 'checked', 'defaultChecked', 'indeterminate', 'onChange', 'errorText', 'size'],
  },
  chip: {
    tips: [
      { label: 'Toggle group', text: 'Wrap multiple Chips in a flex container with gap to create a filter bar.' },
      { label: 'Controlled', text: 'Use selected + onToggle to manage selection state externally.' },
    ],
    quickProps: ['selected', 'defaultSelected', 'onToggle', 'disabled', 'children'],
  },
  'code-block': {
    tips: [
      { label: 'Copy support', text: 'A one-click copy button appears in the toolbar. Toggle with showCopy={false}.' },
      { label: 'Language', text: 'Set language="bash" or language="json" to label the toolbar.' },
    ],
    quickProps: ['code', 'language', 'showCopy'],
  },
  'copy-to-clipboard': {
    tips: [
      { label: 'Zero intrusion', text: "The wrapper never overrides the child's role, aria-label, or keyboard events — it only listens for the bubbled click." },
      { label: 'Placement', text: 'Choose the side with the most viewport space. top works for most cases; right avoids covering inline values like API keys.' },
      { label: 'Dark mode', text: 'The tooltip surface automatically inverts when data-theme="dark" is on <html> — no extra config needed.' },
      { label: 'Non-interactive children', text: 'When wrapping a div or span, add role="button", tabIndex={0}, and an onKeyDown handler so keyboard users can trigger the copy.' },
    ],
    quickProps: ['value', 'placement', 'successMessage', 'duration', 'onCopy'],
  },
  'dropdown-menu': {
    tips: [
      { label: 'Alignment', text: 'Use align="end" to anchor the menu to the right edge of the trigger.' },
      { label: 'Separators', text: 'Insert { type: "separator" } into the items array for visual dividers.' },
    ],
    quickProps: ['trigger', 'items', 'align', 'side'],
  },
  footer: {
    tips: [
      { label: 'Sticky bottom', text: 'Footer uses margin-top: auto — works in any flex-column layout with min-height: 100vh.' },
      { label: 'Credit', text: 'The credit slot accepts ReactNode, so you can render links or badges.' },
    ],
    quickProps: ['logo', 'links', 'copyright', 'credit'],
  },
  grid: {
    tips: [
      { label: 'Auto-fit', text: 'Use minColWidth instead of cols to let the browser decide column count from container width.' },
      { label: 'Dense', text: 'Set dense for masonry-style gap filling with mixed-height items.' },
    ],
    quickProps: ['cols', 'minColWidth', 'dense', 'gap'],
  },
  header: {
    tips: [
      { label: 'H1 centred', text: 'The h1 variant centres its tagline, heading, description, and actions for page-hero use.' },
      { label: 'Divider', text: 'Add divider for a hairline separator below the header block.' },
    ],
    quickProps: ['variant', 'tagline', 'description', 'actions', 'divider'],
  },
  hero: {
    tips: [
      { label: 'Landmark label', text: 'Pass an id and the section gets aria-labelledby automatically — no extra wiring.' },
      { label: 'Eyebrow flexibility', text: 'Plain strings render as uppercase tracking labels. Pass a Badge, gradient wordmark, or any ReactNode for richer treatments.' },
      { label: 'Actions layout', text: 'The actions slot is flex-column — wrap buttons in your own flex row for side-by-side CTAs, then add badge rows below.' },
      { label: 'Media column', text: 'Provide the media prop to switch to a two-column layout. Stacks vertically on mobile automatically.' },
    ],
    quickProps: ['title', 'eyebrow', 'description', 'actions', 'media', 'align', 'variant', 'size', 'id'],
  },
  input: {
    tips: [
      { label: 'Validation', text: 'Pass errorText to show inline validation — it auto-sets aria-invalid.' },
      { label: 'Type', text: 'Supports type="email", type="password", type="search" etc.' },
    ],
    quickProps: ['label', 'placeholder', 'errorText', 'helperText', 'type'],
  },
  list: {
    tips: [
      { label: 'Keyboard reorder', text: 'With sortable enabled, focus a drag handle and press Space to lift, Arrow Up/Down to move, Space to drop, Escape to cancel.' },
      { label: 'List builder', text: 'Compose List with Input and Button to build a sortable list builder — see the Usage tab for a complete example.' },
      { label: 'Announcement label', text: 'Set announcementLabel on each item so screen readers announce a clean string (e.g. "Apples") rather than falling back to "item 1".' },
    ],
    quickProps: ['items', 'sortable', 'onReorder', 'sortDisabled', 'disablePaddings'],
  },
  'loading-indicator': {
    tips: [
      { label: 'Full-screen', text: 'Set fullScreen to centre the spinner over the entire viewport.' },
      { label: 'Inline', text: 'Set inline for a tiny spinner that fits inside text or buttons.' },
    ],
    quickProps: ['message', 'fullScreen', 'inline'],
  },
  modal: {
    tips: [
      { label: 'Focus trap', text: 'Tab key is trapped inside the dialog while open; Escape dismisses automatically.' },
      { label: 'Scroll lock', text: 'Body scroll is disabled while the modal is open.' },
    ],
    quickProps: ['isOpen', 'onClose', 'title', 'children'],
  },
  nav: {
    tips: [
      { label: 'Mobile drawer', text: 'A hamburger menu with focus-trapped slide-out panel is built in for screens < 768px.' },
      { label: 'Routing', text: 'onNavigate fires on every link click — call e.preventDefault() for SPA routing.' },
    ],
    quickProps: ['logo', 'items', 'actions', 'sticky', 'isActive', 'onNavigate'],
  },
  'nav-menu': {
    tips: [
      { label: 'Desktop only', text: 'NavMenu renders only the desktop link strip — pair with MobileNav for mobile.' },
      { label: 'Primitive', text: 'Use this when you need full control over your nav bar layout.' },
    ],
    quickProps: ['items', 'isActive', 'onNavigate'],
  },
  'notification-bar': {
    tips: [
      { label: 'Stacked', text: 'Multiple items render as stacked banners with a single dismiss button each.' },
      { label: 'Controlled dismiss', text: 'Pass onDismiss on each item to remove it from state.' },
    ],
    quickProps: ['items'],
  },
  'radio-button': {
    tips: [
      { label: 'Group with name', text: 'Give every radio in a group the same name prop — the browser enforces single-selection automatically.' },
      { label: 'Controlled group', text: 'Compare value to your state variable in checked and call setState in onChange for a fully controlled group.' },
      { label: 'Description', text: 'Pass description for helper text below the label; it is linked via aria-describedby automatically.' },
    ],
    quickProps: ['checked', 'defaultChecked', 'onChange', 'name', 'value', 'description', 'disabled', 'readOnly'],
  },
  'side-nav': {
    tips: [
      { label: 'Collapsible', text: 'Provide header or open/onOpenChange to enable the expand/collapse toggle.' },
      { label: 'Keyboard', text: 'Arrow Up/Down and Home/End navigate between items.' },
    ],
    quickProps: ['groups', 'activeId', 'onSelect', 'header', 'open', 'width'],
  },
  table: {
    tips: [
      { label: 'Controlled sort', text: 'Pass sortingColumn + sortingDescending and handle onSortingChange to sort server-side. Omit both to sort in-browser automatically.' },
      { label: 'Selection state', text: 'selectedItems and onSelectionChange are fully controlled — store the array in your own state and spread it back in.' },
      { label: 'Slots', text: 'header, filter, pagination, and footer accept any ReactNode. Compose with Input, Button, and Badge for a complete data view.' },
      { label: 'Empty state', text: 'Pass an empty prop with a custom ReactNode to show a branded zero-state when items is empty.' },
    ],
    quickProps: ['columnDefinitions', 'items', 'trackBy', 'selectionType', 'selectedItems', 'onSelectionChange', 'sortingColumn', 'onSortingChange', 'loading', 'header', 'filter', 'pagination', 'empty'],
  },
  'table-of-contents': {
    tips: [
      { label: 'Scroll tracking', text: 'Uses IntersectionObserver to highlight the currently visible section.' },
      { label: 'Offset', text: 'Set offsetTop to match your sticky nav height so the active section aligns.' },
    ],
    quickProps: ['items', 'offsetTop', 'heading'],
  },
  tabs: {
    tips: [
      { label: 'Keyboard', text: 'Arrow Left/Right moves between tabs; Home/End jump to first/last.' },
      { label: 'Controlled', text: 'Use value + onChange to sync the active tab with your route or state.' },
    ],
    quickProps: ['items', 'variant', 'value', 'defaultValue', 'onChange'],
  },
  textarea: {
    tips: [
      { label: 'Resize', text: "Users can vertically resize by default — add style={{ resize: 'none' }} to lock it." },
      { label: 'Rows', text: 'Set rows to control the initial height.' },
    ],
    quickProps: ['label', 'helperText', 'errorText', 'rows', 'placeholder'],
  },
  'theme-toggle': {
    tips: [
      { label: 'Persistence', text: 'Reads and writes to localStorage("kiln-theme") automatically.' },
      { label: 'Placement', text: 'Typically placed in the Nav actions slot or in a settings panel.' },
    ],
    quickProps: [],
  },
  'toggle': {
    tips: [
      { label: 'Binary switch', text: 'Use for boolean settings — never for navigation.' },
      { label: 'Label hidden', text: 'Set labelHidden to visually hide the label while keeping it for screen readers.' },
    ],
    quickProps: ['checked', 'defaultChecked', 'onChange', 'label', 'size'],
  },
  toast: {
    tips: [
      { label: 'Persistent', text: 'Pass duration: 0 to prevent auto-dismiss — the user must close manually.' },
      { label: 'Position', text: 'Set position on ToastContainer to change the stack location.' },
    ],
    quickProps: ['success', 'error', 'warning', 'info'],
  },
  tooltip: {
    tips: [
      { label: 'Trigger', text: 'The child element receives ref + aria attributes — it must be a valid element, not a fragment.' },
      { label: 'Delay', text: 'Set delayMs={0} for instant tooltip on hover.' },
    ],
    quickProps: ['content', 'side', 'delayMs', 'children'],
  },
  'tools-panel': {
    tips: [
      { label: 'Mobile drawer', text: 'On screens < 768px the panel becomes a right-side drawer with backdrop.' },
      { label: 'Escape', text: 'Pressing Escape closes the panel and returns focus to the FAB.' },
    ],
    quickProps: ['header', 'open', 'onOpenChange', 'defaultOpen', 'children'],
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PreviewTab({ doc }: { doc: ComponentDoc }) {
  const Preview = doc.preview;
  return (
    <div>
      <p className="docs-section-title">Live preview</p>
      <div className="docs-preview-box">
        <Preview />
      </div>
      <CodeBlock language="tsx" code={doc.code} />
    </div>
  );
}

function PropRow({ prop }: { prop: PropDef }) {
  return (
    <tr>
      <td>
        <span className="docs-prop-name">{prop.name}</span>
        {prop.required && <span className="docs-prop-required">required</span>}
      </td>
      <td><span className="docs-prop-type">{prop.type}</span></td>
      <td><span className="docs-prop-default">{prop.default}</span></td>
      <td style={{ color: 'var(--kiln-gray-600)' }}>{prop.description}</td>
    </tr>
  );
}

function ApiTab({ doc }: { doc: ComponentDoc }) {
  return (
    <div>
      <p className="docs-section-title">Props</p>
      <div className="docs-props-table-wrap">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {doc.props.map((p) => <PropRow key={p.name} prop={p} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TestingTab({ doc }: { doc: ComponentDoc }) {
  return (
    <div>
      <p className="docs-section-title">Test examples</p>
      <CodeBlock language="tsx" code={doc.testing} />
    </div>
  );
}

function UsageTab({ doc }: { doc: ComponentDoc }) {
  return (
    <div>
      <p className="docs-section-title">Usage examples</p>
      <CodeBlock language="tsx" code={doc.usage} />
    </div>
  );
}

// ─── Tools panel ──────────────────────────────────────────────────────────────

function ToolsPanelContent({ doc }: { doc: ComponentDoc }) {
  const ctx = TOOLS_CONTENT[doc.id];
  if (!ctx) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-5)' }}>
      {/* ── Quick props ────────────────────────────────────────────── */}
      {ctx.quickProps.length > 0 && (
        <div>
          <p style={{ margin: '0 0 var(--kiln-space-2)', fontSize: 'var(--kiln-text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kiln-gray-500)' }}>
            Key props
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {ctx.quickProps.map((p) => (
              <code key={p} style={{ fontSize: 'var(--kiln-text-xs)', padding: '2px 6px', borderRadius: 'var(--kiln-radius-sm)', background: 'var(--kiln-gray-100)', color: 'var(--kiln-gray-700)' }}>
                {p}
              </code>
            ))}
          </div>
        </div>
      )}

      {/* ── Tips ───────────────────────────────────────────────────── */}
      {ctx.tips.map(({ label, text }) => (
        <div key={label}>
          <p style={{ margin: '0 0 2px', fontSize: 'var(--kiln-text-xs)', fontWeight: 600, color: 'var(--kiln-gray-700)' }}>
            {label}
          </p>
          <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

interface ComponentsPageProps {
  initialSlug?: string;
}

export default function ComponentsPage({ initialSlug = '' }: ComponentsPageProps) {
  const [selectedId, setSelectedId] = useState<string>(() => resolveInitialId(initialSlug));
  const [docTab, setDocTab]         = useState<DocTab>('preview');
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [toolsOpen, setToolsOpen]   = useState(false);

  const selectedDoc = componentDocs.find((d) => d.id === selectedId) ?? componentDocs[0];

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setDocTab('preview');
    window.history.pushState(null, '', `/components/${id}`);
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  return (
    <AppLayout
      topBar={
        <Nav
          logo={NAV_LOGO}
          items={NAV_ITEMS}
          isActive={isNavActive}
          actions={<NavActions />}
          sticky
          onNavigate={navigate}
        />
      }
      sideBar={
        <SideNav
          groups={COMPONENT_GROUPS}
          activeId={selectedId}
          onSelect={handleSelect}
          header={`Components (${componentDocs.length})`}
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          width="15rem"
        />
      }
      toolsPanel={<ToolsPanelContent doc={selectedDoc} />}
      toolsPanelHeader="Tools"
      toolsOpen={toolsOpen}
      onToolsChange={setToolsOpen}
      contentLabel="Component documentation"
    >
      <div className="docs-content">
        <div className="docs-component-header">
          <h1>{selectedDoc.name}</h1>
          <p>{selectedDoc.description}</p>
        </div>

        <div className="docs-tabs-row">
          <Tabs
            variant="underline"
            items={DOC_TABS}
            value={docTab}
            onChange={(v) => setDocTab(v as DocTab)}
            ariaLabel={`${selectedDoc.name} documentation tabs`}
          />
        </div>

        <div className="docs-tab-content" key={`${selectedId}-${docTab}`}>
          {docTab === 'preview' && <PreviewTab doc={selectedDoc} />}
          {docTab === 'api'     && <ApiTab     doc={selectedDoc} />}
          {docTab === 'testing' && <TestingTab doc={selectedDoc} />}
          {docTab === 'usage'   && <UsageTab   doc={selectedDoc} />}
        </div>
      </div>
    </AppLayout>
  );
}
