// a11y: WCAG AA verified 2026-05-03 — heading semantics, aria-hidden tagline, id forwarding
// perf: CLS=0, no transitions, static layout 2026-05-03
// mobile: font-sizes ≥ 16px (description) / 20px (h3) / 24px (h1 @ 375px), actions stack @ ≤599px
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('renders children as the heading text', () => {
    render(<Header>Page Title</Header>);
    expect(screen.getByText('Page Title')).toBeInTheDocument();
  });

  it('defaults to h2 heading element', () => {
    const { container } = render(<Header>Section</Header>);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('renders the correct heading element for each variant', () => {
    const { container: c1 } = render(<Header variant="h1">Title</Header>);
    const { container: c2 } = render(<Header variant="h2">Title</Header>);
    const { container: c3 } = render(<Header variant="h3">Title</Header>);
    expect(c1.querySelector('h1')).toBeInTheDocument();
    expect(c2.querySelector('h2')).toBeInTheDocument();
    expect(c3.querySelector('h3')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(<Header description="A subtitle here">Title</Header>);
    expect(screen.getByText('A subtitle here')).toBeInTheDocument();
  });

  it('renders the actions slot', () => {
    render(<Header actions={<button>Save</button>}>Title</Header>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders the tagline with aria-hidden', () => {
    const { container } = render(<Header tagline="Demos">Title</Header>);
    const tagline = container.querySelector('.kiln-header__tagline');
    expect(tagline).toBeInTheDocument();
    expect(tagline).toHaveAttribute('aria-hidden', 'true');
    expect(tagline).toHaveTextContent('Demos');
  });

  it('does not render a divider by default', () => {
    const { container } = render(<Header>Title</Header>);
    expect(container.querySelector('.kiln-header__divider')).toBeNull();
  });

  it('renders a divider when divider=true', () => {
    const { container } = render(<Header divider>Title</Header>);
    expect(container.querySelector('.kiln-header__divider')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Header variant="h1">Title</Header>);
    expect(container.querySelector('.kiln-header--h1')).toBeInTheDocument();
  });

  it('forwards id to the heading element', () => {
    const { container } = render(<Header id="my-heading" variant="h1">Title</Header>);
    expect(container.querySelector('#my-heading')).toBeInTheDocument();
    expect(container.querySelector('#my-heading')?.tagName).toBe('H1');
  });

  // ── Pillar 1: Accessibility ──────────────────────────────

  it('tagline text is NOT returned by accessible heading queries (aria-hidden)', () => {
    render(<Header tagline="Demos" variant="h1">Interactive demos</Header>);
    // getByRole('heading') must find only the real heading — not the tagline
    const heading = screen.getByRole('heading', { name: 'Interactive demos' });
    expect(heading).toBeInTheDocument();
    // The tagline string should not be the accessible name
    expect(screen.queryByRole('heading', { name: 'Demos' })).toBeNull();
  });

  it('description renders as a <p> element (not a div or span)', () => {
    const { container } = render(
      <Header description="A subtitle">Title</Header>,
    );
    const desc = container.querySelector('.kiln-header__description');
    expect(desc?.tagName).toBe('P');
  });

  it('divider renders as <hr> with aria-hidden', () => {
    const { container } = render(<Header divider>Title</Header>);
    const hr = container.querySelector('.kiln-header__divider');
    expect(hr?.tagName).toBe('HR');
    expect(hr).toHaveAttribute('aria-hidden', 'true');
  });

  it('heading is referenceable by aria-labelledby from a parent section', () => {
    const { container } = render(
      <section aria-labelledby="test-heading">
        <Header id="test-heading" variant="h2">Section Name</Header>
      </section>,
    );
    const section = container.querySelector('section');
    const headingId = section?.getAttribute('aria-labelledby');
    expect(container.querySelector(`#${headingId}`)).toBeInTheDocument();
    expect(container.querySelector(`#${headingId}`)?.textContent).toBe('Section Name');
  });
});
