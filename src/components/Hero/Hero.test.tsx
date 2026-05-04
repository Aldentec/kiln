import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the title as an h1', () => {
    render(<Hero title="Ship fast without compromise" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ship fast without compromise');
  });

  it('renders as a section landmark', () => {
    render(<Hero id="hero-heading" title="Title" />);
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading');
  });

  it('wires id to h1 for aria-labelledby', () => {
    render(<Hero id="hero-heading" title="My Hero" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'hero-heading');
  });

  it('renders eyebrow when provided', () => {
    render(<Hero title="Title" eyebrow="New release" />);
    expect(screen.getByText('New release')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Hero title="Title" description="A short description." />);
    expect(screen.getByText('A short description.')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(<Hero title="Title" actions={<button>Get started</button>} />);
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
  });

  it('renders media slot with aria-hidden', () => {
    const { container } = render(<Hero title="Title" media={<img src="/hero.png" alt="" />} />);
    const mediaDiv = container.querySelector('.kiln-hero__media');
    expect(mediaDiv).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies variant class', () => {
    const { container } = render(<Hero title="Title" variant="gradient" />);
    expect(container.querySelector('.kiln-hero')).toHaveClass('kiln-hero--gradient');
  });

  it('applies size class', () => {
    const { container } = render(<Hero title="Title" size="sm" />);
    expect(container.querySelector('.kiln-hero')).toHaveClass('kiln-hero--sm');
  });

  it('applies align class', () => {
    const { container } = render(<Hero title="Title" align="left" />);
    expect(container.querySelector('.kiln-hero')).toHaveClass('kiln-hero--left');
  });

  it('applies has-media class when media is provided', () => {
    const { container } = render(<Hero title="Title" media={<div />} />);
    expect(container.querySelector('.kiln-hero')).toHaveClass('kiln-hero--has-media');
  });

  it('forwards className and style', () => {
    const { container } = render(
      <Hero title="Title" className="custom-hero" style={{ '--kiln-hero-min-height': '50vh' } as React.CSSProperties} />
    );
    const hero = container.querySelector('.kiln-hero');
    expect(hero).toHaveClass('custom-hero');
    expect(hero).toHaveStyle({ '--kiln-hero-min-height': '50vh' });
  });
});
