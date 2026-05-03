# Kiln — Claude Development Guide

**Tagline:** "Kiln — Ship fast without compromise."

Kiln is a React + TypeScript component library (`@doriansmith/kiln`) with a CSS-first, token-driven design system. Built by Dorian Smith for his own projects and shared publicly for indie developers and small teams who need production-ready primitives without the overhead of Chakra/MUI.

Read this entire file before making any changes. It is the source of truth for Kiln's identity and conventions.

---

## The North Star

Every decision in this codebase is evaluated against one question:
**"Does this help an indie developer ship a real product faster?"**
If yes, keep it. If no, cut it.

---

## The Four Pillars (non-negotiable)

### 1. Accessibility-first
Every component meets **WCAG AA** by default. Keyboard navigation, screen reader support, focus management, and correct ARIA are built in — not bolted on. This is a contract with users, not a nice-to-have. Accessibility-first IS ship-fast: accessibility debt costs more to fix later than to build correctly now.

Requirements per component:
- Keyboard navigation: Tab, Shift+Tab, Enter, Space, arrow keys where applicable, Escape to close overlays
- Visible focus rings using `:focus-visible` on all interactive elements
- Correct ARIA: `role`, `aria-label`, `aria-expanded`, `aria-selected`, `aria-disabled`, `aria-describedby`, `aria-live` where appropriate
- Color contrast: 4.5:1 for normal text, 3:1 for large text and UI components, in both light and dark themes
- Disabled states: announce via `aria-disabled`, not just `disabled` on non-button elements (anchors)
- Form labels: linked via `htmlFor` / `id`. `errorText` and `helperText` linked via `aria-describedby`

### 2. Performance-first (Lighthouse-optimized)
Kiln components do not tank Lighthouse scores. The production site currently scores:

| Metric | Score |
|---|---|
| Performance | **99** |
| Accessibility | **100** |
| Best Practices | **96** |
| SEO | **100** |
| FCP / LCP | **0.6s / 0.6s** |
| TBT | **0 ms** |
| CLS | **0.005** |

**These are floors, not targets.** No PR or new component may regress any of them. Verify with `npm run build:site && npm run preview` then run Lighthouse against `localhost:4173` — never against the dev server (`:5173`), which gives misleading numbers due to unminified output and the HMR WebSocket blocking bfcache.

Per-component requirements:
- **CLS = 0** on all interactions (mount, hover, focus, state change, loading, error)
- All animations use **only `transform` and `opacity`** — GPU-accelerated, no layout thrashing
- No JavaScript animation libraries in the base library (GSAP is v0.2.0)
- `will-change` used sparingly — only where genuinely needed
- Bundle size is measured, published, and budgeted (target: < 50 KB gzipped total)
- No forced reflows — never read layout geometry (`offsetWidth`, `clientWidth`, `innerWidth`, etc.) after a DOM write. Use CSS (`scrollbar-gutter`, `aspect-ratio`) to eliminate JS measurement
- Heavy dependencies (e.g. syntax highlighters) must be behind dynamic `import()` and lazy-loaded via `React.lazy` at the call site so they never land on the critical request chain

### 3. Solo-dev / small-team friendly
- Install: `npm install @doriansmith/kiln`
- Import CSS once: `import '@doriansmith/kiln/kiln.css'`
- Dark mode: `data-theme="dark"` on `<html>`. That's it.
- No config files, no setup wizards, no theme providers, no context wrappers
- TypeScript fully inferred — no required generic annotations
- Every doc example is copy-paste ready

### 4. Mobile-first (mandatory, not optional)
Every component must work correctly on real devices at 375px, 768px, and 1280px. Specifically:
- **Touch targets**: every interactive element is **≥ 44×44px** (WCAG 2.5.5). This applies to buttons, chips, tabs, close buttons, toggle switches, dropdown items — everything tappable.
- **iOS zoom prevention**: `<input>` and `<textarea>` elements must have `font-size ≥ 16px` on mobile (`max(1rem, ...)`) to prevent iOS Safari from auto-zooming on focus.
- **Readable text**: no text below **14px** on mobile. Metadata, labels, helper text — all must meet this floor. Use `@media (max-width: 768px)` overrides where needed.
- **Overflow prevention**: no component may cause horizontal scroll on a 375px viewport. Use `max-width: 100%`, `box-sizing: border-box`, `overflow-x: auto` on code blocks.
- **Positioned overlays** (Tooltip, Dropdown, Modal): must not overflow the viewport. Use `max-width: calc(100vw - 2rem)` or similar. Modals become bottom-sheets on mobile (≤480px).
- **`prefers-reduced-motion`**: already required — applies on mobile too.
- Responsive text: use `clamp()` for hero headings. Never use `vw` units for font-size without a `min` floor.

**Enforcement**: The mobile checklist is part of the component verification comment:
```
// mobile: verified 375px/768px YYYY-MM-DD
```
Add this alongside the `// a11y:` and `// perf:` stamps when a component is verified.

---

## Scope Discipline — What Kiln Is and Is Not

**Kiln IS:**
- The primitives listed in the v0.1.0 component list below. Nothing more for this release.
- Opinionated. Visual choices are made for the user. The lifted ClickStorm aesthetic is deliberate.
- Stable. v0.1.0 APIs are locked unless there is a strong justification for a breaking change.

**Kiln is NOT:**
- A Chakra/MUI replacement. We do not ship 80 components.
- A theming framework. One visual style. Future versions may expose token overrides, but the core aesthetic stays opinionated.
- A headless component library. Kiln is styled. Use Radix or Headless UI for unstyled primitives.
- An animation framework. Animations are minimal and CSS-only in v0.1.0.

---

## v0.1.0 Component List (locked)

Button, Input, Textarea, Card, Badge, Chip, Tabs, Modal,
Nav, NavMenu, MobileNav, ThemeToggle, Footer, LoadingIndicator,
ErrorMessage, ScrollToTop, CodeBlock

Do not add new components in v0.1.0 sessions. If a component is genuinely needed and not in this list, flag it and ask before proceeding.

---

## Decision Log (locked decisions — do not relitigate)

| Decision | Rationale |
|---|---|
| GSAP deferred to v0.2.0 | Optional peer dependency when added; base components remain CSS-only forever |
| Storybook deferred to v0.2.0 | Not needed for v0.1.0 |
| No additional components beyond v0.1.0 list | Scope discipline is a feature |
| Visual values from token system only | No hardcoded hex values in new component CSS; no new colors or gradients not already in `design-tokens.css` |
| Accessibility = WCAG AA | Verified per-component, documented with `// a11y: WCAG AA verified YYYY-MM-DD` |
| Performance = CLS=0, GPU-friendly | Verified per-component, documented with `// perf: CLS=0, GPU-friendly YYYY-MM-DD` |
| Mobile = mandatory fourth pillar | 44px touch targets, iOS zoom prevention, 14px text floor, no viewport overflow. Verified with `// mobile: verified 375px/768px YYYY-MM-DD` |
| CSS import path is `@doriansmith/kiln/kiln.css` | Per `exports` field in `package.json`; not `/dist/kiln.css` |
| Hash-based routing in demo | No router dependency; `useRouter.ts` in `demo/` handles `#/components` vs landing |
| `Card` accepts `style` prop | Needed for CSS custom property overrides (e.g. `--kiln-card-padding`); backward-compatible |
| `CodeBlock` is a v0.1.0 primitive | Needed by the landing page and any consumer building docs; genuinely reusable |
| Components listed alphabetically in demo and ToC | Predictable, consistent — new components must be inserted at their alphabetical position in both `TOC_ITEMS` and the JSX section order in `ComponentsPage.tsx` |
| Lighthouse scores are a floor (Perf 99 / A11y 100 / SEO 100) | Achieved 2026-05-03. No component or demo change may regress these. Verify against production preview (`localhost:4173`), never the dev server |
| `scrollbar-gutter: stable` on `html` instead of JS scrollbar measurement | Eliminates forced reflow from `window.innerWidth - clientWidth` reads. Nav scroll-lock uses only `overflow: hidden` |
| Heavy deps (highlight.js) behind `React.lazy` + dynamic `import()` | Keeps them off the critical request chain. CodeBlock is lazy-loaded at call sites in the demo |

---

## Project Structure

```
src/
  components/       One folder per component:
                      ComponentName.tsx     — React component
                      ComponentName.css     — styles (@layer kiln)
                      ComponentName.test.tsx — vitest + @testing-library/react
                      index.ts              — re-exports
  styles/
    design-tokens.css — CSS custom properties (:root and [data-theme="dark"])
    animations.css    — shared keyframes (outside @layer)
    index.css         — import order: tokens → animations → components
  utils/            cn() (wraps clsx), Slot (merges props onto child), polymorphic types
  index.ts          Public barrel — all consumer-facing exports

demo/
  App.tsx           — router shell
  LandingPage.tsx   — landing page (uses only Kiln primitives)
  ComponentsPage.tsx — component showcase
  useRouter.ts      — hash-based router, no dependencies
  main.tsx          — entry point, imports src/styles/index.css
  index.html        — HTML shell, Space Grotesk font link
```

---

## Token Architecture (Three Tiers)

All design decisions flow through CSS custom properties in three layers:

### Tier 1 — Primitives (`design-tokens.css`)
Raw values. Never used directly in components.
```css
--kiln-gray-500: #64748b;
--kiln-radius-lg: 0.5rem;
```

### Tier 2 — Semantic (`design-tokens.css`)
Meaning-mapped aliases. Used sparingly; prefer component tokens.
```css
--kiln-primary: #89216b;
--kiln-surface-raised: #ffffff;
```

### Tier 3 — Component tokens (top of each `.css` file)
Per-component overrides. The customization surface for consumers.
```css
/* In Button.css — consumers can override per-instance via inline style */
--kiln-button-radius      /* border-radius, defaults to --kiln-radius-lg */
--kiln-button-font-weight /* font weight */
```

Components always fall back through the tier chain:
```css
border-radius: var(--kiln-button-radius, var(--kiln-radius-lg));
```

---

## CSS Layer Pattern

Every component CSS file wraps rules in `@layer kiln`. Keyframes and `@property` go **outside** the layer (browser requirement).

```css
/* @property — top-level only */
@property --kiln-field-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

/* Keyframes — outside layer */
@keyframes kiln-component-name { ... }

/* Component token documentation */
/* ─── Component tokens ─────────────────────────────────────
   --kiln-component-radius   border-radius (default: --kiln-radius-xl)
─────────────────────────────────────────────────────────── */

@layer kiln {
  .kiln-component { ... }
  [data-theme="dark"] .kiln-component { ... }
  @media (prefers-reduced-motion: reduce) {
    .kiln-component { animation: none !important; }
  }
} /* end @layer kiln */
```

Un-layered consumer CSS wins automatically — no `!important` needed.

---

## Naming Conventions

| Thing | Pattern | Example |
|---|---|---|
| Component class | `kiln-[component]` | `kiln-button` |
| Variant modifier | `kiln-[component]--[variant]` | `kiln-button--primary` |
| Child element | `kiln-[component]__[part]` | `kiln-button__spinner` |
| Component token | `--kiln-[component]-[property]` | `--kiln-button-radius` |
| Keyframe | `kiln-[component]-[name]` | `kiln-button-pop` |
| TypeScript props type | `[Component]Props` | `ButtonProps` |
| Variant union type | `[Component]Variant` | `ButtonVariant` |

Always use `cn()` from `../../utils` for class strings. Never use `.filter(Boolean).join(' ')` or template literals.

---

## Class Merging — `cn()`

```tsx
import { cn } from '../../utils';

cn('kiln-chip', selected && 'kiln-chip--selected', className)
cn('kiln-badge', `kiln-badge--${variant}`, `kiln-badge--${size}`, className)
```

---

## Composition — `Slot` and `asChild`

`Slot` merges its props onto its single child element. Use `asChild` to render a component as the child element instead of its default tag.

```tsx
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

`Slot` merges: `className` (concatenated), `style` (shallow merge, child wins), event handlers (chained, slot first), `ref` (merged).

---

## Controlled vs Uncontrolled

Interactive components support both patterns:
- `value` / `selected` = controlled prop
- `defaultValue` / `defaultSelected` = uncontrolled initial value

Internal state is only used when the controlled prop is `undefined`:
```tsx
const isSelected = controlledSelected ?? internalSelected;
```

---

## Dark Mode

Toggle via `data-theme="dark"` on `<html>`. Apply overrides inside `@layer kiln`:
```css
[data-theme="dark"] .kiln-component { ... }
```

`ThemeToggle` manages this attribute and persists to `localStorage`.

---

## Animation Principles

- Use `transform` and `opacity` only — GPU-accelerated, no layout thrashing
- Register animatable custom properties via `@property` at top level (not inside `@layer`)
- Keyframes go outside `@layer`
- Every animation must have a `prefers-reduced-motion: reduce` override (`animation: none !important`)
- Easing tokens: `--kiln-ease-out`, `--kiln-ease-spring`, `--kiln-ease-in-out`, `--kiln-ease-bounce`
- Duration tokens: `--kiln-duration-fast` (250ms), `--kiln-duration-normal` (380ms), `--kiln-duration-slow` (500ms)

---

## Adding a New Component (when the time comes)

Only add components that are on the approved list for the target release. Flag any out-of-scope requests before proceeding.

1. Create `src/components/ComponentName/` with:
   - `ComponentName.tsx` — component (see template below)
   - `ComponentName.css` — styles wrapped in `@layer kiln`
   - `ComponentName.test.tsx` — vitest + @testing-library/react tests
   - `index.ts` — re-exports

2. Export from `src/index.ts`

3. Import CSS in `src/styles/index.css`

4. Add to `demo/ComponentsPage.tsx`

5. Accessibility checklist before marking verified:
   - [ ] Keyboard navigation (Tab, Enter, Space, arrows, Escape where appropriate)
   - [ ] Visible `:focus-visible` focus ring
   - [ ] Correct ARIA attributes
   - [ ] Color contrast 4.5:1 (text) / 3:1 (UI) in both themes
   - [ ] Screen reader announces state changes
   - [ ] Add `// a11y: WCAG AA verified YYYY-MM-DD` at top of component file

6. Performance checklist before marking verified:
   - [ ] CLS = 0 on mount and all interactions
   - [ ] Animations use only `transform` / `opacity`
   - [ ] No JS animation libraries imported
   - [ ] `prefers-reduced-motion` override present
   - [ ] Add `// perf: CLS=0, GPU-friendly YYYY-MM-DD` at top of component file

7. Mobile checklist before marking verified:
   - [ ] All interactive elements ≥ 44×44px touch target
   - [ ] `<input>`/`<textarea>` use `font-size: max(1rem, ...)` on mobile (iOS zoom)
   - [ ] No text below 14px on mobile
   - [ ] No horizontal overflow at 375px viewport
   - [ ] Positioned overlays (tooltip, dropdown) constrained to viewport
   - [ ] Modals use bottom-sheet layout at ≤480px
   - [ ] Tested at 375px, 768px, 1280px
   - [ ] Add `// mobile: verified 375px/768px YYYY-MM-DD` at top of component file

8. Lighthouse score verification (mandatory before merging):
   - [ ] Run `npm run build:site && npm run preview`
   - [ ] Open Lighthouse against `localhost:4173` (production preview — NOT the dev server)
   - [ ] Performance ≥ 99, Accessibility = 100, SEO = 100
   - [ ] No new forced reflow warnings in the Insights panel
   - [ ] No new entries in the Network dependency tree critical chain

**Component template:**
```tsx
// a11y: WCAG AA verified YYYY-MM-DD
// perf: CLS=0, GPU-friendly YYYY-MM-DD
import React from 'react';
import { cn } from '../../utils';
import './ComponentName.css';

export interface ComponentNameProps {
  variant?: 'default' | 'other';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(({
  variant = 'default',
  className,
  style,
  children,
}, ref) => (
  <div
    ref={ref}
    className={cn('kiln-component-name', `kiln-component-name--${variant}`, className)}
    style={style}
  >
    {children}
  </div>
));

ComponentName.displayName = 'ComponentName';
export default ComponentName;
```

---

## Testing

```bash
npm test          # vitest run (once)
npm run test:watch # vitest watch
```

Test requirements per component:
- Cover all variants and states
- Test keyboard interactions for interactive components
- Test both controlled and uncontrolled modes where applicable
- Test ARIA attributes
- Test error states and loading states

---

## Build & Publish

```bash
npm run build       # tsup → ESM + CJS + d.ts + CSS bundle in dist/
npm run typecheck   # tsc --noEmit (library)
npx tsc --project tsconfig.demo.json --noEmit  # type-check demo app
npm test            # run all tests before publishing
npm publish         # bump version in package.json first
```

Entry points:
- `exports["."]` → `dist/index.js` (ESM) / `dist/index.cjs` (CJS) / `dist/index.d.ts` (types)
- `exports["./kiln.css"]` → `dist/kiln.css`

Consumers import CSS as: `import '@doriansmith/kiln/kiln.css'` — NOT `/dist/kiln.css`.

---

## The `clickstorm-frontend` Folder

Read-only reference material. Gitignored. Npmignored. Never modify it, never vendor from it, never import from it. It exists only as a visual/design reference for the ClickStorm aesthetic that Kiln is based on.

---

## Common Pitfalls

- **Never put `@property` inside `@layer`** — browser spec requires top-level
- **Never put `@keyframes` inside `@layer`** — move above the layer declaration
- **Never hardcode color hex values** in new component CSS — use tokens
- **Never write `.filter(Boolean).join(' ')`** — use `cn()`
- **Never add `!important`** except in `prefers-reduced-motion` overrides
- **Never skip the `className` prop** — consumers always need an escape hatch
- **Never skip the `style` prop** on new components — needed for CSS custom property overrides
- **Never use `#/components` as a real URL** in non-demo code — the hash router is demo-only
