import { lazy, Suspense, useEffect } from 'react';
import { useRouter } from './useRouter';

// Lazy-load every page so none of them are in the critical request chain.
// Only App.tsx + useRouter are parsed on initial load; the correct page
// chunk is then fetched in parallel with other resources.
const LandingPage        = lazy(() => import('./LandingPage'));
const ComponentsPage     = lazy(() => import('./ComponentsPage'));
const AboutPage          = lazy(() => import('./AboutPage'));
const DemosPage          = lazy(() => import('./DemosPage'));
const DesignLanguagePage = lazy(() => import('./DesignLanguagePage'));
const GetStartedPage     = lazy(() => import('./GetStartedPage'));
const IconLibraryPage    = lazy(() => import('./IconLibraryPage'));

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
  '/icon-library': {
    title: 'Icon Library — Kiln React Component Library',
    description: 'Browse all available icons in the Kiln design system. Search, filter, and copy icons with one click.',
  },
};

export default function App() {
  const { route, slug } = useRouter();

  useEffect(() => {
    const key = route === 'landing' ? '/' : `/${route}`;
    const meta = PAGE_META[key] ?? PAGE_META['/'];

    document.title = meta.title;

    // Update <meta name="description">
    const descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descTag) descTag.content = meta.description;

    // Update canonical
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `https://kiln-ui.com${route === 'landing' ? '/' : `/${route}`}${slug ? `/${slug}` : ''}`;
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
  }, [route, slug]);

  let page;
  if (route === 'components')        page = <ComponentsPage initialSlug={slug} />;
  else if (route === 'about')        page = <AboutPage />;
  else if (route === 'demos')        page = <DemosPage />;
  else if (route === 'design-language') page = <DesignLanguagePage />;
  else if (route === 'get-started')  page = <GetStartedPage />;
  else if (route === 'icon-library') page = <IconLibraryPage />;
  else                               page = <LandingPage />;

  return (
    <Suspense fallback={null}>
      {page}
    </Suspense>
  );
}
