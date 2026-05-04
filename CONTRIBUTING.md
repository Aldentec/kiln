# Contributing to Kiln

Thanks for your interest in contributing. Kiln is a small, opinionated
design system built for indie devs and small teams. Contributions are
welcome as long as they align with the three core pillars:

1. Accessibility first — WCAG AA, always
2. Performance first — Lighthouse scores are a floor, not a target
3. Solo dev friendly — keep setup simple, APIs obvious

---

## Before you open a PR

Check the open issues first to see if someone is already working on
what you have in mind. If you are proposing a new component or a
significant change, open an issue to discuss it before writing code.
Kiln is intentionally minimal. Not every component belongs here.

---

## Setup

You will need Node.js 18+ and npm.

```bash
git clone https://github.com/Aldentec/kiln.git
cd kiln
npm install
```

Run the demo app locally to preview components:

```bash
npm run dev
```

Build the library:

```bash
npm run build
```

Run tests:

```bash
npm test
```

---

## Adding a component

Every component lives in `src/components/ComponentName/` and must include:

- `ComponentName.tsx` — the React component
- `ComponentName.css` — scoped styles using `--kiln-*` tokens
- `ComponentName.test.tsx` — tests with vitest and @testing-library/react
- `index.ts` — barrel export

Export it from `src/index.ts` and register it on the demo page in `demo/`.

### Class naming

All classes use the `kiln-` prefix in BEM-ish style:

`
.kiln-button
.kiln-button--primary
.kiln-button--lg
.kiln-button__icon
`
### Tokens

Use only existing `--kiln-*` tokens from `src/styles/design-tokens.css`.
Do not introduce new colors, gradients, spacing values, or easing curves.
If a token is genuinely missing, open an issue to discuss adding it first.

---

## Accessibility checklist

Every component must pass this before merging:

- [ ] Keyboard navigable (Tab, Shift+Tab, Enter, Space, arrow keys, Escape where appropriate)
- [ ] Visible focus ring using `--kiln-focus-ring` token
- [ ] Correct ARIA roles, labels, and states
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI elements)
- [ ] Works correctly at 200% browser zoom
- [ ] Interactive elements meet 44x44px touch target size

---

## Performance checklist

Every component must pass this before merging:

- [ ] Zero layout shift (CLS = 0) on mount and all interactions
- [ ] Animations use only `transform` and `opacity`
- [ ] No JavaScript animation libraries imported
- [ ] No new npm dependencies introduced without discussion
- [ ] CSS is scoped — no accidental global style bleed

---

## What Kiln will not accept

- New npm dependencies (zero dependencies is a core guarantee)
- Components that duplicate what CSS handles natively
- Theming APIs or token overrides beyond what already exists
- GSAP or any animation library (deferred to v0.2.0 as optional)
- Storybook (deferred to v0.2.0)
- Components that fail the accessibility or performance checklists above

If you are unsure whether something belongs in Kiln, open an issue and ask.

---

## Submitting a PR

- Keep PRs focused. One component or one fix per PR.
- Include a screenshot or screen recording for visual changes.
- Make sure `npm run build` and `npm test` pass before submitting.
- Write a clear PR description explaining what changed and why.

---

## License

By contributing to Kiln you agree that your contributions will be
licensed under the MIT License.
