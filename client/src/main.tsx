import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/query-client';
import { ErrorBoundary } from './components/ErrorBoundary';
import { I18nProvider } from './i18n/I18nProvider';
import { AppThemeProvider } from './theme/AppThemeProvider';
import App from './App.tsx';

// The boundary sits inside I18nProvider so its fallback can be translated, and
// outside AppThemeProvider so a failure in the theme layer is still caught.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ErrorBoundary>
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
        </ErrorBoundary>
      </I18nProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
