import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Blockquote from './Blockquote';

describe('Blockquote', () => {
  it('renders children', () => {
    render(<Blockquote>Great design is invisible.</Blockquote>);
    expect(screen.getByText('Great design is invisible.')).toBeInTheDocument();
  });

  it('renders cite when provided', () => {
    render(<Blockquote cite="Dieter Rams">Less, but better.</Blockquote>);
    expect(screen.getByText('Dieter Rams')).toBeInTheDocument();
  });

  it('does not render cite element when omitted', () => {
    const { container } = render(<Blockquote>Text</Blockquote>);
    expect(container.querySelector('.kiln-blockquote__cite')).toBeNull();
  });

  it('applies default variant class', () => {
    const { container } = render(<Blockquote>Text</Blockquote>);
    expect(container.firstChild).toHaveClass('kiln-blockquote--default');
  });

  it('applies accent variant class', () => {
    const { container } = render(<Blockquote variant="accent">Text</Blockquote>);
    expect(container.firstChild).toHaveClass('kiln-blockquote--accent');
  });

  it('applies subtle variant class', () => {
    const { container } = render(<Blockquote variant="subtle">Text</Blockquote>);
    expect(container.firstChild).toHaveClass('kiln-blockquote--subtle');
  });

  it('forwards className', () => {
    const { container } = render(<Blockquote className="my-quote">Text</Blockquote>);
    expect(container.firstChild).toHaveClass('my-quote');
  });

  it('renders as a blockquote element', () => {
    const { container } = render(<Blockquote>Text</Blockquote>);
    expect(container.firstChild?.nodeName).toBe('BLOCKQUOTE');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLQuoteElement>();
    render(<Blockquote ref={ref}>Text</Blockquote>);
    expect(ref.current).not.toBeNull();
  });
});
