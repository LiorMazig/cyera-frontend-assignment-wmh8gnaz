import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from '../hooks/useTranslation';
import { HeatmapLevel } from '../types/heatmap';
import { HEATMAP_LEVELS, getLevelPercentRange } from '../utils/heatmap';

interface HeatmapLegendProps {
  hoveredLevel: HeatmapLevel | null;
  onHoverLevel: (level: HeatmapLevel | null) => void;
}

export const HeatmapLegend = ({
  hoveredLevel,
  onHoverLevel,
}: HeatmapLegendProps) => {
  const { t } = useTranslation();

  const getLevelLabel = (level: HeatmapLevel): string => {
    const range = getLevelPercentRange(level);

    return range ? t('legend.range', range) : t('legend.noScans');
  };

  return (
    <div className="heatmap-legend">
      <span className="heatmap-legend-caption">{t('legend.less')}</span>
      {HEATMAP_LEVELS.map((level) => (
        <Tooltip key={level} title={getLevelLabel(level)} arrow disableInteractive>
          <div
            className={`heatmap-legend-swatch color${level}${
              hoveredLevel === level ? ' heatmap-legend-swatch--active' : ''
            }`}
            onMouseEnter={() => onHoverLevel(level)}
            onMouseLeave={() => onHoverLevel(null)}
            aria-label={getLevelLabel(level)}
          />
        </Tooltip>
      ))}
      <span className="heatmap-legend-caption">{t('legend.more')}</span>
    </div>
  );
};
