<h1 align="center">Kiln</h1>

<p align="center"><strong>Ship fast without compromise.</strong></p>

<p align="center">An accessible, performant React component library for indie developers and small teams.<br>Stop rebuilding the same buttons, inputs, cards, and modals every project — drop in Kiln and ship.</p>

<p align="center">
  <a href="https://kiln-ui.com"><strong>→ Live Demo</strong></a> · <a href="https://www.npmjs.com/package/@doriansmith/kiln"><strong>npm</strong></a>
</p>

---

## Why Kiln

### 1. Accessible by default
Every component meets WCAG AA out of the box. Keyboard navigation, focus management, focus rings, and correct ARIA are built in — not bolted on. Accessibility debt costs more to fix later than to build correctly now.

### 2. Performance-first
Kiln components don't tank your Lighthouse score. The production site scores **99 Performance / 100 Accessibility / 100 SEO** on Lighthouse (FCP 0.6s, LCP 0.6s, TBT 0ms, CLS 0.005). Zero layout shift on every interaction. All animations use `transform` and `opacity` — GPU-accelerated, no layout thrashing. Bundle size is measured and budgeted. These scores are a floor, not a one-time achievement — every new component must maintain them.

### 3. Genuinely mobile-ready
Every component works on real devices at 375px. All interactive elements meet the 44×44px WCAG touch target requirement. No text below 14px on small screens. Positioned overlays are viewport-constrained. Mobile is not optional.

### 4. Built for solo devs
From `npm install` to rendering a Kiln page in under 2 minutes. No config files, no setup wizards, no theme provider components, no required context wrappers. Every code example is copy-paste ready. TypeScript is fully inferred — no required generic annotations.

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

### Using your own brand colors

Kiln supports named themes — register as many as you need and switch between them with a single call. All themes are accessibility-enforced automatically.

---

**Register and apply themes**

```js
import { registerTheme, applyTheme } from 'kiln';

// Register light and dark variants of your brand
registerTheme('brand-light', {
  primary: '#2563eb',
  accent:  '#f59e0b',
  mode:    'light',
});

registerTheme('brand-dark', {
  primary: '#2563eb',  // same hue — Kiln recalculates for dark surface
  accent:  '#f59e0b',
  mode:    'dark',
});

// Apply one
applyTheme('brand-light');

// Switch later (e.g. when user toggles dark mode)
applyTheme('brand-dark');
```

Kiln compiles each theme independently against its surface, so your `brand-light` and `brand-dark` primary values will have different lightness — whatever is needed to meet WCAG AA on each background.

---

**Register any number of themes**

```js
registerTheme('high-contrast', {
  primary: '#000080',
  accent:  '#cc0000',
  mode:    'light',
});

registerTheme('campaign-summer', {
  primary: '#e85d04',
  accent:  '#ffba08',
  mode:    'light',
});

// Inspect registered themes
import { getRegisteredThemes } from 'kiln';
getRegisteredThemes(); // ['brand-light', 'brand-dark', 'high-contrast', 'campaign-summer']
```

---

**Preview a theme before applying**

```js
import { getThemeTokens } from 'kiln';

const tokens = getThemeTokens('brand-dark');
// { '--kiln-primary': '#4d8fff', '--kiln-primary-fg': '#ffffff', ... }
// Inspect resolved values before committing to the switch
```

---

**Compile without registering (SSR / build-time use)**

`compileTheme` is a pure function — no DOM, no side effects. Use it at build time or in server environments:

```js
import { compileTheme } from 'kiln';

const tokens = compileTheme({ primary: '#2563eb', mode: 'light' });
// Inject as inline styles, generate a CSS file, or pass to a renderer
```

---

**Simple single-theme setup**

If you only need one theme and don't want to think about registration:

```js
import { applyKilnTheme } from 'kiln';

applyKilnTheme({
  primary: '#2563eb',
  accent:  '#f59e0b',
  mode:    'light',
});
```

---

**HTML attribute API (SSR / no-JS)**

```html
<html data-kiln-primary="#2563eb" data-kiln-accent="#f59e0b" data-kiln-mode="light">
```

Kiln picks these up automatically on load. For multi-theme SSR setups, use `registerTheme` / `applyTheme` in your JS instead.

---

**Resetting to Kiln defaults**

```js
import { resetTheme } from 'kiln';
resetTheme(); // Removes all custom tokens, restores design-tokens.css defaults
```

---

**What gets themed**

| Affected | Not affected |
|---|---|
| Buttons, badges, chips | Status colors (error, warning, success) |
| Focus rings, links | Severity indicators |
| Primary-tinted surfaces | Neutrals / grays |
| Gradients using primary | Typography, spacing, radius |

> **Note on color adjustment:** Kiln may silently adjust your color's lightness to meet contrast requirements. Use `getThemeTokens(name)` to inspect the final resolved values before applying.

> **Note on dark mode:** Register a separate `dark` variant of your theme. Kiln does not automatically derive a dark variant — it recalculates from scratch against the dark surface, which produces better results than any automatic inversion.

> **Note on OS preference detection:** Kiln does not watch `prefers-color-scheme` automatically. Wire that up yourself and call `applyTheme()` in the handler:
> ```js
> const mq = window.matchMedia('(prefers-color-scheme: dark)');
> mq.addEventListener('change', e => applyTheme(e.matches ? 'brand-dark' : 'brand-light'));
> applyTheme(mq.matches ? 'brand-dark' : 'brand-light');
> ```

---

## What's included

| Component | Description |
|---|---|
| `AppLayout` | Full-page app shell. Composes sidebar, tools panel, breadcrumbs, notifications, page header, and split panel. |
| `Breadcrumbs` | Hierarchical nav trail with chevron separators and mobile truncation. |
| `Button` | Primary / secondary / ghost / danger. Loading state, icons, link mode. |
| `Input` | Label, helper text, error state, left/right icons. ARIA-linked. |
| `List` | Consecutive items with secondary content, icons, actions, link mode, and drag-to-reorder. Keyboard reorder with live announcements. |
| `Textarea` | Like Input, plus character counter. |
| `Card` | Default / raised / glass / gradient-border / coming-soon. Hover lift. |
| `Header` | Page and section heading block with optional tagline, description, and actions slot. Provides consistent spacing after the Nav. |
| `Hero` | Full-width page hero section with eyebrow, title, description, actions, and optional media slots. Semantic `<section>` landmark. Three variants (default / gradient / glass), three sizes, left or centre alignment. |
| `Badge` | Severity (critical → low) and status (success / warning / error / info / pending / running). |
| `Chip` | Selectable filter chip. Controlled and uncontrolled. |
| `Toggle` | Binary switch for boolean settings. Three sizes, controlled and uncontrolled. |
| `RadioButton` | Single-selection control for mutually exclusive options. Controlled and uncontrolled, with optional description text, disabled, and read-only states. |
| `Tabs` | Arrow-key navigation, ARIA tablist / tab / tabpanel. |
| `Modal` | Portal, focus trap, Escape to close, returns focus on dismiss. |
| `Nav` | Complete drop-in nav bar — logo slot, desktop links, actions slot, and built-in mobile hamburger + slide-out drawer. |
| `NavMenu` | Desktop-only link strip. Used inside `Nav`, also available as a primitive for custom nav bars. |
| `MobileNav` | Standalone mobile hamburger + slide-out drawer. Use with `NavMenu` when building a custom nav bar without `Nav`. |
| `NotificationBar` | Stacked dismissible banners with info / success / warning / error variants and `aria-live`. |
| `SideNav` | Grouped vertical nav with active state and keyboard navigation. |
| `SplitPanel` | Expandable bottom panel with drag-to-resize handle and keyboard resize (arrow keys). |
| `Table` | Full-featured data table. Column sorting, multi/single row selection, sticky header, column resize, column visibility, loading/empty/error states, and slots for header, filter, pagination, and footer. ARIA grid pattern with optional arrow-key cell navigation. |
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
| `CopyToClipboard` | Zero-intrusion wrapper that copies a value to the clipboard on click and shows a contextual confirmation tooltip adjacent to the trigger. |

---

## Icons

Kiln ships a built-in fill-based icon library. Import icons directly:

```tsx
import { ChevronDownIcon, CheckCircleIcon, TrashIcon } from '@doriansmith/kiln';

<ChevronDownIcon size={20} />
<CheckCircleIcon size={16} aria-label="Success" />
<TrashIcon className="my-icon" style={{ color: 'red' }} />
```

All icons accept:

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `20` | Width and height in px |
| `className` | `string` | — | CSS class |
| `style` | `CSSProperties` | — | Inline styles |
| `aria-label` | `string` | — | Makes icon visible to screen readers; omit for decorative icons |
| `aria-hidden` | `boolean` | `true` | Auto-set to `true` when no `aria-label` is provided |

### Icon catalogue

**Navigation:** `ChevronDownIcon`, `ChevronUpIcon`, `ChevronRightIcon`, `ChevronLeftIcon`, `ArrowRightIcon`, `ArrowLeftIcon`, `ArrowUpIcon`, `ArrowDownIcon`, `MenuIcon`, `AngleUpIcon`, `AngleDownIcon`, `AngleLeftIcon`, `AngleRightIcon`

**Status:** `CheckIcon`, `CheckCircleIcon`, `XIcon`, `XCircleIcon`, `InfoIcon`, `WarningIcon`, `StatusPositiveIcon`, `StatusNegativeIcon`, `StatusInfoIcon`, `StatusWarningIcon`, `StatusInProgressIcon`, `StatusPendingIcon`, `StatusStoppedIcon`, `StatusNotStartedIcon`

**Actions:** `PlusIcon`, `MinusIcon`, `TrashIcon`, `PencilIcon`, `SearchIcon`, `ExternalLinkIcon`, `CopyIcon`, `SettingsIcon`, `EyeIcon`, `EyeOffIcon`, `UploadIcon`, `DownloadIcon`, `FilterIcon`, `SortIcon`, `AnchorLinkIcon`, `CalendarIcon`, `CommandPromptIcon`, `DeleteMarkerIcon`, `DotIcon`, `EditGenAiIcon`, `EllipsisIcon`, `FlagIcon`, `GenAiIcon`, `HistoryIcon`, `RefreshIcon`, `RemoveIcon`, `RedoIcon`, `ScriptIcon`, `SearchGenAiIcon`, `SendIcon`, `ShareIcon`, `SlashIcon`, `SubtractMinusIcon`, `SuggestionsIcon`, `TicketIcon`, `UndoIcon`, `UnlockedIcon`, `UploadDownloadIcon`

**Content:** `FileIcon`, `FolderIcon`, `ImageIcon`, `CodeIcon`, `TerminalIcon`, `LinkIcon`, `BookmarkIcon`, `TagIcon`, `FileOpenIcon`, `FolderOpenIcon`

**Social:** `UserIcon`, `UsersIcon`, `BellIcon`, `StarIcon`, `HeartIcon`, `FaceSmileIcon`, `FaceNeutralIcon`, `FaceFrownIcon`, `GroupIcon`, `HeartFilledIcon`, `StarHalfIcon`, `StarFilledIcon`, `UserProfileIcon`

**Miscellaneous:** `DragHandleIcon`, `ShieldIcon`, `ZapIcon`, `SmartphoneIcon`, `GridIcon`, `ListIcon`, `KeyIcon`, `KeyboardIcon`, `LocationPinIcon`, `MapIcon`

**Theme:** `SunIcon`, `MoonIcon`, `LightDarkIcon`

**Communication:** `CallIcon`, `ContactIcon`, `EnvelopeIcon`, `GlobeIcon`, `BugIcon`, `LockPrivateIcon`, `SecurityIcon`, `AtSymbolIcon`, `MicrophoneIcon`, `MicrophoneOffIcon`

**Media:** `AudioFullIcon`, `AudioHalfIcon`, `AudioOffIcon`, `Backward10SecondsIcon`, `Forward10SecondsIcon`, `ClosedCaptionIcon`, `ClosedCaptionUnavailableIcon`, `MiniPlayerIcon`, `MultiscreenIcon`, `PauseIcon`, `PlayIcon`, `StopCircleIcon`, `TranscriptIcon`, `VideoOffIcon`, `VideoOnIcon`, `VideoUnavailableIcon`, `VideoCameraOffIcon`, `VideoCameraOnIcon`, `VideoCameraUnavailableIcon`

**UI:** `CaretDownFilledIcon`, `CaretDownIcon`, `CaretLeftFilledIcon`, `CaretRightFilledIcon`, `CaretUpFilledIcon`, `CaretUpIcon`, `ExpandIcon`, `ShrinkIcon`, `FullScreenIcon`, `ExitFullScreenIcon`, `TreeviewCollapseIcon`, `TreeviewExpandIcon`, `ZoomInIcon`, `ZoomOutIcon`, `ZoomToFitIcon`, `ResizeAreaIcon`, `ViewFullIcon`, `ViewHorizontalIcon`, `ViewVerticalIcon`, `InsertRowIcon`, `GridViewIcon`, `ListViewIcon`

---

## Nav

A complete, drop-in navigation bar. Renders a sticky `<header>` with a logo slot on the left, a desktop link strip in the centre, a right-side actions slot, and a fully accessible mobile hamburger with a focus-trapped slide-out drawer — all from a single component.

```tsx
import { Nav, ThemeToggle } from '@doriansmith/kiln';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/about', label: 'About' },
];

<Nav
  logo={<img src="/logo.png" alt="MyApp" style={{ height: 32 }} />}
  items={NAV_ITEMS}
  isActive={(href) => window.location.pathname === href}
  onNavigate={(href) => navigate(href)}
  actions={<ThemeToggle />}
/>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `logo` | `React.ReactNode` | — | Left-side brand slot |
| `items` | `NavItem[]` | `[]` | `{ href, label, icon? }` links — rendered on desktop and in the mobile drawer |
| `actions` | `React.ReactNode` | — | Right-side slot (ThemeToggle, avatar, CTAs, etc.) |
| `sticky` | `boolean` | `true` | Sticks the bar to the top of the viewport |
| `isActive` | `(href) => boolean` | pathname match | Returns `true` to mark a link active (`aria-current="page"`) |
| `onNavigate` | `(href, e) => void` | — | Called on any link click — call `e.preventDefault()` for client-side routing |
| `ariaLabel` | `string` | `'Main navigation'` | Accessible label for the nav landmark and mobile dialog |

For full control over the nav bar layout, use the lower-level [`NavMenu`](#navmenu--mobilenav) and `MobileNav` primitives instead.

---

## AppLayout

A full-page application shell — drop it in once and get sidebar, tools panel, breadcrumbs, notifications, and a sticky top bar wired up and accessible.

```tsx
import { AppLayout, Nav, SideNav, ThemeToggle } from '@doriansmith/kiln';

// SideNav manages its own open/collapse state internally
<AppLayout
  topBar={<Nav logo={logo} items={navItems} actions={<ThemeToggle />} />}
  sideBar={<SideNav groups={navGroups} activeId={activeId} onSelect={setActiveId} />}
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
| `sideBar` | Collapsible left panel — pass a `<SideNav>` that manages its own open/collapse state |
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

Override panel widths via inline `style`:

```tsx
<AppLayout
  style={{
    '--kiln-app-layout-sidebar-width': '200px',
    '--kiln-tools-panel-width': '320px',
  } as React.CSSProperties}
>
  ...
</AppLayout>
```

### Responsive behaviour

- **Desktop (≥ 768px):** sideBar and toolsPanel slide in/out without overlapping content.
- **Mobile (< 768px):** both panels become fixed overlay drawers with a backdrop. SideBar closes on Escape or backdrop click.

---

## Header

A consistent page and section heading block. Eliminates custom per-page hero layouts — use `Header` everywhere a heading is needed and spacing is automatically correct.

```tsx
import { Header, Button } from '@doriansmith/kiln';

// Page-level header with decorative brand tagline
<section aria-labelledby="page-heading">
  <Header
    id="page-heading"
    variant="h1"
    tagline="Analytics"
    description="Monitor usage, performance, and billing across all workspaces."
  >
    Dashboard
  </Header>
</section>

// Section header with inline actions
<Header
  variant="h2"
  description="Manage access for your organisation."
  actions={
    <>
      <Button variant="secondary">Export CSV</Button>
      <Button variant="primary">Add user</Button>
    </>
  }
  divider
>
  Users
</Header>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'h1' \| 'h2' \| 'h3'` | `'h2'` | Heading level and visual size. `h1` centres content for page heroes; `h2`/`h3` are left-aligned for sections. |
| `tagline` | `string` | — | Large decorative display text above the heading, rendered with the Kiln brand gradient. Hidden from assistive technology. |
| `description` | `React.ReactNode` | — | Subtitle rendered below the heading in muted text. |
| `actions` | `React.ReactNode` | — | Right-aligned slot for buttons or badges. Centres below the description for `h1`. |
| `divider` | `boolean` | `false` | Renders a hairline separator below the header block. |
| `id` | `string` | — | Forwards to the heading element — pair with `aria-labelledby` on the parent `<section>`. |
| `style` | `React.CSSProperties` | — | Use `--kiln-header-max-width` (default `1100px`) and `--kiln-header-padding-x` to customise the container. |

---

## Card — `coming-soon` variant

Pass `variant="coming-soon"` to render a self-contained "work in progress" placeholder. No children required.

```tsx
import { Card } from '@doriansmith/kiln';

// Default text
<Card variant="coming-soon" />

// Custom text
<Card
  variant="coming-soon"
  title="Under construction"
  description="This section will be ready soon."
/>
```

Use `--kiln-card-coming-soon-max-width` to override the default 440 px maximum width.

---

## NavMenu + MobileNav

Use these when `Nav`'s layout doesn't fit your design and you need to assemble your own nav bar.

**`NavMenu`** — the desktop-only link strip (a `<nav>` with styled links and active-state handling).  
**`MobileNav`** — a self-contained hamburger button + focus-trapped slide-out drawer.

```tsx
import { NavMenu, MobileNav } from '@doriansmith/kiln';

// Desktop link strip
<NavMenu
  items={NAV_ITEMS}
  isActive={(href) => location.pathname === href}
  onNavigate={(href) => navigate(href)}
/>

// Mobile hamburger + drawer
<MobileNav
  items={NAV_ITEMS}
  logo={<img src="/logo.png" alt="MyApp" style={{ height: 32 }} />}
  isActive={(href) => location.pathname === href}
  onNavigate={(href) => navigate(href)}
/>
```

For most cases, use `Nav` — it handles all of the above automatically.

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

## RadioButton

Single-selection control for mutually exclusive options. Custom-styled indicator with micro-interactions, optional description text, and full support for controlled and uncontrolled modes.

```tsx
import { RadioButton } from '@doriansmith/kiln';
import { useState } from 'react';

// Uncontrolled
<RadioButton name="size">Small</RadioButton>
<RadioButton name="size" defaultChecked>Medium</RadioButton>

// With helper description
<RadioButton name="plan" description="Unlimited projects, $12/mo" defaultChecked>
  Pro
</RadioButton>

// Controlled group
const [plan, setPlan] = useState('pro');

<RadioButton name="plan" value="starter" checked={plan === 'starter'} onChange={() => setPlan('starter')} description="Up to 3 projects, free forever">Starter</RadioButton>
<RadioButton name="plan" value="pro"     checked={plan === 'pro'}     onChange={() => setPlan('pro')}     description="Unlimited projects, $12/mo">Pro</RadioButton>
<RadioButton name="plan" value="team"    checked={plan === 'team'}    onChange={() => setPlan('team')}    description="Custom limits, contact sales">Team</RadioButton>

// Disabled / read-only
<RadioButton name="locked" disabled>Disabled</RadioButton>
<RadioButton name="locked" readOnly defaultChecked>Read-only</RadioButton>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Label text rendered beside the indicator |
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled) |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | — | Fired when the radio is selected |
| `disabled` | `boolean` | `false` | Prevents interaction and dims the control |
| `readOnly` | `boolean` | `false` | Visually normal but blocks user interaction |
| `description` | `string` | — | Helper text below the label; auto-linked via `aria-describedby` |
| `name` | `string` | — | Radio group name — required for mutual exclusion |
| `value` | `string` | — | Value submitted with the form |
| `id` | `string` | auto | Explicit id; auto-generated when omitted |
| `className` | `string` | `''` | Additional CSS classes on the root element |
| `style` | `React.CSSProperties` | — | Inline styles; use for CSS custom property overrides |

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

Collapsible right-side panel anchored to the right edge.

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

## CopyToClipboard

A zero-intrusion wrapper that copies `value` to the clipboard when any child element is clicked, then shows a small confirmation tooltip immediately adjacent to the trigger. The child element keeps full ownership of its role, `aria-label`, and keyboard handling.

```tsx
import { CopyToClipboard, Button } from '@doriansmith/kiln';

// Wrap any element — one prop is all that's required
<CopyToClipboard value="<SearchIcon />">
  <Button variant="ghost" aria-label="Copy SearchIcon import">
    <SearchIcon />
  </Button>
</CopyToClipboard>

// Tooltip placement
<CopyToClipboard value={shareUrl} placement="right" successMessage="Link copied!">
  <button type="button" aria-label="Copy share link">
    <LinkIcon size={16} />
  </button>
</CopyToClipboard>

// Inline code snippet
<CopyToClipboard value="npm install @doriansmith/kiln" placement="bottom">
  <code style={{ cursor: 'pointer' }}>npm install @doriansmith/kiln</code>
</CopyToClipboard>

// Callbacks and custom duration
<CopyToClipboard
  value={apiKey}
  placement="right"
  successMessage="API key copied!"
  duration={3000}
  onCopy={(v) => analytics.track('copy', { value: v })}
  onError={(err) => console.error(err)}
>
  <Input label="API key" value={apiKey} readOnly />
</CopyToClipboard>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | **Required.** String written to the clipboard on click. |
| `children` | `React.ReactNode` | — | **Required.** The trigger element. Retains its own role, label, and keyboard events. |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Which side of the trigger the tooltip appears on. |
| `duration` | `number` | `2000` | Milliseconds the tooltip stays visible before fading out. |
| `successMessage` | `string` | `'Copied!'` | Tooltip text after a successful clipboard write. |
| `errorMessage` | `string` | `'Failed to copy'` | Tooltip text when the write fails. |
| `onCopy` | `(value: string) => void` | — | Called with the copied value after success. |
| `onError` | `(err: unknown) => void` | — | Called with the caught error on failure. |
| `className` | `string` | — | Extra classes on the wrapper `<span>`. |

### Accessibility

- An always-mounted `role="status"` + `aria-live="polite"` region announces the result to screen readers without racing against DOM mount timing.
- The visual tooltip is marked `aria-hidden="true"` to prevent double-announcement.
- Copy is triggered via event bubbling — child buttons handle their own keyboard (`Enter` / `Space`) events naturally.

### Dark mode

The tooltip automatically inverts to a light surface when `data-theme="dark"` is set on `<html>` — no extra configuration needed.

---

## TypeScript

All props are fully typed. Named type exports:

```ts
import type {
  ButtonVariant, ButtonSize,
  CardVariant,
  BadgeVariant, BadgeSeverity, BadgeStatus, BadgeSize,
  RadioButtonProps,
  TabItem, NavItem, CodeBlockProps,
  BreadcrumbItem,
  NotificationBarItem, NotificationBarType,
  ToolsPanelProps, SplitPanelProps,
  AppLayoutBreadcrumb, AppLayoutNotification,
  CopyToClipboardProps, CopyStatus, CopyPlacement,
} from '@doriansmith/kiln';
```

No generic annotations required anywhere.

---

## Bundle size

| Artifact | Minified | Gzipped |
|---|---|---|
| `kiln.css` | ~74 KB | ~10 KB |
| `index.js` (ESM) | ~36 KB | ~13 KB |

Total gzipped: **< 26 KB**. Budget: 50 KB gzipped.

---

## Status

**v0.3.0 — Stable.** APIs are stable. The visual style is opinionated and will not change without a major version bump.

---

## Roadmap

**Future releases**
- Storybook component explorer
- GSAP-enhanced animation variants (optional peer dependency — base components remain CSS-only)
- Additional primitives: Select, Combobox, DatePicker
- Component-level token documentation

---

## License

MIT
