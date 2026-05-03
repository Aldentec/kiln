import React from 'react';
import { Textarea } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const TextareaPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
    <Textarea label="Description" placeholder="Describe your project..." rows={3} />
    <Textarea label="Bio" helperText="Up to 200 characters" defaultValue="Indie developer building things." rows={3} />
    <Textarea label="Notes" errorText="This field is required" rows={3} />
  </div>
);

export const textarea: ComponentDoc = {
  id: 'textarea',
  name: 'Textarea',
  description: 'Multi-line text input with label, character count, and validation state.',
  preview: TextareaPreview,
  code: `import { Textarea } from '@doriansmith/kiln';

<Textarea label="Description" placeholder="Describe your project..." rows={3} />

<Textarea
  label="Bio"
  helperText="Up to 200 characters"
  defaultValue="Indie developer building things."
  rows={3}
/>

<Textarea
  label="Notes"
  errorText="This field is required"
  rows={3}
/>`,
  props: [
    { name: 'label', type: 'string', default: '—', required: false, description: 'Visible label linked via htmlFor/id' },
    { name: 'helperText', type: 'string', default: '—', required: false, description: 'Subtext shown below the textarea' },
    { name: 'errorText', type: 'string', default: '—', required: false, description: 'Validation error (overrides helperText)' },
    { name: 'id', type: 'string', default: 'auto', required: false, description: 'HTML id (auto-generated if omitted)' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the wrapper' },
    { name: '...rest', type: 'React.TextareaHTMLAttributes', default: '—', required: false, description: 'All standard <textarea> attributes' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '@doriansmith/kiln';

it('renders label', () => {
  render(<Textarea label="Notes" />);
  expect(screen.getByLabelText('Notes')).toBeInTheDocument();
});

it('shows error and links aria-describedby', () => {
  render(<Textarea label="Bio" errorText="Required" />);
  expect(screen.getByText('Required')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby');
});`,
  usage: `// Controlled with React Hook Form
<Textarea
  label="Project description"
  rows={5}
  {...register('description', { required: 'Required' })}
  errorText={errors.description?.message}
/>`,
};
