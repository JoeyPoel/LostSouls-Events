import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CSS_VARIABLES } from './config/theme';
import './styles/globals.css';

/**
 * Injects centralized design tokens from theme.ts dynamically into :root CSS custom properties.
 * This guarantees strict zero-hardcoding invariants while giving CSS instant access.
 */
function initializeThemeEngine(): void {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(CSS_VARIABLES)) {
    root.style.setProperty(key, value);
  }
}

initializeThemeEngine();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root DOM element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
