import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RouteErrorBoundary } from './components/ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('React root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <RouteErrorBoundary><App /></RouteErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
