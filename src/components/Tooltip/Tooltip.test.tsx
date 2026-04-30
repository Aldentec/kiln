import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Tooltip from './Tooltip';

function TriggerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props}>Hover me</button>;
}

describe('Tooltip', () => {
  it('does not render tooltip content initially', () => {
    render(
      <Tooltip content="Tooltip text" delayMs={0}>
        <TriggerButton />
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on mouseenter (instant, delayMs=0)', async () => {
    render(
      <Tooltip content="Tooltip text" delayMs={0}>
        <TriggerButton />
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
    });
  });

  it('shows tooltip on focus', async () => {
    render(
      <Tooltip content="Focus tip" delayMs={0}>
        <TriggerButton />
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip on mouseleave', async () => {
    render(
      <Tooltip content="Goes away" delayMs={0}>
        <TriggerButton />
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());

    fireEvent.mouseLeave(screen.getByRole('button'));
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('hides tooltip on blur', async () => {
    render(
      <Tooltip content="Goes away" delayMs={0}>
        <TriggerButton />
      </Tooltip>,
    );
    fireEvent.focus(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());

    fireEvent.blur(screen.getByRole('button'));
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('hides tooltip on Escape key', async () => {
    render(
      <Tooltip content="Escapable" delayMs={0}>
        <TriggerButton />
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());

    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('adds aria-describedby to trigger when visible', async () => {
    render(
      <Tooltip content="Described" delayMs={0}>
        <TriggerButton />
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      const trigger = screen.getByRole('button');
      expect(trigger.getAttribute('aria-describedby')).toBe(tooltip.id);
    });
  });

  it('chains child onMouseEnter handler', async () => {
    const handler = vi.fn();
    render(
      <Tooltip content="Chained" delayMs={0}>
        <TriggerButton onMouseEnter={handler} />
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('applies side class to tooltip', async () => {
    render(
      <Tooltip content="Right side" side="right" delayMs={0}>
        <TriggerButton />
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveClass('kiln-tooltip--right');
    });
  });
});
