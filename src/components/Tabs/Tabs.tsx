import React, { useState, useId } from 'react';
import { cn } from '../../utils';
import './Tabs.css';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active value */
  value?: string;
  /** Uncontrolled default */
  defaultValue?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  ariaLabel = 'Tabs',
  className = '',
}) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? items[0]?.value ?? '',
  );

  const active = controlledValue ?? internalValue;

  const handleSelect = (val: string) => {
    if (controlledValue === undefined) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div
      className={cn('kiln-tabs', className)}
      role="tablist"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const tabId = `${id}-tab-${item.value}`;
        const isActive = item.value === active;
        return (
          <button
            key={item.value}
            id={tabId}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={cn('kiln-tabs__tab', isActive && 'kiln-tabs__tab--active')}
            onClick={() => !item.disabled && handleSelect(item.value)}
            disabled={item.disabled}
            tabIndex={isActive ? 0 : -1}
            onKeyDown={(e) => {
              const idx = items.findIndex((i) => i.value === item.value);
              if (e.key === 'ArrowRight') {
                const next = items.slice(idx + 1).find((i) => !i.disabled);
                if (next) { handleSelect(next.value); document.getElementById(`${id}-tab-${next.value}`)?.focus(); }
              } else if (e.key === 'ArrowLeft') {
                const prev = items.slice(0, idx).reverse().find((i) => !i.disabled);
                if (prev) { handleSelect(prev.value); document.getElementById(`${id}-tab-${prev.value}`)?.focus(); }
              }
            }}
          >
            {item.icon && <span className="kiln-tabs__tab-icon" aria-hidden="true">{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
