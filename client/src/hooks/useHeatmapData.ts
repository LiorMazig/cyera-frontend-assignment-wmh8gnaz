import { useMemo } from 'react';
import { ScanDto } from '../../../common/dtos/scan.dto';
import { HeatmapData } from '../types/heatmap';
import { buildHeatmapData } from '../utils/heatmap';

/**
 * Derives the heatmap rows and the maximum daily scan count for a year.
 * `today` is resolved once per render pass so every box shares the same "now".
 */
export const useHeatmapData = (scans: ScanDto[], year: number): HeatmapData =>
  useMemo(() => buildHeatmapData(scans, year, new Date()), [scans, year]);
