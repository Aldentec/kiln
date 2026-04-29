# @doriansmith/kiln

A React + TypeScript design system with dark-mode support, accessible primitives, and a single CSS bundle.

## Install

```bash
npm install @doriansmith/kiln
```

Peer dependencies (already in your project):

```bash
npm install react react-dom
```

## Import CSS

In your app entry point (e.g. `main.tsx`):

```ts
import '@doriansmith/kiln/kiln.css';
```

## Dark mode

Kiln uses a `data-theme` attribute on `<html>`. Toggle it at runtime:

```ts
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.removeAttribute('data-theme'); // back to light
```

Or use the built-in `ThemeToggle` component, which handles persistence via `localStorage`.

---

## Components

### Button

```tsx
import { Button } from '@doriansmith/kiln';

<Button variant="primary" size="md" onClick={() => {}}>Save</Button>
<Button variant="secondary" href="/docs">Docs</Button>
<Button variant="danger" loading>Deleting…</Button>
```

Props: `variant` (`primary` | `secondary` | `ghost` | `danger`), `size` (`sm` | `md` | `lg`), `loading`, `disabled`, `leftIcon`, `rightIcon`, `href` (renders `<a>`).

---

### Input

```tsx
import { Input } from '@doriansmith/kiln';

<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Username" errorText="Already taken" />
<Input label="Search" leftIcon={<SearchIcon />} />
```

Props: `label`, `errorText` (auto-sets error variant + `aria-invalid`), `variant` (`default` | `error` | `success`), `leftIcon`, `rightIcon`.

---

### Textarea

```tsx
import { Textarea } from '@doriansmith/kiln';

<Textarea label="Bio" rows={4} placeholder="Tell us about yourself" />
<Textarea label="Comment" showCharCount maxLength={280} />
<Textarea label="Notes" errorText="Required" />
```

Props: `label`, `errorText`, `showCharCount`, `maxLength`, `rows`.

---

### Card

```tsx
import { Card } from '@doriansmith/kiln';

<Card variant="raised">Content</Card>
<Card variant="glass">Content</Card>
<Card variant="gradient-border">Content</Card>
<Card as="article" onClick={() => {}}>Clickable card</Card>
```

Props: `variant` (`default` | `raised` | `glass` | `gradient-border`), `as` (any HTML element tag), `onClick`.

---

### Badge

```tsx
import { Badge } from '@doriansmith/kiln';

<Badge color="blue" size="md">New</Badge>
<Badge color="red" variant="status">Error</Badge>
```

Props: `color` (`blue` | `green` | `red` | `yellow` | `purple` | `neutral`), `variant` (`severity` | `status`), `size` (`sm` | `md`).

---

### Chip

```tsx
import { Chip } from '@doriansmith/kiln';

<Chip onToggle={(selected) => console.log(selected)}>React</Chip>
<Chip defaultSelected onToggle={() => {}}>TypeScript</Chip>
```

Props: `defaultSelected`, `selected` (controlled), `onToggle(selected: boolean)`, `disabled`.

---

### Tabs

```tsx
import { Tabs } from '@doriansmith/kiln';

const items = [
  { value: 'overview', label: 'Overview' },
  { value: 'details',  label: 'Details' },
  { value: 'history',  label: 'History', disabled: true },
];

// Uncontrolled
<Tabs items={items} defaultValue="overview" />

// Controlled
const [tab, setTab] = useState('overview');
<Tabs items={items} value={tab} onChange={setTab} />
```

Props: `items` (`{ value, label, disabled? }[]`), `value`, `defaultValue`, `onChange`. Supports arrow-key navigation.

---

### Modal

```tsx
import { Modal } from '@doriansmith/kiln';

<Modal open={isOpen} onClose={() => setOpen(false)} title="Confirm">
  Are you sure?
</Modal>
```

Props: `open`, `onClose`, `title`, `size` (`sm` | `md` | `lg` | `xl`). Renders via portal, traps focus, closes on Escape or backdrop click.

---

### ThemeToggle

```tsx
import { ThemeToggle } from '@doriansmith/kiln';

<ThemeToggle />
<ThemeToggle defaultTheme="dark" storageKey="my-theme" />
```

Props: `defaultTheme` (`light` | `dark`), `storageKey` (default: `kiln-theme`).

---

### NavMenu

```tsx
import { NavMenu } from '@doriansmith/kiln';

const items = [
  { href: '/',       label: 'Home' },
  { href: '/about',  label: 'About' },
];

<NavMenu
  items={items}
  isActive={(href) => location.pathname === href}
  onNavigate={(href, e) => { e.preventDefault(); router.push(href); }}
/>
```

Props: `items` (`{ href, label }[]`), `isActive(href) => boolean`, `onNavigate(href, event) => void`, `ariaLabel`.

---

### MobileNav

```tsx
import { MobileNav } from '@doriansmith/kiln';

<MobileNav
  items={navItems}
  logo={<img src="/logo.svg" alt="My App" />}
  footer={<span>v1.0.0</span>}
  isActive={(href) => location.pathname === href}
  onNavigate={(href, e) => { e.preventDefault(); router.push(href); }}
/>
```

Props: `items`, `logo` (ReactNode), `footer` (ReactNode), `isActive`, `onNavigate`. Manages open/close state internally; traps focus when open.

---

### Footer

```tsx
import { Footer } from '@doriansmith/kiln';

<Footer
  logo={<img src="/logo.svg" alt="My App" />}
  links={[
    { href: 'https://github.com/example', label: 'GitHub' },
    { href: '/privacy', label: 'Privacy' },
  ]}
  copyright="© 2026 My App"
  credit="Built with ♥"
/>
```

Props: `logo` (ReactNode), `links` (`{ href, label }[]`), `copyright`, `credit`.

---

### ScrollToTop

```tsx
import { ScrollToTop } from '@doriansmith/kiln';

// Scrolls to top whenever `location.pathname` changes
<ScrollToTop trigger={location.pathname} />
<ScrollToTop trigger={location.pathname} behavior="smooth" />
```

Props: `trigger` (any value — scroll fires when it changes), `behavior` (`auto` | `smooth`, default `auto`). Renders nothing.

---

### LoadingIndicator

```tsx
import { LoadingIndicator } from '@doriansmith/kiln';

<LoadingIndicator />
<LoadingIndicator size={32} inline />
```

Props: `size` (px, default `40`), `inline` (renders `<span>` instead of `<div>`).

---

### ErrorMessage

```tsx
import { ErrorMessage } from '@doriansmith/kiln';

<ErrorMessage message="Something went wrong." />
<ErrorMessage message={error} onRetry={() => refetch()} />
```

Props: `message` (string or `null`/`undefined` — renders nothing when falsy), `onRetry` (shows a Retry button).

---

## TypeScript

All props are fully typed. Named type exports:

```ts
import type {
  ButtonVariant, ButtonSize,
  CardVariant,
  BadgeColor, BadgeVariant, BadgeSize,
  TabItem,
  NavItem,
} from '@doriansmith/kiln';
```

## License

MIT
