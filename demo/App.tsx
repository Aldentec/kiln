import { lazy, Suspense, useEffect } from 'react';
import { useRouter } from './useRouter';

// Lazy-load every page so none of them are in the critical request chain.
// Only App.tsx + useRouter are parsed on initial load; the correct page
// chunk is then fetched in parallel with other resources.
const LandingPage        = lazy(() => import('./LandingPage'));
const ComponentsPage     = lazy(() => import('./ComponentsPage'));
const AboutPage          = lazy(() => import('./AboutPage'));
const DemosPage          = lazy(() => import('./DemosPage'));
const GetStartedPage     = lazy(() => import('./GetStartedPage'));
const IconLibraryPage    = lazy(() => import('./IconLibraryPage'));

// Design language MDX pages
const DLIndex        = lazy(() => import('./design-language/pages/index.mdx'));
const DLColor        = lazy(() => import('./design-language/pages/color.mdx'));
const DLTypography   = lazy(() => import('./design-language/pages/typography.mdx'));
const DLSpacing      = lazy(() => import('./design-language/pages/spacing.mdx'));
const DLElevation    = lazy(() => import('./design-language/pages/elevation.mdx'));
const DLMotion       = lazy(() => import('./design-language/pages/motion.mdx'));
const DLBorderRadius = lazy(() => import('./design-language/pages/border-radius.mdx'));
const DLTheming      = lazy(() => import('./design-language/pages/theming.mdx'));
const DLIconography  = lazy(() => import('./design-language/pages/iconography.mdx'));

interface PageMeta { title: string; description: string; }

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Kiln — Accessible React Component Library',
    description: 'Kiln is a lightweight, accessible React component library for indie developers. WCAG AA compliant, < 26 KB gzipped, zero dependencies. Install and ship in under 2 minutes.',
  },
  '/get-started': {
    title: 'Get Started with Kiln — Install in Under 2 Minutes',
    description: 'Install @doriansmith/kiln, import one CSS file, and use 25+ WCAG AA-compliant React components immediately. No config, no providers, no boilerplate. Step-by-step guide.',
  },
  '/components': {
    title: 'Components — Kiln React Component Library',
    description: 'Browse 25+ accessible React components: Button, Input, Modal, Card, Tabs, Badge, Accordion, and more. Full API docs, live previews, and copy-paste code examples.',
  },
  '/demos': {
    title: 'Demos — Kiln React Component Library',
    description: 'Interactive demos of Kiln components in real-world layouts: an e-commerce store, account settings dashboard, and a support ticket system. All built with Kiln.',
  },
  '/about': {
    title: 'Why Kiln — Accessible React Components for Indie Developers',
    description: 'Why Kiln exists: accessible by default, performance-first, genuinely mobile-ready, and built for indie developers who need to ship fast without compromising quality.',
  },
  '/design-language': {
    title: 'Design Language — Kiln React Component Library',
    description: 'The design principles, token system, colour palette, typography, spacing, and iconography that underpin every Kiln component.',
  },
  '/design-language/color': {
    title: 'Color — Design Language — Kiln',
    description: 'Kiln\'s color system: brand palette, semantic status colors, gray scale, and accessibility contrast requirements.',
  },
  '/design-language/typography': {
    title: 'Typography — Design Language — Kiln',
    description: 'Space Grotesk, JetBrains Mono, the type scale, line heights, and the rules behind readable interfaces.',
  },
  '/design-language/spacing': {
    title: 'Spacing — Design Language — Kiln',
    description: 'The 4px base unit, the named spacing scale, and how rhythm is created across every component.',
  },
  '/design-language/elevation': {
    title: 'Elevation — Design Language — Kiln',
    description: 'Shadow tokens, the z-index scale, and how Kiln creates depth without noise.',
  },
  '/design-language/motion': {
    title: 'Motion — Design Language — Kiln',
    description: 'Easing curves, duration tokens, and the principle that every animation must communicate something.',
  },
  '/design-language/border-radius': {
    title: 'Border Radius — Design Language — Kiln',
    description: 'The radius scale, when to use each step, and how rounded corners define Kiln\'s personality.',
  },
  '/design-language/theming': {
    title: 'Theming — Design Language — Kiln',
    description: 'How to apply custom brand colors to Kiln while the system automatically enforces WCAG AA accessibility.',
  },
  '/design-language/iconography': {
    title: 'Iconography — Design Language — Kiln',
    description: 'Kiln\'s icon-agnostic approach, sizing guidelines, recommended libraries, and accessibility requirements.',
  },
  '/icon-library': {
    title: 'Icon Library — Kiln React Component Library',
    description: 'Browse all available icons in the Kiln design system. Search, filter, and copy icons with one click.',
  },
};

export default function App() {
  const { route, slug, dlSection } = useRouter();

  useEffect(() => {
    const baseKey = route === 'landing' ? '/' : `/${route}`;
    const key = dlSection ? `${baseKey}/${dlSection}` : baseKey;
    const meta = PAGE_META[key] ?? PAGE_META[baseKey] ?? PAGE_META['/'];

    document.title = meta.title;

    // Update <meta name="description">
    const descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descTag) descTag.content = meta.description;

    // Update canonical
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      const basePath = route === 'landing' ? '/' : `/${route}`;
      const subPath = dlSection ? `/${dlSection}` : slug ? `/${slug}` : '';
      canonical.href = `https://kiln-ui.com${basePath}${subPath}`;
    }

    // Update OG / Twitter tags to match current page
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDesc  = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const ogUrl   = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const twTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    const twDesc  = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    if (ogTitle) ogTitle.content = meta.title;
    if (ogDesc)  ogDesc.content  = meta.description;
    if (ogUrl)   ogUrl.content   = canonical?.href ?? '';
    if (twTitle) twTitle.content = meta.title;
    if (twDesc)  twDesc.content  = meta.description;
  }, [route, slug, dlSection]);

  let page;
  if (route === 'components')        page = <ComponentsPage initialSlug={slug} />;
  else if (route === 'about')        page = <AboutPage />;
  else if (route === 'demos')        page = <DemosPage />;
  else if (route === 'design-language') {
    if (dlSection === 'color')         page = <DLColor />;
    else if (dlSection === 'typography')   page = <DLTypography />;
    else if (dlSection === 'spacing')      page = <DLSpacing />;
    else if (dlSection === 'elevation')    page = <DLElevation />;
    else if (dlSection === 'motion')       page = <DLMotion />;
    else if (dlSection === 'border-radius') page = <DLBorderRadius />;
    else if (dlSection === 'theming')      page = <DLTheming />;
    else if (dlSection === 'iconography')  page = <DLIconography />;
    else                                   page = <DLIndex />;
  }
  else if (route === 'get-started')  page = <GetStartedPage />;
  else if (route === 'icon-library') page = <IconLibraryPage />;
  else                               page = <LandingPage />;

  return (
    <Suspense fallback={null}>
      {page}
    </Suspense>
  );
}
