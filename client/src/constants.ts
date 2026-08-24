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

export const SCANS_QUERY_KEY = 'scans';
export const CLOUD_PROVIDERS_QUERY_KEY = 'cloud-providers';

export const CLOUD_PROVIDERS_LABEL = 'Cloud Providers';
/** Shown when nothing is selected — no filter means every provider. */
export const ALL_PROVIDERS_LABEL = 'All providers';

export const SCANS_ERROR_TITLE = "Couldn't load scans";
export const CLOUD_PROVIDERS_ERROR_TITLE = "Couldn't load cloud providers";
export const RETRY_LABEL = 'Retry';
