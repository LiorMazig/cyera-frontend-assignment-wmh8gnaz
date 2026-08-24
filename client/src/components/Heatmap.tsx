import { ScanDto } from '../../../common/dtos/scan.dto';

interface HeatmapProps {
  scans: ScanDto[];
}

export const Heatmap = ({ scans }: HeatmapProps) => {
  return <div>implement heatmap here with {scans.length} scans</div>;
};
