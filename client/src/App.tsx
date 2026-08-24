import { useState } from 'react';
import './styles.css';
import { Heatmap } from './components/Heatmap';
import { YearPicker } from './components/YearPicker';
import { CloudPrivderSelect } from './components/CloudPrivderSelect';
import { ErrorMessage } from './components/ErrorMessage';
import { useCloudProviders } from './api/useCloudProviders';
import { useScans } from './api/useScans';
import { ApiError } from './api/types';

export default function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [dismissedError, setDismissedError] = useState<ApiError>();

  const { data: cloudProviders = [], error: cloudProvidersError } =
    useCloudProviders();
  const { data: scans = [], error: scansError } = useScans(
    year,
    selectedProviders
  );

  // react-query hands back a new error instance per failure, so dismissing one
  // does not hide the next.
  const error = scansError ?? cloudProvidersError ?? undefined;
  const visibleError = error === dismissedError ? undefined : error;

  return (
    <div className="app">
      <ErrorMessage
        error={visibleError}
        onClose={() => setDismissedError(error)}
      />
      <div className="filters">
        <YearPicker value={year} onChange={setYear} disableFuture />
        <CloudPrivderSelect
          options={cloudProviders.map((provider) => ({
            displayName: provider.displayName,
            value: provider.id,
          }))}
          onChange={setSelectedProviders}
          selectedOptions={selectedProviders}
        />
      </div>
      <Heatmap scans={scans} year={year} />
    </div>
  );
}
