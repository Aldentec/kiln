import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import the Kiln token + component CSS bundle (resolved via src alias in dev)
import '../src/styles/index.css';


const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
createRoot(root).render(<App />);
