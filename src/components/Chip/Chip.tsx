import React from 'react';
import './Chip.css';

export interface ChipProps {
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  selected = false,
  onToggle,
  disabled = false,
  children,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled) onToggle?.(!selected);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      className={[
        'kiln-chip',
        selected ? 'kiln-chip--selected' : '',
        disabled ? 'kiln-chip--disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Chip;
