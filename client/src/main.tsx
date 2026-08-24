import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/query-client';
import { I18nProvider } from './i18n/I18nProvider';
import { AppThemeProvider } from './theme/AppThemeProvider';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
