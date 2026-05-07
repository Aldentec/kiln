import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Section from './Section';

describe('Section', () => {
  it('renders children', () => {
    render(<Section>Content</Section>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders as a section element', () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('applies default background class', () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.firstChild).toHaveClass('kiln-section--default');
  });

  it('applies background variant class', () => {
    const { container } = render(<Section background="subtle">Content</Section>);
    expect(container.firstChild).toHaveClass('kiln-section--subtle');
  });

  it('applies padding variant class', () => {
    const { container } = render(<Section padding="lg">Content</Section>);
    expect(container.firstChild).toHaveClass('kiln-section--pad-lg');
  });

  it('applies none padding class', () => {
    const { container } = render(<Section padding="none">Content</Section>);
    expect(container.firstChild).toHaveClass('kiln-section--pad-none');
  });

  it('sets maxWidth on inner container', () => {
    const { container } = render(<Section maxWidth="800px">Content</Section>);
    const inner = container.querySelector('.kiln-section__inner') as HTMLElement;
    expect(inner.style.maxWidth).toBe('800px');
  });

  it('does not set maxWidth style when prop is "full"', () => {
    const { container } = render(<Section maxWidth="full">Content</Section>);
    const inner = container.querySelector('.kiln-section__inner') as HTMLElement;
    expect(inner.style.maxWidth).toBe('');
  });

  it('adds role="region" and aria-label when aria-label is provided', () => {
    render(<Section aria-label="Features">Content</Section>);
    const section = screen.getByRole('region', { name: 'Features' });
    expect(section).toBeInTheDocument();
  });

  it('does not add role="region" without aria-label', () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.firstChild).not.toHaveAttribute('role');
  });

  it('forwards className and style', () => {
    const { container } = render(
      <Section className="custom" style={{ marginTop: '10px' }}>Content</Section>
    );
    expect(container.firstChild).toHaveClass('custom');
    expect((container.firstChild as HTMLElement).style.marginTop).toBe('10px');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Section ref={ref}>Content</Section>);
    expect(ref.current).not.toBeNull();
  });
});
