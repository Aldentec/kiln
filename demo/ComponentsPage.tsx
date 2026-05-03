import React, { useState, useCallback } from 'react';
import {
  AppLayout, Nav, SideNav, Tabs, CodeBlock, ThemeToggle,
} from '@doriansmith/kiln';
import { componentDocs, COMPONENT_GROUPS } from './componentDocs';
import type { ComponentDoc, PropDef } from './componentDocs';
import { NAV_ITEMS, NAV_LOGO, isNavActive } from './nav';
import './ComponentsPage.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const DOC_TABS = [
  { value: 'preview', label: 'Preview' },
  { value: 'api',     label: 'API' },
  { value: 'testing', label: 'Testing' },
  { value: 'usage',   label: 'Usage' },
];

type DocTab = 'preview' | 'api' | 'testing' | 'usage';

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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ComponentsPage() {
  const [selectedId, setSelectedId] = useState<string>(componentDocs[0].id);
  const [docTab, setDocTab]         = useState<DocTab>('preview');
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);

  const selectedDoc = componentDocs.find((d) => d.id === selectedId) ?? componentDocs[0];

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setDocTab('preview');
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  const navigate = (href: string) => {
    window.history.pushState(null, '', href);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <AppLayout
      topBar={
        <Nav
          logo={NAV_LOGO}
          items={NAV_ITEMS}
          isActive={isNavActive}
          actions={<ThemeToggle />}
          sticky
          onNavigate={navigate}
        />
      }
      sidebar={
        <SideNav
          groups={COMPONENT_GROUPS}
          activeId={selectedId}
          onSelect={handleSelect}
        />
      }
      sidebarOpen={sidebarOpen}
      onSidebarChange={setSidebarOpen}
      contentLabel="Component documentation"
      style={{ '--kiln-app-layout-sidebar-width': '15rem' } as React.CSSProperties}
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
