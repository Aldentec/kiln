import React from 'react';
import { Input } from '@doriansmith/kiln';
import type { ComponentDoc } from './types';

const InputPreview: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
    <Input label="Email address" placeholder="you@example.com" />
    <Input label="Username" helperText="3–20 characters, letters and numbers only" defaultValue="dorian_dev" />
    <Input label="Password" errorText="Must be at least 8 characters" defaultValue="pass" type="password" />
  </div>
);

export const input: ComponentDoc = {
  id: 'input',
  name: 'Input',
  description: 'Text input with floating label, helper text, error state, and loading indicator.',
  preview: InputPreview,
  code: `import { Input } from '@doriansmith/kiln';

// Basic
<Input label="Email" placeholder="you@example.com" type="email" />

// With helper text
<Input
  label="Username"
  helperText="3–20 characters, letters and numbers only"
/>

// Error state
<Input
  label="Password"
  type="password"
  errorText="Must be at least 8 characters"
/>`,
  props: [
    { name: 'label', type: 'string', default: '—', required: false, description: 'Visible label linked via htmlFor/id' },
    { name: 'helperText', type: 'string', default: '—', required: false, description: 'Subtext shown below the input' },
    { name: 'errorText', type: 'string', default: '—', required: false, description: 'Validation error (overrides helperText)' },
    { name: 'loading', type: 'boolean', default: 'false', required: false, description: 'Shows a spinner inside the input' },
    { name: 'id', type: 'string', default: 'auto', required: false, description: 'HTML id (auto-generated if omitted)' },
    { name: 'className', type: 'string', default: '—', required: false, description: 'Additional CSS classes on the wrapper' },
    { name: '...rest', type: 'React.InputHTMLAttributes', default: '—', required: false, description: 'All standard <input> attributes' },
  ],
  testing: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@doriansmith/kiln';

it('renders label', () => {
  render(<Input label="Email" />);
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
});

it('shows error text and sets aria-describedby', () => {
  render(<Input label="Email" errorText="Invalid email" />);
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby');
});

it('accepts typed input', async () => {
  render(<Input label="Name" />);
  await userEvent.type(screen.getByRole('textbox'), 'Alice');
  expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
});`,
  usage: `// Controlled form field
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<Input
  label="Email address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  errorText={error}
/>

// With React Hook Form
<Input
  label="Username"
  {...register('username', { required: 'Required' })}
  errorText={errors.username?.message}
/>`,
};
