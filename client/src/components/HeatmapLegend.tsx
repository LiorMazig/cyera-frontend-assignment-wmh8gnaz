import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from '../hooks/useTranslation';
import { HeatmapLevel } from '../types/heatmap';
import { HEATMAP_LEVELS, getLevelPercentRange } from '../utils/heatmap';

interface HeatmapLegendProps {
  onHoverLevel: (level: HeatmapLevel | null) => void;
}

export const HeatmapLegend = ({ onHoverLevel }: HeatmapLegendProps) => {
  const { t } = useTranslation();

  const getLevelLabel = (level: HeatmapLevel): string => {
    const range = getLevelPercentRange(level);

    return range ? t('legend.range', range) : t('legend.noScans');
  };

  return (
    <div className="heatmap-legend">
      <span className="heatmap-legend-caption">{t('legend.less')}</span>
      {HEATMAP_LEVELS.map((level) => (
        <Tooltip
          key={level}
          title={getLevelLabel(level)}
          arrow
          disableInteractive
        >
          {/* A button, so the highlight is reachable by keyboard as well as
              by mouse — focus and hover drive the same callback. */}
          <button
            type="button"
            className={`heatmap-legend-swatch color${level}`}
            aria-label={getLevelLabel(level)}
            onMouseEnter={() => onHoverLevel(level)}
            onMouseLeave={() => onHoverLevel(null)}
            onFocus={() => onHoverLevel(level)}
            onBlur={() => onHoverLevel(null)}
          />
        </Tooltip>
      ))}
      <span className="heatmap-legend-caption">{t('legend.more')}</span>
    </div>
  );
};
