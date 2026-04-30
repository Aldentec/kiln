import React from 'react';
import { useRouter } from './useRouter';
import LandingPage from './LandingPage';
import ComponentsPage from './ComponentsPage';

export default function App() {
  const route = useRouter();
  return route === 'components' ? <ComponentsPage /> : <LandingPage />;
}
