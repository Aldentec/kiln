import { useState, useEffect } from 'react';

export type Route = 'landing' | 'components';

function getRoute(hash: string): Route {
  return hash === '#/components' ? 'components' : 'landing';
}

export function useRouter(): Route {
  const [route, setRoute] = useState<Route>(() => getRoute(window.location.hash));

  useEffect(() => {
    const handler = () => setRoute(getRoute(window.location.hash));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return route;
}
