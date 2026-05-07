import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Prose from './Prose';

describe('Prose', () => {
  it('renders children', () => {
    render(<Prose><p>Hello world</p></Prose>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders as a div', () => {
    const { container } = render(<Prose>Content</Prose>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('applies default size class', () => {
    const { container } = render(<Prose>Content</Prose>);
    expect(container.firstChild).toHaveClass('kiln-prose--md');
  });

  it('applies sm size class', () => {
    const { container } = render(<Prose size="sm">Content</Prose>);
    expect(container.firstChild).toHaveClass('kiln-prose--sm');
  });

  it('applies lg size class', () => {
    const { container } = render(<Prose size="lg">Content</Prose>);
    expect(container.firstChild).toHaveClass('kiln-prose--lg');
  });

  it('sets default maxWidth style', () => {
    const { container } = render(<Prose>Content</Prose>);
    expect((container.firstChild as HTMLElement).style.maxWidth).toBe('68ch');
  });

  it('sets custom maxWidth style', () => {
    const { container } = render(<Prose maxWidth="720px">Content</Prose>);
    expect((container.firstChild as HTMLElement).style.maxWidth).toBe('720px');
  });

  it('does not set maxWidth when prop is "full"', () => {
    const { container } = render(<Prose maxWidth="full">Content</Prose>);
    expect((container.firstChild as HTMLElement).style.maxWidth).toBe('');
  });

  it('forwards className', () => {
    const { container } = render(<Prose className="article-body">Content</Prose>);
    expect(container.firstChild).toHaveClass('article-body');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Prose ref={ref}>Content</Prose>);
    expect(ref.current).not.toBeNull();
  });

  it('renders heading hierarchy correctly', () => {
    render(
      <Prose>
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <p>Body</p>
      </Prose>
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Subtitle' })).toBeInTheDocument();
  });
});
