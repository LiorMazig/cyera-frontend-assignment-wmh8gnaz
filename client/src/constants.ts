export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

/** Maximum days a month can have — the number of columns in a heatmap row. */
export const MAX_DAYS_IN_MONTH = 31;

export const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/**
 * Upper bounds (as a ratio of the maximum daily scans) for levels 2…4.
 * A day above the last bound is level 5; a day with no scans is level 1.
 */
export const HEATMAP_LEVEL_RATIOS = [0.25, 0.5, 0.75] as const;
