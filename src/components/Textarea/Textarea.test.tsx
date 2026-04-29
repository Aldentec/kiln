import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Textarea from './Textarea';

describe('Textarea', () => {
  it('renders textarea element', () => {
    render(<Textarea placeholder="Write something" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Textarea errorText="Too short" />);
    expect(screen.getByRole('textbox')).toHaveClass('kiln-textarea--error');
    expect(screen.getByRole('alert')).toHaveTextContent('Too short');
  });

  it('shows character count', () => {
    render(<Textarea showCharCount maxLength={100} defaultValue="hello" />);
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('marks count as over when char count exceeds maxLength', () => {
    render(<Textarea showCharCount maxLength={5} defaultValue="toolong" />);
    expect(screen.getByText('7/5')).toBeInTheDocument();
    expect(document.querySelector('.kiln-textarea-charcount--over')).toBeInTheDocument();
  });
});
