# Kiln Design System — Claude Development Guide

Kiln is a React + TypeScript component library (`@doriansmith/kiln`) with a CSS-first, token-driven design system. This document is the authoritative guide for developing and extending it.

---

## Project Structure

```
src/
  components/         One folder per component (ComponentName/ComponentName.tsx + .css + .test.tsx)
  styles/             Global tokens (index.css), reset, animations
  utils/              cn(), Slot, polymorphic types
  index.ts            Public barrel — re-exports everything consumers need
```

---

## Token Architecture (Three Tiers)

All design decisions flow through CSS custom properties in three layers:

### Tier 1 — Primitives (`src/styles/tokens.css`)
Raw values. Never used directly in components.
```css
--kiln-gray-500: #64748b;
--kiln-radius-lg: 0.5rem;
```

### Tier 2 — Semantic (`src/styles/tokens.css`)
Meaning-mapped aliases. Used sparingly; prefer component tokens.
```css
--kiln-primary: #89216b;
--kiln-surface-raised: #ffffff;
```

### Tier 3 — Component tokens (top of each component's `.css` file)
Per-component overrides. These are the customisation surface for consumers.
```css
/* In Button.css */
--kiln-button-radius      /* overrides border-radius */
--kiln-button-font-weight /* overrides font weight */
```

**Rule**: Components always fall back to semantic → primitive:
```css
border-radius: var(--kiln-button-radius, var(--kiln-radius-lg));
```

Consumers customise a single instance inline, no CSS selectors needed:
```tsx
<Button style={{ '--kiln-button-radius': '2px' } as React.CSSProperties}>
  Square Button
</Button>
```

---

## CSS Layer Pattern

Every component CSS file must wrap its rules in `@layer kiln`. Keyframes and `@property` declarations go **outside** the layer (they must be top-level).

```css
/* @property — must be top-level, not inside @layer */
@property --kiln-field-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

/* Keyframes — outside layer for global accessibility */
@keyframes kiln-component-name {
  from { ... }
  to   { ... }
}

/* Component token documentation comment */
/* ─── Component tokens ───────────────────────────────────
   --kiln-component-radius   border-radius (default: --kiln-radius-xl)
   --kiln-component-bg       background    (default: --kiln-surface-raised)
─────────────────────────────────────────────────────────── */

@layer kiln {

.kiln-component { ... }

/* Dark mode inside @layer */
[data-theme="dark"] .kiln-component { ... }

/* Reduced motion inside @layer */
@media (prefers-reduced-motion: reduce) {
  .kiln-component { animation: none !important; }
}

} /* end @layer kiln */
```

The `@layer kiln;` order declaration is set once in `src/styles/index.css`. Un-layered consumer CSS automatically wins without `!important`.

---

## Class Merging — `cn()`

Always use `cn()` from `../../utils` for building `className` strings. Never use `.filter(Boolean).join(' ')` or template literals.

```tsx
import { cn } from '../../utils';

// Conditional class
cn('kiln-chip', selected && 'kiln-chip--selected', className)

// Dynamic variant
cn('kiln-badge', `kiln-badge--${variant}`, `kiln-badge--${size}`, className)
```

`cn()` wraps `clsx`. It handles: falsy values, arrays, nested arrays, objects (`{ 'class': condition }`).

---

## Composition — `Slot` and `asChild`

The `Slot` component merges its props onto its single child element. Use `asChild` when a component should render as the child element rather than its default tag.

```tsx
import { Slot } from '../../utils';

// In Button.tsx
if (asChild) {
  return <Slot ref={ref} className={classes} {...rest}>{children}</Slot>;
}
```

Consumer usage — renders an `<a>` tag with all Button styles and behaviour:
```tsx
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

`Slot` merges:
- `className`: concatenated
- `style`: shallow merged (child wins on conflict)
- Event handlers: chained (slot handler runs first, then child handler)
- `ref`: merged with `mergeRefs`

---

## Naming Conventions

| Thing | Pattern | Example |
|-------|---------|---------|
| Component class | `kiln-[component]` | `kiln-button` |
| Variant modifier | `kiln-[component]--[variant]` | `kiln-button--primary` |
| Child element | `kiln-[component]__[part]` | `kiln-button__spinner` |
| Component token | `--kiln-[component]-[property]` | `--kiln-button-radius` |
| Keyframe | `kiln-[component]-[name]` | `kiln-button-pop` |
| TypeScript props type | `[Component]Props` | `ButtonProps` |
| Variant union type | `[Component]Variant` | `ButtonVariant` |

---

## Adding a New Component

1. Create `src/components/ComponentName/` with three files:
   - `ComponentName.tsx` — React component
   - `ComponentName.css` — styles (wrapped in `@layer kiln`)
   - `ComponentName.test.tsx` — Vitest + Testing Library tests

2. Create `src/components/ComponentName/index.ts`:
   ```ts
   export { default } from './ComponentName';
   export type { ComponentNameProps } from './ComponentName';
   ```

3. Export from `src/index.ts`:
   ```ts
   export { default as ComponentName } from './components/ComponentName';
   export type { ComponentNameProps } from './components/ComponentName';
   ```

4. Component template:
   ```tsx
   import React from 'react';
   import { cn } from '../../utils';
   import './ComponentName.css';

   export interface ComponentNameProps {
     variant?: 'default' | 'other';
     className?: string;
     children: React.ReactNode;
   }

   const ComponentName: React.FC<ComponentNameProps> = ({
     variant = 'default',
     className,
     children,
   }) => (
     <div className={cn('kiln-component-name', `kiln-component-name--${variant}`, className)}>
       {children}
     </div>
   );

   export default ComponentName;
   ```

5. CSS template:
   ```css
   /* ─── Component tokens ───────────────────────────────────
      --kiln-component-name-radius  border-radius (default: --kiln-radius-md)
   ─────────────────────────────────────────────────────────── */

   @layer kiln {

   .kiln-component-name {
     border-radius: var(--kiln-component-name-radius, var(--kiln-radius-md));
   }

   [data-theme="dark"] .kiln-component-name { ... }

   @media (prefers-reduced-motion: reduce) {
     .kiln-component-name { animation: none !important; }
   }

   } /* end @layer kiln */
   ```

---

## Controlled vs Uncontrolled Components

Interactive components (Chip, Tabs) support both patterns via the convention:
- `value` / `selected` = controlled prop
- `defaultValue` / `defaultSelected` = uncontrolled initial value

Internal state is only used when the controlled prop is `undefined`.

```tsx
const isSelected = controlledSelected ?? internalSelected;
```

---

## Accessibility Requirements

Every component must:
- Support keyboard navigation (Enter/Space for buttons, arrow keys for Tabs)
- Have correct ARIA roles (`role="tab"`, `role="checkbox"`, `role="dialog"`)
- Use `aria-label` or `aria-labelledby` when there's no visible label
- Set `aria-disabled` when using `href` (cannot use HTML `disabled` on anchors)
- Use `focus-visible` for focus rings, not `:focus` (avoids click outlines)
- Export a `className` prop for consumer overrides

---

## Dark Mode

Dark mode is toggled by `data-theme="dark"` on `<html>`. Apply overrides inside `@layer kiln`:
```css
[data-theme="dark"] .kiln-component { ... }
```

The `ThemeToggle` component manages this attribute and persists to `localStorage`.

---

## Testing

Tests live alongside components as `ComponentName.test.tsx`. Use Vitest + `@testing-library/react`.

Run tests: `npm test`
Run once: `npm run test:run`
Coverage: `npm run coverage`

Test requirements:
- Cover all variants
- Test keyboard interactions for interactive components
- Test both controlled and uncontrolled modes where applicable
- Test ARIA attributes

---

## Build & Publish

```bash
npm run build       # tsup — outputs to dist/
npm run typecheck   # tsc --noEmit
npm test            # vitest
npm publish         # bumps version in package.json first
```

Entry points (configured in `package.json`):
- `main`: `dist/index.js` (CommonJS)
- `module`: `dist/index.mjs` (ESM)
- `types`: `dist/index.d.ts`
- `exports["./styles"]`: `dist/styles.css`

Consumers import styles once at their app root:
```ts
import '@doriansmith/kiln/styles';
```

---

## Animation Principles

- Animations use CSS custom properties registered via `@property` for animatable values
- Keyframes are defined outside `@layer kiln` for global accessibility
- All animations must have a `prefers-reduced-motion: reduce` override that disables them
- Prefer `transform` and `opacity` for performance (no layout thrashing)
- Easing variables: `--kiln-ease-out`, `--kiln-ease-spring`, `--kiln-ease-in-out`
- Duration variables: `--kiln-duration-fast` (150ms), `--kiln-duration-normal` (250ms), `--kiln-duration-slow` (400ms)

---

## Common Pitfalls

- **Never put `@property` inside `@layer`** — browser support requires it at the top level
- **Never put `@keyframes` inside `@layer`** — move them above the layer declaration
- **Never hardcode colour hex values** in new components — use tokens
- **Never write `.filter(Boolean).join(' ')`** — use `cn()` instead
- **Never add `!important`** except in reduced-motion overrides
- **Never skip the `className` prop** — consumers always need an escape hatch
