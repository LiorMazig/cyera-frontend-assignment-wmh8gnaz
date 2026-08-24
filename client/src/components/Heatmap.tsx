import Tooltip from '@mui/material/Tooltip';
import { ScanDto } from '../../../common/dtos/scan.dto';
import { useHeatmapData } from '../hooks/useHeatmapData';
import { formatFullDate } from '../utils/date';

interface HeatmapProps {
  scans: ScanDto[];
  year: number;
}

export const Heatmap = ({ scans, year }: HeatmapProps) => {
  const { months } = useHeatmapData(scans, year);

  if (!months.length) {
    return <div className="heatmap-empty">No days to display for {year}.</div>;
  }

  return (
    <div className="heatmap">
      {months.map(({ month, label, days }) => (
        <div className="heatmap-row" key={month}>
          <div className="heatmap-month-label">{label}</div>
          {days.map(({ dateKey, date, scanCount, level }) => (
            <Tooltip
              key={dateKey}
              title={`${scanCount} scans on ${formatFullDate(date)}`}
              arrow
              disableInteractive
            >
              <div className={`heatmap-box color${level}`} />
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  );
};
