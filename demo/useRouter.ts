import { useState, useEffect } from 'react';

export type Route = 'landing' | 'components' | 'about' | 'demos' | 'design-language';

interface RouterState {
  route: Route;
  slug: string;
}

function getState(pathname: string): RouterState {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/about')            return { route: 'about',           slug: '' };
  if (path === '/demos')            return { route: 'demos',           slug: '' };
  if (path === '/design-language')  return { route: 'design-language', slug: '' };
  if (path === '/components') return { route: 'components', slug: '' };
  // /components/badge, /components/app-layout, etc.
  const match = path.match(/^\/components\/([^/]+)$/);
  if (match) return { route: 'components', slug: match[1] };
  return { route: 'landing', slug: '' };
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
