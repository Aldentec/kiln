import { useRouter } from './useRouter';
import LandingPage from './LandingPage';
import ComponentsPage from './ComponentsPage';
import AboutPage from './AboutPage';

export default function App() {
  const route = useRouter();
  if (route === 'components') return <ComponentsPage />;
  if (route === 'about')      return <AboutPage />;
  return <LandingPage />;
}
