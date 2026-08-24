import { ScanDto } from '../../../common/dtos/scan.dto';
import { useHeatmapData } from '../hooks/useHeatmapData';
import { useTranslation } from '../hooks/useTranslation';
import { HeatmapLegendSkeleton } from './HeatmapLegendSkeleton';

interface HeatmapSkeletonProps {
  year: number;
}

/** Stable empty reference so the grid is not rebuilt on every render. */
const NO_SCANS: ScanDto[] = [];

/**
 * Placeholder shaped like the real grid for the selected year — same container,
 * same legend geometry, same row count — so nothing shifts once the scans land.
 */
export const HeatmapSkeleton = ({ year }: HeatmapSkeletonProps) => {
  const { months } = useHeatmapData(NO_SCANS, year);
  const { t } = useTranslation();

  return (
    <div className="heatmap-container">
      <HeatmapLegendSkeleton />
      <div className="heatmap" aria-busy="true" aria-label={t('heatmap.loading')}>
        {months.map(({ month, label, days }) => (
          <div className="heatmap-row" key={month}>
            <div className="heatmap-month-label">{label}</div>
            {days.map(({ dateKey }) => (
              <div key={dateKey} className="heatmap-box heatmap-box--loading" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
