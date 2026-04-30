# Kiln

**Ship fast without compromise.**

An accessible, performant React component library for indie developers and small teams.
Stop rebuilding the same buttons, inputs, cards, and modals every project — drop in Kiln and ship.

[**→ Live Demo**](https://github.com/Aldentec/kiln) · [**npm**](https://www.npmjs.com/package/@doriansmith/kiln)

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

## What's included — v0.1.0

| Component | Description |
|---|---|
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
| `ThemeToggle` | Light/dark toggle, persists to `localStorage`. |
| `Footer` | Logo, link list, copyright. |
| `LoadingIndicator` | Spinner, inline or block. `aria-live` announcement. |
| `ErrorMessage` | Error display with optional retry button. |
| `ScrollToTop` | Scrolls to top on route change. Renders nothing. |
| `CodeBlock` | Styled `<pre><code>` with copy button and language label. |

---

## TypeScript

All props are fully typed. Named type exports:

```ts
import type {
  ButtonVariant, ButtonSize,
  CardVariant,
  BadgeVariant, BadgeSeverity, BadgeStatus, BadgeSize,
  TabItem,
  NavItem,
  CodeBlockProps,
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

**v0.1.0 — Initial release.** APIs are stable. The visual style is opinionated and will not change without a major version bump.

---

## Roadmap

**v0.2.0 (coming soon)**
- Storybook component explorer
- GSAP-enhanced animation variants (optional peer dependency — base components remain CSS-only)
- Additional primitives: Tooltip, Toast, Dropdown, Select, Combobox
- Component-level token documentation

---

## License

MIT
