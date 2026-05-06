# Contributing to Kiln

Thanks for your interest in contributing. Kiln is opinionated by design — read this document before opening a PR so your contribution lands cleanly.

---

## Core principles

Kiln evaluates every decision against one question: **"Does this help an indie developer ship a real product faster?"** If yes, keep it. If no, cut it.

All contributions must uphold the Four Pillars:

1. **Accessibility-first** — WCAG AA by default. Keyboard navigation, screen reader support, correct ARIA.
2. **Performance-first** — Lighthouse floor: Performance 99, Accessibility 100, SEO 100. CLS = 0 on all interactions.
3. **Mobile-first** — 44x44px touch targets, 14px minimum text, no viewport overflow at 375px.
4. **Solo-dev friendly** — no config, no providers, copy-paste ready examples.

---

## Development setup

```bash
npm install
npm test          # run all tests
npm run build     # build library
npm run dev       # start demo dev server
```

---

## Adding a component

Only add components on the approved list for the target release. Ask first if unsure.

1. Create `src/components/ComponentName/` with:
   - `ComponentName.tsx` — component
   - `ComponentName.css` — `@layer kiln`-wrapped styles
   - `ComponentName.test.tsx` — vitest + @testing-library/react tests
   - `index.ts` — re-exports
2. Export from `src/index.ts`
3. Import CSS in `src/styles/index.css`
4. Add to `demo/ComponentsPage.tsx` (alphabetical order)
5. Complete all three verification stamps before marking done:
   - `// a11y: WCAG AA verified YYYY-MM-DD`
   - `// perf: CLS=0, GPU-friendly YYYY-MM-DD`
   - `// mobile: verified 375px/768px YYYY-MM-DD`

---

## Adding an icon

Icons live in `src/icons/`. All icons must follow these rules.

### Style rules

| Rule | Value |
|---|---|
| `viewBox` | `"0 0 24 24"` |
| Color | `fill="currentColor"` — no `stroke` attributes |
| Fill rule | `fill-rule="evenodd"` for compound/cutout paths; omit for simple single paths |
| Default size | `size={20}` (set by the `createIcon` factory) |
| Accessibility | `aria-hidden="true"` by default; override with `aria-label` |
| Naming | `[Name]Icon` suffix — e.g. `TrashIcon`, not `Trash` |
| Factory | Always use `createIcon` from `src/icons/base.tsx` — never write raw `forwardRef` SVG components |

### Steps

1. Identify the correct category file:
   - `navigation.tsx` — chevrons, arrows, menus
   - `status.tsx` — check, error, warning, info, x
   - `actions.tsx` — CRUD, file ops, visibility, settings
   - `content.tsx` — file types, links, tags
   - `social.tsx` — user, notifications, reactions
   - `misc.tsx` — drag, grid, shield, phone, zap
   - `theme.tsx` — sun, moon
2. Add a `createIcon(...)` call following the style rules.
3. Export from the category file (already barrel-exported via `export *` in `index.ts`).
4. Add a new category file to `src/icons/index.ts` if creating a new group.
5. Verify the icon renders correctly at `size={16}`, `size={20}`, and `size={24}`.

### Converting a stroke icon to fill

Stroke-based SVGs must be redrawn as filled paths before being added to the library. The path data will differ — you cannot simply remove `stroke` and add `fill`. Use a design tool or hand-edit the path to produce a filled shape that matches the intent of the stroke version.

---

## CSS conventions

- All rules inside `@layer kiln { ... }`
- `@keyframes` and `@property` declarations **outside** the layer (browser requirement)
- Colors via design tokens only — no hardcoded hex values
- Component-level tokens documented at the top of each `.css` file
- `prefers-reduced-motion: reduce` override required for every animation
- Dark mode via `[data-theme="dark"] .kiln-*` inside the layer

---

## Tests

Every component needs tests covering:
- All variants and states
- Keyboard interactions (Tab, Enter, Space, arrows, Escape)
- Controlled and uncontrolled modes where applicable
- ARIA attributes
- Error and loading states

Run tests with:

```bash
npm test
npm run test:watch
```

---

## Pull requests

- One concern per PR
- Pass `npm test` and `npx tsc --noEmit` before opening
- Verify Lighthouse scores against `localhost:4173` (production preview), not the dev server
- Reference the issue number if applicable

---

## What we will not merge

- Components not on the approved release list (ask first)
- Stroke-based icons (must be fill-based)
- Hardcoded hex colors in CSS
- New JavaScript animation dependencies
- Accessibility regressions (any WCAG AA failure)
- Lighthouse regressions (Performance < 99, Accessibility < 100, SEO < 100)
- Unverified mobile behavior at 375px
