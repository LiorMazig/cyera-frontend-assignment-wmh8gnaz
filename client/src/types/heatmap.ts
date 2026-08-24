/** Color level of a heatmap box, matching the `color1`…`color5` classes in styles.css. */
export type HeatmapLevel = 1 | 2 | 3 | 4 | 5;

export interface HeatmapDay {
  /** Local calendar date this box represents. */
  date: Date;
  /** `YYYY-MM-DD` key used to look the day up in a scan-count map. */
  dateKey: string;
  dayOfMonth: number;
  scanCount: number;
  level: HeatmapLevel;
}

export interface HeatmapMonth {
  /** 0-based month index (0 = January). */
  month: number;
  label: string;
  days: HeatmapDay[];
}

export interface HeatmapData {
  months: HeatmapMonth[];
  /** Highest daily scan count across the visible days only. */
  maxDailyScans: number;
}
