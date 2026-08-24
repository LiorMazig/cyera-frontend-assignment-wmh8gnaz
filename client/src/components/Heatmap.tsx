import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { ScanDto } from '../../../common/dtos/scan.dto';
import { useHeatmapData } from '../hooks/useHeatmapData';
import { useTranslation } from '../hooks/useTranslation';
import { HeatmapLevel } from '../types/heatmap';
import { formatFullDate } from '../utils/date';
import { getBoxClassName } from '../utils/heatmap';
import { HeatmapLegend } from './HeatmapLegend';

interface HeatmapProps {
  scans: ScanDto[];
  year: number;
}

export const Heatmap = ({ scans, year }: HeatmapProps) => {
  const { months } = useHeatmapData(scans, year);
  const { t, locale } = useTranslation();
  const [hoveredLevel, setHoveredLevel] = useState<HeatmapLevel | null>(null);

  if (!months.length) {
    return <div className="heatmap-empty">{t('heatmap.empty', { year })}</div>;
  }

  return (
    // The hovered level is an attribute rather than a class on every box: css
    // dims the non-matching levels, so hovering the legend repaints without
    // re-rendering a few hundred boxes and their tooltips.
    <div
      className="heatmap-container"
      data-hovered-level={hoveredLevel ?? undefined}
    >
      <HeatmapLegend onHoverLevel={setHoveredLevel} />
      <div className="heatmap">
        {months.map(({ month, label, days }) => (
          <div className="heatmap-row" key={month}>
            <div className="heatmap-month-label">{label}</div>
            {days.map(({ dateKey, date, scanCount, level }) => (
              <Tooltip
                key={dateKey}
                title={t(
                  scanCount === 1 ? 'heatmap.tooltipSingle' : 'heatmap.tooltip',
                  { count: scanCount, date: formatFullDate(date, locale) }
                )}
                arrow
                disableInteractive
              >
                <div className={getBoxClassName(level)} />
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
