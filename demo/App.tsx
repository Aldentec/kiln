import { useEffect } from 'react';
import { useRouter } from './useRouter';
import LandingPage from './LandingPage';
import ComponentsPage from './ComponentsPage';
import AboutPage from './AboutPage';
import DemosPage from './DemosPage';
import DesignLanguagePage from './DesignLanguagePage';

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

  if (route === 'components') return <ComponentsPage initialSlug={slug} />;
  if (route === 'about')      return <AboutPage />;
  if (route === 'demos')            return <DemosPage />;
  if (route === 'design-language')  return <DesignLanguagePage />;
  return <LandingPage />;
}
