import { ScanDto } from '../../../common/dtos/scan.dto';
import { useTranslation } from '../hooks/useTranslation';
import { ErrorState } from './ErrorState';
import { Heatmap } from './Heatmap';
import { HeatmapSkeleton } from './HeatmapSkeleton';

interface HeatmapPanelProps {
  scans: ScanDto[];
  year: number;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  isFetching: boolean;
  onRetry: () => void;
}

/** Picks between the error placeholder, the loading skeleton and the heatmap. */
export const HeatmapPanel = ({
  scans,
  year,
  isPending,
  isError,
  errorMessage,
  isFetching,
  onRetry,
}: HeatmapPanelProps) => {
  const { t } = useTranslation();

  if (isError) {
    return (
      <ErrorState
        title={t('errors.scansTitle')}
        message={errorMessage}
        onRetry={onRetry}
        isRetrying={isFetching}
      />
    );
  }

  if (isPending) return <HeatmapSkeleton year={year} />;

  return <Heatmap scans={scans} year={year} />;
};
