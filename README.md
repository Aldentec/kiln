<p align="center">
  <img src="src/assets/logo.png" alt="Kiln" width="120" />
</p>

<h1 align="center">Kiln</h1>

<p align="center"><strong>Ship fast without compromise.</strong></p>

<p align="center">An accessible, performant React component library for indie developers and small teams.<br>Stop rebuilding the same buttons, inputs, cards, and modals every project — drop in Kiln and ship.</p>

<p align="center">
  <a href="https://github.com/Aldentec/kiln"><strong>→ Live Demo</strong></a> · <a href="https://www.npmjs.com/package/@doriansmith/kiln"><strong>npm</strong></a>
</p>

---

## Why Kiln

### 1. Accessibility-first
Every component meets WCAG AA out of the box. Keyboard navigation, focus management, focus rings, and correct ARIA attributes are built in — not bolted on. Accessibility isn't a nice-to-have: if it isn't there from day one, it becomes technical debt that slows you down later.

### 2. Performance-first
Kiln components don't tank your Lighthouse score. Zero layout shift on every interaction. All animations use `transform` and `opacity` — GPU-accelerated, no layout thrashing. No JavaScript animation overhead. Bundle size is measured and budgeted.

### 3. Solo-dev friendly
From `npm install` to rendering a Kiln page in under 2 minutes. No config files, no setup wizards, no theme provider components, no required context wrappers. Every code example is copy-paste ready. TypeScript is fully inferred — no required generic annotations.

### 4. Mobile-first (mandatory)
Every component works on real devices at 375px. All interactive elements meet the 44×44px WCAG touch target requirement. `<input>` and `<textarea>` use `font-size ≥ 16px` on mobile to prevent iOS Safari zoom. No text below 14px on small screens. Positioned overlays (tooltips, dropdowns, modals) are viewport-constrained. Modals become bottom-sheets on mobile. This is not optional — mobile is a first-class requirement on par with accessibility and performance.

---

## Install

```bash
npm install @doriansmith/kiln
```

Peer deps (already in your project):

```bash
npm install react react-dom
```

---

## Usage

Import the CSS once at your app root:

```ts
import '@doriansmith/kiln/kiln.css';
```

Use components:

```tsx
import { Button, Input, Card } from '@doriansmith/kiln';

export default function App() {
  return (
    <Card variant="raised">
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Ship it</Button>
    </Card>
  );
}
```

**Dark mode:** set `data-theme="dark"` on `<html>`. Use the built-in `ThemeToggle` component for automatic `localStorage` persistence.

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

---

## What's included

| Component | Description |
|---|---|
| `AppLayout` | Full-page app shell. Composes sidebar, tools panel, breadcrumbs, notifications, page header, and split panel. |
| `Breadcrumbs` | Hierarchical nav trail with chevron separators and mobile truncation. |
| `Button` | Primary / secondary / ghost / danger. Loading state, icons, link mode. |
| `Input` | Label, helper text, error state, left/right icons. ARIA-linked. |
| `Textarea` | Like Input, plus character counter. |
| `Card` | Default / raised / glass / gradient-border. Hover lift. |
| `Badge` | Severity (critical → low) and status (success / warning / error / info / pending / running). |
| `Chip` | Selectable filter chip. Controlled and uncontrolled. |
| `Tabs` | Arrow-key navigation, ARIA tablist / tab / tabpanel. |
| `Modal` | Portal, focus trap, Escape to close, returns focus on dismiss. |
| `Nav` | Sticky header, mobile slide-in drawer with focus trap. |
| `NavMenu` | Horizontal link strip for use inside custom headers. |
| `MobileNav` | Standalone mobile navigation panel. |
| `NotificationBar` | Stacked dismissible banners with info / success / warning / error variants and `aria-live`. |
| `SidebarPanel` | Collapsible left panel. Desktop slide animation, mobile overlay drawer with backdrop. |
| `SideNav` | Grouped vertical nav with active state and keyboard navigation. |
| `SplitPanel` | Expandable bottom panel with drag-to-resize handle and keyboard resize (arrow keys). |
| `TableOfContents` | Sticky ToC with IntersectionObserver active-section tracking. |
| `ThemeToggle` | Light/dark toggle, persists to `localStorage`. |
| `Toast` / `ToastContainer` | Non-blocking toasts with four severity variants and configurable position. |
| `Tooltip` | Hover/focus popup label attached to any element. |
| `ToolsPanel` | Collapsible right panel for help or tools. Desktop slide animation, mobile overlay drawer. |
| `Footer` | Logo, link list, copyright. |
| `Grid` + `GridItem` | Responsive CSS grid. Fixed-column mode (4→2→1) or container-aware auto-fit. Span cells with `GridItem`. |
| `LoadingIndicator` | Spinner, inline or block. `aria-live` announcement. |
| `ErrorMessage` | Error display with optional retry button. |
| `ScrollToTop` | Scrolls to top on route change. Renders nothing. |
| `CodeBlock` | Styled `<pre><code>` with copy button and language label. |

---

## AppLayout

A full-page application shell — drop it in once and get sidebar, tools panel, breadcrumbs, notifications, and a sticky top bar wired up and accessible.

```tsx
import { AppLayout, Nav, SideNav, ThemeToggle } from '@doriansmith/kiln';

const [sidebarOpen, setSidebarOpen] = useState(true);

<AppLayout
  topBar={<Nav logo={logo} items={navItems} actions={<ThemeToggle />} />}
  sidebar={<SideNav groups={navGroups} activeId={activeId} onSelect={setActiveId} />}
  sidebarOpen={sidebarOpen}
  onSidebarChange={setSidebarOpen}
  breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]}
  header={<h1>Dashboard</h1>}
>
  <YourPageContent />
</AppLayout>
```

### Slots

| Prop | Description |
|---|---|
| `topBar` | Sticky header (renders inside `<header role="banner">`) |
| `sidebar` | Collapsible left panel — toggle via `sidebarOpen` / `onSidebarChange` |
| `toolsPanel` | Collapsible right panel — toggle via `toolsOpen` / `onToolsChange` |
| `header` | Page header rendered above `children` inside the content column |
| `children` | Main page content (rendered inside `<main>`) |
| `splitPanel` | Expandable bottom panel with its own toggle button |

### Notifications

Pass an array of `AppLayoutNotification` objects for dismissible banners above the content area:

```tsx
const [notes, setNotes] = useState([
  { id: '1', type: 'success', message: 'Deployed.', dismissible: true,
    onDismiss: (id) => setNotes((n) => n.filter((x) => x.id !== id)) },
]);

<AppLayout notifications={notes}>...</AppLayout>
```

`type` is `'info' | 'success' | 'warning' | 'error'`.

### CSS token overrides

Override panel widths via inline `style` or `sidebarWidth` / `toolsWidth` props:

```tsx
<AppLayout
  sidebarWidth="200px"
  style={{
    '--kiln-tools-panel-width': '320px',
  } as React.CSSProperties}
>
  ...
</AppLayout>
```

### Responsive behaviour

- **Desktop (≥ 768px):** sidebar and tools panel slide in/out without overlapping content.
- **Mobile (< 768px):** both panels become fixed overlay drawers with a backdrop. Sidebar closes on Escape or backdrop click.

---

## Breadcrumbs

Hierarchical navigation trail. Last item is the current page (no link, `aria-current="page"`).

```tsx
import { Breadcrumbs } from '@doriansmith/kiln';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Kiln' },
  ]}
/>
```

---

## NotificationBar

Stacked dismissible banners. Pass `dismissible: true` and `onDismiss` to enable per-item removal. Announces changes via `aria-live`.

```tsx
import { NotificationBar } from '@doriansmith/kiln';

const [items, setItems] = useState([
  { id: '1', type: 'success', message: 'Deployed successfully.', dismissible: true },
]);
const dismiss = (id) => setItems((n) => n.filter((x) => x.id !== id));

<NotificationBar items={items.map((n) => ({ ...n, onDismiss: dismiss }))} />
```

`type` is `'info' | 'success' | 'warning' | 'error'`.

---

## SidebarPanel

Collapsible left sidebar with desktop slide animation and mobile overlay drawer.

```tsx
import { SidebarPanel } from '@doriansmith/kiln';

const [open, setOpen] = useState(true);

<div style={{ display: 'flex' }}>
  <SidebarPanel header="Navigation" open={open} onOpenChange={setOpen}>
    <nav>...</nav>
  </SidebarPanel>
  <main style={{ flex: 1 }}>...</main>
</div>
```

Token override: `--kiln-sidebar-panel-width` (default `260px`).

---

## SplitPanel

Expandable bottom panel with drag-to-resize handle and keyboard resize (↑/↓ arrow keys in 20px steps).

```tsx
import { SplitPanel } from '@doriansmith/kiln';

<SplitPanel header="Logs" defaultOpen defaultHeight={240} resizable>
  <LogViewer />
</SplitPanel>
```

---

## ToolsPanel

Collapsible right-side panel — identical ergonomics to `SidebarPanel` but anchored to the right edge.

```tsx
import { ToolsPanel } from '@doriansmith/kiln';

<ToolsPanel header="Help" defaultOpen>
  <HelpArticle />
</ToolsPanel>
```

Token override: `--kiln-tools-panel-width` (default `280px`).

---

## Grid

Two modes, zero breakpoint config.

### Fixed columns — `cols`

Declare the max column count. Kiln collapses it automatically: 4 cols at desktop, 2 at tablet, 1 on mobile.

```tsx
import { Grid, GridItem } from '@doriansmith/kiln';

<Grid cols={4} gap="md">
  {cards}
</Grid>
```

### Auto-fit — `minColWidth`

Tell Kiln how wide each item should be. The browser calculates the column count from the container width — no breakpoints, no config. Works inside sidebars, modals, and any nested layout.

```tsx
// 1100px container → ~4 cols. 600px → 2 cols. 300px → 1 col. No code change.
<Grid minColWidth={260} gap="md">
  {cards}
</Grid>
```

### `GridItem` — spanning cells

```tsx
<Grid cols={3} gap="md">
  <GridItem colSpan={2}><Card>Wide</Card></GridItem>
  <Card>Narrow</Card>
</Grid>
```

`colSpan` is responsive-safe: it caps to 2 at tablet and resets to 1 on mobile so items never overflow implicit columns.

### Dense packing

```tsx
<Grid cols={4} gap="sm" dense>
  {photos}
</Grid>
```

`dense` enables `grid-auto-flow: dense` — fills gaps when items vary in height, useful for image galleries.

### Gap tokens

| `gap` prop | Value |
|---|---|
| `none` | 0 |
| `xs` | 0.5rem |
| `sm` | 1rem |
| `md` | 1.5rem (default) |
| `lg` | 2rem |
| `xl` | 3rem |

Override per-instance with the `--kiln-grid-gap` CSS token:

```tsx
<Grid cols={3} style={{ '--kiln-grid-gap': '2rem' } as React.CSSProperties}>
  {cards}
</Grid>
```

---

## TypeScript

All props are fully typed. Named type exports:

```ts
import type {
  ButtonVariant, ButtonSize,
  CardVariant,
  BadgeVariant, BadgeSeverity, BadgeStatus, BadgeSize,
  TabItem, NavItem, CodeBlockProps,
  BreadcrumbItem,
  NotificationBarItem, NotificationBarType,
  SidebarPanelProps, ToolsPanelProps, SplitPanelProps,
  AppLayoutBreadcrumb, AppLayoutNotification,
} from '@doriansmith/kiln';
```

No generic annotations required anywhere.

---

## Bundle size

| Artifact | Minified | Gzipped |
|---|---|---|
| `kiln.css` | ~74 KB | ~10 KB |
| `index.js` (ESM) | ~36 KB | ~13 KB |

Total gzipped: **< 25 KB**. Budget: 50 KB gzipped.

---

## Status

**v0.2.x — Stable.** APIs are stable. The visual style is opinionated and will not change without a major version bump.

---

## Roadmap

**v0.3.0 (coming soon)**
- Storybook component explorer
- GSAP-enhanced animation variants (optional peer dependency — base components remain CSS-only)
- Additional primitives: Select, Combobox, DatePicker
- Component-level token documentation

---

## License

MIT
