import { useEffect } from 'react';
import { useRouter } from './useRouter';
import LandingPage from './LandingPage';
import ComponentsPage from './ComponentsPage';
import AboutPage from './AboutPage';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Kiln — Accessible React Component Library',
  '/components': 'Components — Kiln React Component Library',
  '/about': 'Why Kiln — Accessible React Components for Indie Developers',
};

export default function App() {
  const page = useRouter();

  useEffect(() => {
    const title = PAGE_TITLES[page] ?? PAGE_TITLES['/'];
    document.title = title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `https://kiln-ui.com${page === '/' ? '/' : page}`;
    }
  }, [page]);

  if (page === 'components') return <ComponentsPage />;
  if (page === 'about')      return <AboutPage />;
  return <LandingPage />;
}
