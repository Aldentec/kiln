import React from 'react';
import { Accordion } from '@doriansmith/kiln';
import type { AccordionItem } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const AccordionPreview: React.FC = () => {
  const items: AccordionItem[] = [
    { id: 'q1', title: 'What is Kiln?', content: 'A CSS-first React component library built for indie developers and small teams.' },
    { id: 'q2', title: 'Does it support dark mode?', content: 'Yes — add data-theme="dark" to <html> and every component adapts automatically.' },
    { id: 'q3', title: 'Is TypeScript required?', content: 'No, but all props are fully typed with inferred generics for a smooth DX.' },
  ];
  return <Accordion items={items} defaultOpenIds={['q1']} />;
};

export const accordion: ComponentDoc = {
  id: 'accordion',
  name: 'Accordion',
  description: 'Collapsible content panels for revealing hierarchical information progressively.',
  preview: AccordionPreview,
  code: `import { Accordion } from '@doriansmith/kiln';

const items = [
  { id: 'q1', title: 'What is Kiln?', content: 'A CSS-first React component library.' },
  { id: 'q2', title: 'Does it support dark mode?', content: 'Yes — set data-theme="dark" on <html>.' },
];

<Accordion items={items} defaultOpenIds={['q1']} />`,
  props: [
    { name: 'items', type: 'AccordionItem[]', default: '—', required: true, description: 'Array of accordion items (id, title, content, disabled?)' },
    { name: 'allowMultiple', type: 'boolean', default: 'false', required: false, description: 'Allow multiple items open simultaneously' },
    { name: 'defaultOpenIds', type: 'string[]', default: '[]', required: false, description: 'IDs open on first render (uncontrolled)' },
    { name: 'openIds', type: 'string[]', default: '—', required: false, description: 'Controlled open IDs array' },
    { name: 'onChange', type: '(openIds: string[]) => void', default: '—', required: false, description: 'Fired when open state changes' },
    { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    { name: 'style', type: 'React.CSSProperties', default: '—', required: false, description: 'Inline styles for token overrides' },
  ],
  testing: `import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '@doriansmith/kiln';

const items = [
  { id: 'a', title: 'Section A', content: 'Content A' },
  { id: 'b', title: 'Section B', content: 'Content B' },
];

it('opens an item on click', async () => {
  render(<Accordion items={items} />);
  fireEvent.click(screen.getByText('Section A'));
  expect(screen.getByText('Content A')).toBeVisible();
});

it('closes an open item on second click', async () => {
  render(<Accordion items={items} defaultOpenIds={['a']} />);
  fireEvent.click(screen.getByText('Section A'));
  expect(screen.queryByText('Content A')).not.toBeVisible();
});

it('allows multiple open when allowMultiple=true', () => {
  render(<Accordion items={items} allowMultiple />);
  fireEvent.click(screen.getByText('Section A'));
  fireEvent.click(screen.getByText('Section B'));
  expect(screen.getByText('Content A')).toBeVisible();
  expect(screen.getByText('Content B')).toBeVisible();
});`,
  usage: `// FAQ section
<Accordion
  items={faqs}
  allowMultiple
/>

// Controlled — manage open state externally
const [openIds, setOpenIds] = useState(['intro']);
<Accordion
  items={sections}
  openIds={openIds}
  onChange={setOpenIds}
/>

// Disabled item
const items = [
  { id: 'a', title: 'Available', content: '...' },
  { id: 'b', title: 'Coming soon', content: '...', disabled: true },
];`,
};
