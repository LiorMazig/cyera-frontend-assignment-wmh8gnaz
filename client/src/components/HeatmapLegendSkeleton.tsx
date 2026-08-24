import { useTranslation } from '../hooks/useTranslation';
import { HEATMAP_LEVELS } from '../utils/heatmap';

/**
 * Same geometry as the real legend — the captions carry their real text and the
 * swatches keep their class — so the legend does not appear and shift the grid
 * down once the scans arrive. Non-interactive: plain divs, not buttons.
 */
export const HeatmapLegendSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className="heatmap-legend" aria-hidden="true">
      <span className="heatmap-legend-caption">{t('legend.less')}</span>
      {HEATMAP_LEVELS.map((level) => (
        <div
          key={level}
          className="heatmap-legend-swatch heatmap-legend-swatch--loading"
        />
      ))}
      <span className="heatmap-legend-caption">{t('legend.more')}</span>
    </div>
  );
};
