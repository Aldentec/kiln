import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Critical</Badge>);
    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  it('applies severity variant class', () => {
    render(<Badge variant="critical">Crit</Badge>);
    expect(screen.getByText('Crit')).toHaveClass('kiln-badge--critical');
  });

  it('applies status variant class', () => {
    render(<Badge variant="success">OK</Badge>);
    expect(screen.getByText('OK')).toHaveClass('kiln-badge--success');
  });

  it('applies size class', () => {
    render(<Badge size="sm">S</Badge>);
    expect(screen.getByText('S')).toHaveClass('kiln-badge--sm');
  });

  it('defaults to neutral', () => {
    render(<Badge>N</Badge>);
    expect(screen.getByText('N')).toHaveClass('kiln-badge--neutral');
  });
});
