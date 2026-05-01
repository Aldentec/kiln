import { useState, useEffect } from 'react';

export type Route = 'landing' | 'components' | 'about';

function getRoute(pathname: string): Route {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/components') return 'components';
  if (path === '/about') return 'about';
  return 'landing';
}

export function useRouter(): Route {
  const [route, setRoute] = useState<Route>(() => getRoute(window.location.pathname));

  useEffect(() => {
    const handler = () => setRoute(getRoute(window.location.pathname));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new Event('popstate'));
}
