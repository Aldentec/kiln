import { useState, useEffect } from 'react';

export type Route = 'landing' | 'components' | 'about' | 'demos' | 'design-language' | 'get-started' | 'icon-library';

export type DesignLanguageSection =
  | ''
  | 'color'
  | 'typography'
  | 'spacing'
  | 'elevation'
  | 'motion'
  | 'border-radius'
  | 'theming'
  | 'iconography';

interface RouterState {
  route: Route;
  slug: string;
  dlSection: DesignLanguageSection;
}

const DL_SECTIONS: DesignLanguageSection[] = [
  'color', 'typography', 'spacing', 'elevation',
  'motion', 'border-radius', 'theming', 'iconography',
];

function getState(pathname: string): RouterState {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/about')            return { route: 'about',           slug: '', dlSection: '' };
  if (path === '/demos')            return { route: 'demos',           slug: '', dlSection: '' };
  if (path === '/get-started')      return { route: 'get-started',     slug: '', dlSection: '' };
  if (path === '/icon-library')     return { route: 'icon-library',    slug: '', dlSection: '' };
  if (path === '/design-language')  return { route: 'design-language', slug: '', dlSection: '' };
  // /design-language/color, /design-language/typography, etc.
  const dlMatch = path.match(/^\/design-language\/([^/]+)$/);
  if (dlMatch) {
    const section = dlMatch[1] as DesignLanguageSection;
    if (DL_SECTIONS.includes(section)) {
      return { route: 'design-language', slug: '', dlSection: section };
    }
  }
  if (path === '/components') return { route: 'components', slug: '', dlSection: '' };
  // /components/badge, /components/app-layout, etc.
  const match = path.match(/^\/components\/([^/]+)$/);
  if (match) return { route: 'components', slug: match[1], dlSection: '' };
  return { route: 'landing', slug: '', dlSection: '' };
}

export function useRouter(): RouterState {
  const [state, setState] = useState<RouterState>(() => getState(window.location.pathname));

  useEffect(() => {
    const handler = () => setState(getState(window.location.pathname));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return state;
}

export function navigate(path: string) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new Event('popstate'));
}
