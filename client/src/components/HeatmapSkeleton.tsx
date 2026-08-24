import { ScanDto } from '../../../common/dtos/scan.dto';
import { useHeatmapData } from '../hooks/useHeatmapData';

interface HeatmapSkeletonProps {
  year: number;
}

/** Stable empty reference so the grid is not rebuilt on every render. */
const NO_SCANS: ScanDto[] = [];

/**
 * Placeholder shaped like the real grid for the selected year, so the layout
 * does not shift once the scans arrive.
 */
export const HeatmapSkeleton = ({ year }: HeatmapSkeletonProps) => {
  const { months } = useHeatmapData(NO_SCANS, year);

  return (
    <div className="heatmap" aria-busy="true" aria-label="Loading scans">
      {months.map(({ month, label, days }) => (
        <div className="heatmap-row" key={month}>
          <div className="heatmap-month-label">{label}</div>
          {days.map(({ dateKey }) => (
            <div key={dateKey} className="heatmap-box heatmap-box--loading" />
          ))}
        </div>
      ))}
    </div>
  );
};
