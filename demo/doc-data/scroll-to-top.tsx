import React, { useState } from 'react';
import { ScrollToTop, Button } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const ScrollToTopPreview: React.FC = () => {
  const [trigger, setTrigger] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <ScrollToTop trigger={trigger} behavior="smooth" />
      <Button variant="secondary" onClick={() => setTrigger((t) => t + 1)}>
        Scroll to top
      </Button>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--kiln-gray-500)' }}>
        Renders null — fires window.scrollTo on trigger change
      </p>
    </div>
  );
};

export const scrollToTop: ComponentDoc = {
  id: 'scroll-to-top',
  name: 'ScrollToTop',
  description: 'Invisible utility that fires window.scrollTo whenever a trigger value changes — ideal for route transitions.',
  preview: ScrollToTopPreview,
  code: `import { ScrollToTop } from '@doriansmith/kiln';

// Scroll to top on every route change
// Pass your router's current pathname as trigger
<ScrollToTop trigger={location.pathname} />

// Smooth scroll behavior
<ScrollToTop trigger={location.pathname} behavior="smooth" />`,
  props: [
    { name: 'trigger', type: 'unknown', default: '—', required: true, description: 'When this value changes, the page scrolls to top. Pass your router pathname/location.' },
    { name: 'behavior', type: "'auto' | 'smooth' | 'instant'", default: "'auto'", required: false, description: 'ScrollBehavior passed to window.scrollTo' },
  ],
  testing: `import { render } from '@testing-library/react';
import { ScrollToTop } from '@doriansmith/kiln';

it('renders nothing', () => {
  const { container } = render(<ScrollToTop trigger="/" />);
  expect(container).toBeEmptyDOMElement();
});

it('calls window.scrollTo on trigger change', () => {
  const scrollTo = vi.spyOn(window, 'scrollTo');
  const { rerender } = render(<ScrollToTop trigger="/" />);
  rerender(<ScrollToTop trigger="/docs" />);
  expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
});`,
  usage: `// React Router v6 — mount once at app root
import { useLocation } from 'react-router-dom';
import { ScrollToTop } from '@doriansmith/kiln';

function App() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop trigger={location.pathname} behavior="smooth" />
      <Outlet />
    </>
  );
}

// Hash-based router — pass the hash value
<ScrollToTop trigger={window.location.hash} />`,
};
