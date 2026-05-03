import { lazy, Suspense, useEffect } from 'react';
import { useRouter } from './useRouter';

// Lazy-load every page so none of them are in the critical request chain.
// Only App.tsx + useRouter are parsed on initial load; the correct page
// chunk is then fetched in parallel with other resources.
const LandingPage       = lazy(() => import('./LandingPage'));
const ComponentsPage    = lazy(() => import('./ComponentsPage'));
const AboutPage         = lazy(() => import('./AboutPage'));
const DemosPage         = lazy(() => import('./DemosPage'));
const DesignLanguagePage = lazy(() => import('./DesignLanguagePage'));

const PAGE_TITLES: Record<string, string> = {
  '/': 'Kiln — Accessible React Component Library',
  '/components': 'Components — Kiln React Component Library',
  '/about': 'Why Kiln — Accessible React Components for Indie Developers',
  '/demos':           'Demos — Kiln React Component Library',
  '/design-language': 'Design Language — Kiln React Component Library',
};

export default function App() {
  const { route, slug } = useRouter();

  useEffect(() => {
    const titleKey = route === 'landing' ? '/' : `/${route}`;
    document.title = PAGE_TITLES[titleKey] ?? PAGE_TITLES['/'];
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `https://kiln-ui.com${route === 'landing' ? '/' : `/${route}`}${slug ? `/${slug}` : ''}`;
    }
  }, [route, slug]);

  let page;
  if (route === 'components')      page = <ComponentsPage initialSlug={slug} />;
  else if (route === 'about')      page = <AboutPage />;
  else if (route === 'demos')      page = <DemosPage />;
  else if (route === 'design-language') page = <DesignLanguagePage />;
  else                             page = <LandingPage />;

  return (
    <Suspense fallback={null}>
      {page}
    </Suspense>
  );
}
