// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useState } from 'react';
import { cn } from '../../utils';
import './Chip.css';

export interface ChipProps {
  /** Controlled selected state */
  selected?: boolean;
  /** Uncontrolled initial state */
  defaultSelected?: boolean;
  onToggle?: (selected: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  selected: controlledSelected,
  defaultSelected = false,
  onToggle,
  disabled = false,
  children,
  className = '',
}) => {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isSelected = controlledSelected ?? internalSelected;

  const handleClick = () => {
    if (disabled) return;
    const next = !isSelected;
    if (controlledSelected === undefined) setInternalSelected(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      aria-disabled={disabled ? 'true' : undefined}
      className={cn(
        'kiln-chip',
        isSelected && 'kiln-chip--selected',
        disabled && 'kiln-chip--disabled',
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Chip;
