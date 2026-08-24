import { ScanDto } from '../../../common/dtos/scan.dto';
import { SCANS_ERROR_TITLE } from '../constants';
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
  if (isError) {
    return (
      <ErrorState
        title={SCANS_ERROR_TITLE}
        message={errorMessage}
        onRetry={onRetry}
        isRetrying={isFetching}
      />
    );
  }

  if (isPending) return <HeatmapSkeleton year={year} />;

  return <Heatmap scans={scans} year={year} />;
};
