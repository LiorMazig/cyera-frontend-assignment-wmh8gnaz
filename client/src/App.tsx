import { useState } from 'react';
import './styles.css';
import { YearPicker } from './components/YearPicker';
import { CloudPrivderSelect } from './components/CloudPrivderSelect';
import { ColorSchemeToggle } from './components/ColorSchemeToggle';
import { ErrorMessage } from './components/ErrorMessage';
import { HeatmapPanel } from './components/HeatmapPanel';
import { useCloudProviders } from './api/useCloudProviders';
import { useScans } from './api/useScans';
import { ApiError } from './api/types';
import { useProviderOptions } from './hooks/useProviderOptions';

export default function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [dismissedError, setDismissedError] = useState<ApiError>();

  const cloudProvidersQuery = useCloudProviders();
  const scansQuery = useScans(year, selectedProviders);
  const providerOptions = useProviderOptions(cloudProvidersQuery.data);

  // A failed provider list only costs the filter, so it stays a dismissible
  // snackbar; a failed scans request replaces the grid it would have filled.
  // react-query hands back a new error instance per failure, so dismissing one
  // does not hide the next.
  const providersError = cloudProvidersQuery.error ?? undefined;
  const visibleProvidersError =
    providersError === dismissedError ? undefined : providersError;

  return (
    <div className="app">
      <ErrorMessage
        error={visibleProvidersError}
        onClose={() => setDismissedError(providersError)}
        onRetry={() => cloudProvidersQuery.refetch()}
      />
      <div className="filters">
        <YearPicker value={year} onChange={setYear} disableFuture />
        <CloudPrivderSelect
          options={providerOptions}
          onChange={setSelectedProviders}
          selectedOptions={selectedProviders}
        />
        <ColorSchemeToggle />
      </div>
      <HeatmapPanel
        scans={scansQuery.data ?? []}
        year={year}
        isPending={scansQuery.isPending}
        isError={scansQuery.isError}
        errorMessage={scansQuery.error?.message}
        isFetching={scansQuery.isFetching}
        onRetry={() => scansQuery.refetch()}
      />
    </div>
  );
}
