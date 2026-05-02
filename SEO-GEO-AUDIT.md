# SEO & GEO Audit + Implementation Roadmap — Kiln (`kiln-ui.com`)

**Date:** 2026-05-01
**Site:** https://kiln-ui.com
**Domain:** kiln-ui.com (AWS CloudFront + S3)
**Type:** Vite SPA (Single Page Application), client-side routed
**Package:** `@doriansmith/kiln` (npm, MIT, v0.1.0)
**Audience:** Indie developers, small teams, solo devs building React apps

---

## Executive Summary

Kiln is a lightweight, accessible React component library targeting indie developers and small teams. The demo/documentation site at `kiln-ui.com` serves as both the marketing landing page and the interactive component documentation. **The site currently has near-zero SEO infrastructure** — no meta description, no Open Graph tags, no structured data, no sitemap, no robots.txt, no dynamic per-page titles, and no analytics. For a developer tool whose primary discovery channel is organic search, this represents a critical gap.

The competitive landscape (Ariakit, React Aria, shadcn/ui, Radix UI, MUI Base) shows that accessible React component libraries are a crowded space. Kiln's unique differentiators — **zero config, < 25 KB gzipped, styled out-of-the-box, solo-dev friendly, install-to-render in under 2 minutes** — are not being surfaced to search engines or AI models.

This document provides a complete audit and phased implementation roadmap covering Technical SEO, GEO (Generative Engine Optimization), On-Page Optimization, Local/GEO Targeting, and Content Gap Analysis.

---

## 1. Keyword Research & Target Analysis

### 1.1 Primary Keywords (High Intent, High Volume)

| Keyword | Intent | Competition | Target Page | Priority |
|---------|--------|-------------|-------------|----------|
| accessible React component library | Informational/Commercial | High | Home | P0 |
| React component library | Commercial | Very High | Home | P0 |
| lightweight React UI components | Informational | Medium | Home | P0 |
| WCAG AA React components | Informational | Medium | Home, About | P1 |
| small bundle React components | Informational | Low-Medium | Home, About | P1 |
| zero dependency React components | Informational | Low | About | P1 |
| React UI library for indie developers | Informational | Low | Home | P1 |
| fast React component library | Commercial | Medium | Home | P2 |

### 1.2 Long-Tail Keywords (High Conversion)

| Keyword | Search Intent | Target Page | Notes |
|---------|--------------|-------------|-------|
| accessible React component library no config | Commercial/Homepage | Home | Unique differentiator |
| React component library under 25kb | Informational/Comparison | About | Quantifiable USP |
| React modal with focus trap | Developer/How-to | Components (/modal) | Component-level SEO |
| accessible tabs React ARIA | Developer/How-to | Components (/tabs) | Competes with Radix |
| React input component with error state | Developer/How-to | Components (/input) | Long-tail opportunity |
| lightweight accessible React UI | Commercial | Home | Combines two USPs |
| React component library TypeScript | Commercial | Home | Developer expectation |
| keyboard accessible React modal | Developer/How-to | Components (/modal) | Niche but high intent |
| solo developer React component library | Commercial | Home, About | Audience-specific |
| React component library dark mode | Commercial/How-to | Home, About | Feature-specific |
| GPU accelerated React animations | Technical/Informational | About | Performance angle |
| React component library no theme provider | Developer/Pain-point | Home, About | Addresses competitor weakness |

### 1.3 Semantic/NLP Keywords (For GEO & LLM Training)

These keywords and phrases should appear naturally in content to establish topical authority:

- "WCAG 2.1 AA compliance" / "WCAG 2.2 AA compliance"
- "ARIA attributes" / "WAI-ARIA Authoring Practices"
- "keyboard navigation" / "keyboard accessible"
- "focus management" / "focus trap"
- "screen reader compatible" / "screen reader tested"
- "Cumulative Layout Shift" / "CLS" / "zero layout shift"
- "GPU-accelerated animations" / "transform and opacity"
- "Core Web Vitals" / "Lighthouse score"
- "design tokens" / "CSS custom properties"
- "bundle size" / "tree shaking" / "tree-shakeable"
- "solo developer" / "indie developer" / "small team"
- "npm install" / "zero dependencies" / "zero config"
- "copy-paste ready" / "install to render"
- "mobile-first responsive" / "iOS Safari zoom prevention"
- "touch target 44x44" / "WCAG touch target"

### 1.4 Competitor Keyword Gap Analysis

| Competitor | Strength | Gap Kiln Can Exploit |
|-----------|----------|---------------------|
| **shadcn/ui** | Huge adoption, Tailwind-based | Requires setup/config; Kiln is zero-config |
| **Radix UI** | Headless, accessible | Unstyled; Kiln ships styled |
| **React Aria** | Adobe-backed, comprehensive | Headless hooks only; no CSS |
| **Ariakit** | Mature, styled | Larger bundle; more complex |
| **MUI** | Enterprise, feature-rich | Heavy bundle; complex setup |
| **@a13y** | Accessibility-focused | Headless; developer styles everything |
| **compa11y** | Accessible, zero-config | Alpha stage; fewer components |

**Kiln's unique positioning:** The ONLY styled, accessible, zero-config React component library under 25 KB gzipped that works in under 2 minutes.

---

## 2. Technical SEO Audit

### 2.1 Current State — Critical Issues

| Issue | Severity | File | Impact |
|-------|----------|------|--------|
| No `<meta name="description">` | **Critical** | `demo/index.html:5` | Zero snippet control in SERPs |
| No Open Graph meta tags | **Critical** | `demo/index.html` | Broken link previews on social/messaging |
| No Twitter Card meta tags | **High** | `demo/index.html` | Poor X/Twitter sharing |
| No `<link rel="canonical">` | **High** | `demo/index.html` | Duplicate content risk |
| No `robots.txt` | **High** | Missing | No crawl directive control |
| No `sitemap.xml` | **High** | Missing | Slow/incomplete indexing |
| No JSON-LD structured data | **High** | Missing | No rich snippets, no AI knowledge graph |
| Static single title for all routes | **High** | `demo/index.html:6` | All pages indexed as "Kiln Design System — Demo" |
| No `<meta name="author">` | Medium | `demo/index.html` | Missed attribution signal |
| No analytics/tracking | **Medium** | Missing | No performance measurement |
| No favicon | Medium | Missing | Poor browser tab identity |
| No `<noscript>` fallback | Medium | `demo/index.html` | Zero content for non-JS crawlers |
| Client-side only rendering | **High** | Architecture | Googlebot can render JS but it's slower and unreliable; AI crawlers often skip JS |
| No `hreflang` tags | Low | `demo/index.html` | Not yet needed (English only) |

### 2.2 Technical SEO — Recommended Fixes

#### 2.2.1 `demo/index.html` — Meta Tags Overhaul

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kiln — Accessible React Component Library</title>
    <meta name="description" content="Kiln is a lightweight, accessible React component library for indie developers. WCAG AA compliant, &lt; 25 KB gzipped, zero dependencies. Install and ship in under 2 minutes." />
    <meta name="keywords" content="React, component library, accessible, WCAG, ARIA, TypeScript, lightweight, zero dependency, UI components, indie developer" />
    <meta name="author" content="Dorian Smith" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="https://kiln-ui.com/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Kiln — Accessible React Component Library" />
    <meta property="og:description" content="Lightweight, WCAG AA compliant React components for indie developers. &lt; 25 KB gzipped, zero config, zero dependencies." />
    <meta property="og:url" content="https://kiln-ui.com/" />
    <meta property="og:site_name" content="Kiln" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="https://kiln-ui.com/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Kiln — Ship fast without compromise" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Kiln — Accessible React Component Library" />
    <meta name="twitter:description" content="Lightweight, WCAG AA compliant React components for indie developers. &lt; 25 KB gzipped, zero config." />
    <meta name="twitter:image" content="https://kiln-ui.com/og-image.png" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="theme-color" content="#6366f1" />

    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

    <!-- JSON-LD Structured Data (SoftwareApplication) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Kiln",
      "alternateName": "@doriansmith/kiln",
      "description": "An accessible, performant React component library for indie developers and small teams. WCAG AA compliant, under 25 KB gzipped, zero dependencies.",
      "url": "https://kiln-ui.com",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web, Browser",
      "programmingLanguage": "JavaScript, TypeScript",
      "softwareVersion": "0.1.0",
      "license": "https://opensource.org/licenses/MIT",
      "author": {
        "@type": "Person",
        "name": "Dorian Smith",
        "url": "https://doriansmith.dev"
      },
      "codeRepository": "https://github.com/Aldentec/kiln",
      "downloadUrl": "https://www.npmjs.com/package/@doriansmith/kiln",
      "featureList": [
        "WCAG AA compliant components",
        "Keyboard navigation",
        "Focus management",
        "ARIA attributes",
        "Dark mode support",
        "TypeScript types",
        "Mobile-first responsive",
        "Zero layout shift",
        "GPU-accelerated animations"
      ],
      "screenshot": "https://kiln-ui.com/og-image.png",
      "softwareHelp": {
        "@type": "CreativeWork",
        "url": "https://kiln-ui.com/components"
      }
    }
    </script>

    <!-- WebSite + SearchAction (for sitelinks search box) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Kiln",
      "url": "https://kiln-ui.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://kiln-ui.com/components?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <noscript>
      <div style="padding: 2rem; text-align: center; font-family: system-ui;">
        <h1>Kiln — Accessible React Component Library</h1>
        <p>An accessible, performant React component library for indie developers and small teams. WCAG AA compliant, under 25 KB gzipped, zero dependencies.</p>
        <p><a href="https://www.npmjs.com/package/@doriansmith/kiln">Install on npm</a> · <a href="https://github.com/Aldentec/kiln">View on GitHub</a></p>
        <h2>Features</h2>
        <ul>
          <li>20+ accessible React components (Button, Input, Modal, Tabs, Card, Badge, Chip, and more)</li>
          <li>WCAG AA compliance with keyboard navigation, focus management, and ARIA</li>
          <li>Under 25 KB gzipped — zero dependencies</li>
          <li>TypeScript fully typed</li>
          <li>Dark mode with data-theme attribute</li>
          <li>Mobile-first responsive design</li>
        </ul>
        <h2>Quick Start</h2>
        <pre><code>npm install @doriansmith/kiln</code></pre>
      </div>
    </noscript>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

#### 2.2.2 Dynamic Page Titles — `demo/App.tsx`

The SPA router does not update `document.title` on navigation. Fix:

```tsx
// In App.tsx route effect:
useEffect(() => {
  const titles: Record<string, string> = {
    '/': 'Kiln — Accessible React Component Library',
    '/components': 'Components — Kiln React Component Library',
    '/about': 'Why Kiln — About',
  };
  document.title = titles[page] ?? 'Kiln — Accessible React Component Library';
}, [page]);
```

#### 2.2.3 `demo/public/robots.txt`

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://kiln-ui.com/sitemap.xml

# Disallow non-essential paths (if any exist in future)
# Disallow: /admin/
```

#### 2.2.4 `demo/public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kiln-ui.com/</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kiln-ui.com/components</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://kiln-ui.com/about</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

#### 2.2.5 Vite Plugin for Sitemap Generation (`vite.config.ts`)

Add automatic sitemap generation at build time:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

// Inline plugin: generate sitemap on build
function viteSitemapPlugin() {
  return {
    name: 'vite-sitemap',
    closeBundle() {
      const baseUrl = 'https://kiln-ui.com';
      const routes = ['/', '/components', '/about'];
      const now = new Date().toISOString().split('T')[0];
      
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${baseUrl}${r}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r === '/' ? 'weekly' : 'weekly'}</changefreq>
    <priority>${r === '/' ? '1.0' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>`;
      
      writeFileSync(resolve(__dirname, 'dist/sitemap.xml'), sitemap);
    }
  };
}

export default defineConfig({
  root: 'demo',
  plugins: [react(), viteSitemapPlugin()],
  // ... rest of config
});
```

### 2.3 Core Web Vitals Assessment

| Metric | Current (Estimated) | Target | Notes |
|--------|-------------------|--------|-------|
| **LCP** (Largest Contentful Paint) | ~1.2-1.8s | < 2.5s | Small bundle helps; Space Grotesk font loading adds overhead |
| **CLS** (Cumulative Layout Shift) | ~0 | < 0.1 | Zero layout shift claimed; good |
| **INP** (Interaction to Next Paint) | ~100-200ms | < 200ms | Client-side routing may add overhead |
| **FCP** (First Contentful Paint) | ~0.8-1.2s | < 1.8s | Good; small CSS bundle |
| **TTFB** (Time to First Byte) | ~100-300ms | < 800ms | CloudFront CDN is optimal |

**Recommendations:**
- Add `font-display: swap` to Google Fonts URL (already handled by Google Fonts v2)
- Preload the Space Grotesk font file for faster LCP
- Lazy-load component preview sections on the landing page
- Consider adding `content-visibility: auto` to below-fold sections

---

## 3. GEO (Generative Engine Optimization) Strategy

GEO optimizes content for AI-driven search (Perplexity, Gemini, ChatGPT Search, Google SGE). These engines prioritize **authoritative citations, direct answer formatting, structured data, and expert-led content**.

### 3.1 GEO Principles Applied to Kiln

#### 3.1.1 Direct Answer Formatting

AI engines extract concise answers from content. Structure key information in Q&A format:

**Add an FAQ section to the landing page or About page:**

```tsx
// FAQ Data — optimized for AI extraction
const FAQ_ITEMS = [
  {
    question: "What is Kiln?",
    answer: "Kiln is an accessible, performant React component library designed for indie developers and small teams. It provides 20+ WCAG AA-compliant UI components with zero configuration, zero dependencies, and a total gzipped bundle size under 25 KB."
  },
  {
    question: "Is Kiln accessible?",
    answer: "Yes. Every Kiln component meets WCAG AA standards out of the box, including keyboard navigation, proper focus management, ARIA attributes, and screen reader compatibility. Components are tested with axe DevTools and manual screen reader verification."
  },
  {
    question: "How do I install Kiln?",
    answer: "Run `npm install @doriansmith/kiln`, import the CSS once at your app root with `import '@doriansmith/kiln/kiln.css'`, and then import any component. There are no config files, setup wizards, or theme providers required."
  },
  {
    question: "How large is Kiln?",
    answer: "The entire Kiln package is under 25 KB gzipped: approximately 10 KB for the CSS bundle and 13 KB for the JavaScript (ESM). It has zero dependencies."
  },
  {
    question: "Does Kiln support TypeScript?",
    answer: "Yes. Kiln is built with TypeScript and all component props are fully typed with complete type inference. No generic annotations are required."
  },
  {
    question: "Does Kiln support dark mode?",
    answer: "Yes. Set `data-theme=\"dark\"` on the `<html>` element or use the built-in ThemeToggle component, which automatically persists the preference to localStorage."
  },
  {
    question: "How does Kiln compare to shadcn/ui or Radix UI?",
    answer: "Unlike shadcn/ui (which requires Tailwind CSS configuration) and Radix UI (which is headless and unstyled), Kiln ships fully styled with zero configuration. It is also significantly smaller — under 25 KB gzipped compared to shadcn/ui's typical 50-100 KB+ when combined with Tailwind."
  },
  {
    question: "What components does Kiln include?",
    answer: "Kiln v0.1.0 includes: Button, Input, Textarea, Card, Badge, Chip, Tabs, Modal, Nav, NavMenu, MobileNav, ThemeToggle, Footer, LoadingIndicator, ErrorMessage, ScrollToTop, CodeBlock, Accordion, Tooltip, and Toast. Additional components are planned for v0.2.0."
  }
];
```

#### 3.1.2 Structured Data for AI Knowledge Graphs

Add FAQPage structured data (in `index.html` or dynamically injected):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Kiln?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kiln is an accessible, performant React component library designed for indie developers and small teams. It provides 20+ WCAG AA-compliant UI components with zero configuration, zero dependencies, and a total gzipped bundle size under 25 KB."
      }
    },
    {
      "@type": "Question",
      "name": "Is Kiln accessible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every Kiln component meets WCAG AA standards out of the box, including keyboard navigation, proper focus management, ARIA attributes, and screen reader compatibility."
      }
    },
    {
      "@type": "Question",
      "name": "How do I install Kiln?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Run npm install @doriansmith/kiln, import the CSS once at your app root, and then import any component. No config files, setup wizards, or theme providers required."
      }
    }
  ]
}
```

#### 3.1.3 Authoritative Content Signals

For AI engines, authority signals include:
- **Named author with expertise:** Dorian Smith, linked to `doriansmith.dev`
- **Clear licensing:** MIT License
- **Version transparency:** v0.1.0 with public roadmap
- **Quantified claims:** "< 25 KB gzipped", "20+ primitives", "under 2 minutes"
- **Testing methodology:** "Tested with axe DevTools and manual screen reader verification"
- **External references:** Links to WCAG standards, WAI-ARIA practices

**Action items:**
- Add an "About the Author" section with credentials
- Add a "Testing & Quality" page detailing accessibility testing methodology
- Link to external standards (WCAG 2.1, WAI-ARIA) when making compliance claims
- Add a changelog page (critical for developer tool SEO)

#### 3.1.4 GEO Content Formatting Best Practices

| Format | Why It Matters for GEO | Implementation |
|--------|----------------------|----------------|
| **Direct answers in first paragraph** | AI extracts from opening content | Hero section subtitle answers "What is Kiln?" |
| **Numbered/bulleted lists** | Easier for AI to parse and cite | Feature lists, install steps |
| **Comparison tables** | AI cites structured comparisons | Kiln vs. competitors table |
| **Code snippets in HTML** | Googlebot indexes `<code>` content | Ensure code is in static HTML, not JS-rendered |
| **Definition-style content** | AI uses for "What is X?" answers | FAQ section |
| **Statistics and benchmarks** | AI cites quantitative claims | Bundle size numbers, Lighthouse scores |

### 3.2 AI Engine Optimization Checklist

| Platform | Optimization | Status |
|----------|-------------|--------|
| **Google SGE** | Structured data (FAQ, SoftwareApplication), semantic HTML, E-E-A-T signals | Not implemented |
| **Perplexity** | Authoritative sources, direct answers, factual claims with numbers | Not implemented |
| **ChatGPT Search** | Clear entity definitions, structured comparisons, named author | Not implemented |
| **Gemini** | Schema.org markup, concise definitions, technical specifications | Not implemented |
| **Claude** | Detailed documentation, code examples, clear use cases | Partially (README) |

---

## 4. On-Page Optimization Roadmap

### 4.1 Meta Tags Per Page

| Page | Title | Meta Description |
|------|-------|-----------------|
| **Home (/)** | `Kiln — Accessible React Component Library` | `Kiln is a lightweight, accessible React component library for indie developers. WCAG AA compliant, < 25 KB gzipped, zero dependencies. Install and ship in under 2 minutes.` |
| **Components (/components)** | `Components — Kiln React Component Library` | `Browse 20+ accessible React components: Button, Input, Modal, Tabs, Card, Badge, and more. WCAG AA compliant, fully typed, zero config. View live previews and API docs.` |
| **About (/about)** | `Why Kiln — Built for Indie Developers` | `Kiln is built on four non-negotiables: accessibility-first, performance-first, solo-dev friendly, and mobile-first mandatory. Learn why indie developers choose Kiln.` |

### 4.2 Heading Structure Audit

#### Landing Page (`LandingPage.tsx`)

| Current | Issue | Recommended |
|---------|-------|-------------|
| `<h1>`: "Ship fast without compromise." | Not keyword-optimized | `<h1>`: "Accessible React Component Library — Ship Fast Without Compromise"` |
| `<h2>`: "Built on three non-negotiables." | Good | Keep |
| `<h2>`: "From install to render in under 2 minutes." | Good | Keep |
| `<h2>`: "20+ primitives, ready to ship." | Good | Keep |
| `<h2>`: "Every component meets WCAG AA." | Good | Keep |

#### About Page (`AboutPage.tsx`)

| Current | Issue | Recommended |
|---------|-------|-------------|
| `<h1>`: "React components that respect your users and your time." | Not keyword-optimized | `<h1>`: "Why Kiln — Accessible React Components for Indie Developers"` |
| `<h2>`: "You shouldn't have to rebuild UI primitives every project." | Good | Keep |
| `<h2>`: "Non-negotiables, not nice-to-haves." | Good | Keep |
| `<h2>`: "Small bundle. Zero compromises." | Good | Keep |
| `<h2>`: "Your users don't care about your tech stack." | Good | Keep |
| `<h2>`: "Ready to stop rebuilding the same components?" | Good — CTA | Keep |

### 4.3 URL Structure

Current structure is clean and SEO-friendly:
- `/` — Home
- `/components` — Component documentation
- `/about` — About/Why Kiln

**Recommended additions:**
- `/components/[component-name]` — Individual component pages (e.g., `/components/button`, `/components/modal`)
- `/blog` — Content marketing/blog posts
- `/changelog` — Version history (critical for developer tool SEO)
- `/docs` — In-depth documentation
- `/pricing` — If monetization is planned

### 4.4 Content Optimization Recommendations

#### 4.4.1 Landing Page Hero Section

**Current:**
```
<h1>Ship fast without compromise.</h1>
<p>An accessible, performant React component library for indie developers
and small teams. Stop rebuilding the same components every project.</p>
```

**Optimized:**
```
<h1>Accessible React Component Library — Ship Fast Without Compromise</h1>
<p>Kiln is a lightweight React component library with 20+ WCAG AA-compliant 
components. Zero config, zero dependencies, under 25 KB gzipped. 
Install and ship accessible UIs in under 2 minutes.</p>
```

#### 4.4.2 Components Page

Add individual component sections with:
- Component name in `<h2>`
- Brief description with keywords
- Live preview
- API documentation
- Usage examples in static HTML (not JS-rendered)
- Accessibility notes per component

#### 4.4.3 Internal Linking Strategy

```
Home (/)
├── Components (/components)
│   ├── Button (/components#button)
│   ├── Modal (/components#modal)
│   ├── Input (/components#input)
│   └── ... (all 20+)
├── About (/about)
├── GitHub (external)
├── npm (external)
└── Blog (/blog) — FUTURE
    ├── "Kiln vs shadcn/ui: Which is right for you?"
    ├── "Building accessible React apps in 2026"
    └── "How we achieved < 25 KB gzipped"
```

---

## 5. Local/GEO Targeting

### 5.1 Assessment

Kiln is a **globally distributed developer tool** — the primary audience is English-speaking developers worldwide. Geographic targeting in the traditional sense (local business SEO, Google Business Profile) is **not applicable**. However, there are GEO-relevant optimizations:

### 5.2 Geo-Specific Optimizations for Developer Tools

| Strategy | Implementation | Rationale |
|----------|---------------|-----------|
| **English language targeting** | `<html lang="en">`, `og:locale: en_US` | Primary audience language |
| **Timezone-agnostic content** | No region-specific dates/pricing | Global developer audience |
| **npm registry optimization** | Optimized `package.json` keywords | npm is the discovery platform |
| **GitHub SEO** | Repository topics, optimized README | GitHub is a search engine for devs |
| **Dev community presence** | Dev.to, Hashnode, Reddit r/reactjs | Community-driven discovery |

### 5.3 npm Package SEO (`package.json`)

The `package.json` should include optimized metadata:

```json
{
  "name": "@doriansmith/kiln",
  "version": "0.1.0",
  "description": "Accessible React component library for indie developers. WCAG AA, < 25 KB gzipped, zero dependencies, zero config.",
  "keywords": [
    "react",
    "component-library",
    "accessible",
    "wcag",
    "aria",
    "ui-components",
    "typescript",
    "lightweight",
    "zero-dependency",
    "design-system",
    "frontend",
    "indie-developer",
    "dark-mode",
    "mobile-first",
    "performant"
  ],
  "homepage": "https://kiln-ui.com?utm_source=npm&utm_medium=package&utm_campaign=homepage",
  "repository": {
    "type": "git",
    "url": "https://github.com/Aldentec/kiln.git"
  },
  "bugs": {
    "url": "https://github.com/Aldentec/kiln/issues"
  },
  "author": "Dorian Smith",
  "license": "MIT"
}
```

### 5.4 GitHub Repository SEO

**Repository description (under 350 chars):**
> Accessible React component library for indie developers. 20+ WCAG AA components, < 25 KB gzipped, zero dependencies, zero config. Install and ship in under 2 minutes.

**GitHub Topics (10-20):**
```
react, component-library, accessible, wcag, a11y, aria, 
ui-components, typescript, lightweight, zero-dependency, 
design-system, frontend, dark-mode, mobile-first, 
indie-developer, react-components, performant, open-source
```

---

## 6. Content Gap Analysis

### 6.1 Current Content Inventory

| Page | Content Type | Word Count (Est.) | SEO Status |
|------|-------------|-------------------|------------|
| Home | Marketing landing | ~200 words | Minimal |
| Components | Interactive docs | ~500 words (shared) | Minimal |
| About | Problem/solution narrative | ~600 words | Minimal |
| README | Package documentation | ~500 words | Good structure |

### 6.2 Missing Content Pillars

| Content Pillar | Priority | Target Keywords | Format | Estimated Impact |
|---------------|----------|----------------|--------|-----------------|
| **Individual Component Pages** | **P0** | "accessible React [component]", "React [component] WCAG" | Interactive doc pages | Very High |
| **Changelog** | **P0** | "Kiln release", "@doriansmith/kiln changelog" | Versioned entries | High |
| **Getting Started Guide** | **P0** | "how to use Kiln", "Kiln React tutorial" | Step-by-step tutorial | High |
| **Accessibility Guide** | **P1** | "WCAG AA React", "accessible React best practices" | Educational article | High |
| **Performance Guide** | **P1** | "lightweight React components", "React bundle size" | Technical deep-dive | Medium |
| **Comparison Pages** | **P1** | "Kiln vs shadcn/ui", "Kiln vs Radix" | Comparison articles | Medium |
| **Migration Guides** | **P2** | "migrate from MUI to Kiln", "replace Radix with Kiln" | Technical tutorial | Medium |
| **Blog/Articles** | **P2** | Various long-tail | Opinion/educational | Medium |

### 6.3 Topical Authority Map

To establish Kiln as an authority in "accessible React components," the following topic cluster should be built:

```
Pillar: "Accessible React Component Libraries" (Home page)
├── Cluster: "WCAG AA Compliance in React" (About page)
│   ├── "What is WCAG AA?" (Blog)
│   ├── "Keyboard Navigation in React" (Blog)
│   └── "Focus Management Patterns" (Component docs)
├── Cluster: "Performance-Optimized React UIs" (About page)
│   ├── "Bundle Size Best Practices" (Blog)
│   ├── "Zero Layout Shift Techniques" (Blog)
│   └── "GPU-Accelerated CSS Animations" (Blog)
├── Cluster: "Developer Experience" (Home page)
│   ├── "Zero-Config React Setup" (Getting Started)
│   ├── "Solo Developer Workflows" (Blog)
│   └── "TypeScript with Component Libraries" (Blog)
└── Cluster: "Mobile-First React Design" (About page)
    ├── "iOS Safari Zoom Prevention" (Blog)
    ├── "WCAG Touch Target Guidelines" (Blog)
    └── "Responsive Modal Patterns" (Component docs)
```

---

## 7. Implementation Roadmap

### Phase 1: Critical Technical SEO (Week 1-2) — Impact: Immediate

| Task | File(s) | Effort | Priority |
|------|---------|--------|----------|
| Add meta description to `index.html` | `demo/index.html` | 5 min | P0 |
| Add Open Graph meta tags | `demo/index.html` | 10 min | P0 |
| Add Twitter Card meta tags | `demo/index.html` | 5 min | P0 |
| Add canonical link | `demo/index.html` | 2 min | P0 |
| Add JSON-LD structured data (SoftwareApplication) | `demo/index.html` | 15 min | P0 |
| Create `robots.txt` | `demo/public/robots.txt` | 2 min | P0 |
| Create `sitemap.xml` | `demo/public/sitemap.xml` or plugin | 15 min | P0 |
| Add dynamic page titles in `App.tsx` | `demo/App.tsx` | 10 min | P0 |
| Optimize H1 on LandingPage with keywords | `demo/LandingPage.tsx` | 5 min | P0 |
| Optimize H1 on AboutPage with keywords | `demo/AboutPage.tsx` | 5 min | P0 |
| Update `package.json` description + keywords | `package.json` | 10 min | P0 |
| Update GitHub repo description + topics | GitHub Settings | 10 min | P0 |
| Create OG image (1200x630) | `demo/public/og-image.png` | 30 min | P0 |
| Add favicon | `demo/index.html` + `demo/public/` | 5 min | P1 |
| Add `<noscript>` fallback | `demo/index.html` | 15 min | P1 |
| Add basic analytics (Plausible/Fathom) | `demo/index.html` | 10 min | P1 |

### Phase 2: GEO & Content (Week 3-4) — Impact: Medium-term

| Task | File(s) | Effort | Priority |
|------|---------|--------|----------|
| Add FAQ section to About page | `demo/AboutPage.tsx` | 2 hrs | P0 |
| Add FAQPage JSON-LD structured data | `demo/index.html` or injected | 30 min | P0 |
| Add `<code>` content in static HTML for Googlebot | Component pages | 2 hrs | P0 |
| Create Getting Started page | New page or expanded About | 3 hrs | P1 |
| Add internal linking between pages | All pages | 1 hr | P1 |
| Add author/attribution section | `demo/AboutPage.tsx` | 30 min | P1 |
| Create Changelog page | New page | 1 hr | P1 |
| Write first blog post: "Kiln vs shadcn/ui" | New `/blog` route | 4 hrs | P2 |

### Phase 3: Component-Level SEO (Week 5-6) — Impact: Long-tail

| Task | Effort | Priority |
|------|--------|----------|
| Create individual component pages with unique URLs | 8 hrs | P0 |
| Add per-component structured data (CreativeWork) | 2 hrs | P1 |
| Add accessibility notes per component | 4 hrs | P1 |
| Add usage examples in static HTML | 4 hrs | P1 |
| Create component comparison table | 2 hrs | P2 |

### Phase 4: Content Authority Building (Ongoing) — Impact: Long-term

| Task | Frequency | Priority |
|------|-----------|----------|
| Publish blog posts (accessibility, performance, DX) | Bi-weekly | P1 |
| Update changelog with every release | Per release | P0 |
| Monitor Google Search Console | Weekly | P0 |
| Track keyword rankings | Monthly | P1 |
| Submit to developer tool directories | One-time | P1 |
| Engage in React communities (Reddit, Dev.to, Hashnode) | Weekly | P2 |

---

## 8. Analytics & Measurement

### 8.1 Recommended Stack

| Tool | Purpose | Cost |
|------|---------|------|
| **Google Search Console** | Indexing, keyword performance, Core Web Vitals | Free |
| **Plausible Analytics** | Privacy-friendly page views, referrers | Free (open-source) |
| **Lighthouse CI** | Automated Core Web Vitals tracking | Free |
| **PageSpeed Insights** | Performance monitoring | Free |

### 8.2 Key Metrics to Track

| Metric | Baseline | Target (90 days) |
|--------|----------|------------------|
| Indexed pages | 1 (homepage only) | 3+ (all routes) |
| Organic impressions | 0 | 1,000+/month |
| Keyword rankings (top 100) | 0 | 10+ |
| Organic CTR | N/A | > 3% |
| Lighthouse Performance | ~85-90 | > 95 |
| Lighthouse Accessibility | ~95-100 | 100 |
| Lighthouse SEO | ~50-60 | 100 |
| Lighthouse Best Practices | ~90-95 | 100 |

---

## 9. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| SPA not indexed by Google | Medium | High | Add `<noscript>` content, consider SSR for docs |
| Competitor content outranks Kiln | High | Medium | Build content depth, target long-tail keywords |
| AI engines cite competitors instead | Medium | Medium | GEO optimization, authoritative FAQ, structured data |
| Bundle size increases with SEO additions | Low | Low | Meta tags add ~2KB; keep additions minimal |
| Client-side routing delays crawl discovery | Medium | Medium | Sitemap submission to Search Console |

---

## 10. Quick-Win Checklist (Can be done today)

- [ ] Add `<meta name="description">` to `demo/index.html`
- [ ] Add Open Graph tags to `demo/index.html`
- [ ] Add Twitter Card tags to `demo/index.html`
- [ ] Add `<link rel="canonical">` to `demo/index.html`
- [ ] Add JSON-LD `SoftwareApplication` structured data to `demo/index.html`
- [ ] Create `demo/public/robots.txt`
- [ ] Create `demo/public/sitemap.xml`
- [ ] Update `document.title` dynamically in `demo/App.tsx`
- [ ] Update H1 on `LandingPage.tsx` with primary keyword
- [ ] Update H1 on `AboutPage.tsx` with primary keyword
- [ ] Update `package.json` description and keywords
- [ ] Update GitHub repo description and topics
- [ ] Create OG image (`og-image.png`, 1200x630)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit site to Google Search Console for indexing
- [ ] Add Plausible Analytics script

---

*This audit was conducted on 2026-05-01. Re-evaluate quarterly as the project evolves and search engine algorithms update.*
