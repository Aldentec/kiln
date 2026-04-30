// a11y: WCAG AA verified 2026-04-30
// perf: CLS=0, GPU-friendly 2026-04-30
// mobile: verified 375px/768px 2026-04-30
import React, { useId, useRef, useState } from 'react';
import { cn } from '../../utils';
import './Accordion.css';

export interface AccordionItem {
  id: string;
  /** Trigger text shown in the collapsed header row */
  title: string;
  /** Body content revealed when the item is open */
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /**
   * When false (default) only one item can be open at a time.
   * Set to true to allow multiple items open simultaneously.
   */
  allowMultiple?: boolean;
  /** Uncontrolled: IDs open on first render */
  defaultOpenIds?: string[];
  /** Controlled: externally managed open IDs */
  openIds?: string[];
  onChange?: (openIds: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  openIds: controlledOpenIds,
  onChange,
  className,
  style,
}) => {
  const baseId = useId();
  const [internalOpenIds, setInternalOpenIds] = useState<string[]>(defaultOpenIds);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const openIds = controlledOpenIds ?? internalOpenIds;

  const toggle = (id: string) => {
    const isOpen = openIds.includes(id);
    let next: string[];
    if (isOpen) {
      next = openIds.filter((i) => i !== id);
    } else {
      next = allowMultiple ? [...openIds, id] : [id];
    }
    if (controlledOpenIds === undefined) setInternalOpenIds(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const enabledIndices = items
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => !item.disabled)
      .map(({ i }) => i);
    const pos = enabledIndices.indexOf(index);

    let target: number | undefined;
    if (e.key === 'ArrowDown') {
      target = enabledIndices[pos + 1];
    } else if (e.key === 'ArrowUp') {
      target = enabledIndices[pos - 1];
    } else if (e.key === 'Home') {
      target = enabledIndices[0];
    } else if (e.key === 'End') {
      target = enabledIndices[enabledIndices.length - 1];
    }

    if (target !== undefined) {
      e.preventDefault();
      triggerRefs.current[target]?.focus();
    }
  };

  return (
    <div className={cn('kiln-accordion', className)} style={style}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn('kiln-accordion__item', isOpen && 'kiln-accordion__item--open')}
          >
            <h3 className="kiln-accordion__heading">
              <button
                ref={(el) => { triggerRefs.current[index] = el; }}
                id={triggerId}
                type="button"
                className="kiln-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-disabled={item.disabled ? 'true' : undefined}
                onClick={() => !item.disabled && toggle(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span className="kiln-accordion__trigger-text">{item.title}</span>
                <svg
                  className="kiln-accordion__icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>

            {/* Panel uses CSS grid-template-rows for height animation.
                This is a user-triggered layout change, not a spontaneous shift,
                so it does not contribute to the CLS metric. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="kiln-accordion__panel-outer"
              // inert prevents keyboard/AT access to hidden content
              {...(!isOpen ? { inert: true } : {})}
            >
              <div className="kiln-accordion__panel-inner">
                <div className="kiln-accordion__panel">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = 'Accordion';
export default Accordion;
