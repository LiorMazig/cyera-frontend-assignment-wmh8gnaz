export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const MONTHS_IN_YEAR = 12;

/**
 * Upper bounds (as a ratio of the maximum daily scans) for levels 2…4.
 * A day above the last bound is level 5; a day with no scans is level 1.
 */
export const HEATMAP_LEVEL_RATIOS = [0.25, 0.5, 0.75] as const;

export const SCANS_QUERY_KEY = 'scans';
export const CLOUD_PROVIDERS_QUERY_KEY = 'cloud-providers';

export const COLOR_SCHEME_STORAGE_KEY = 'cyera-heatmap-color-scheme';

export const PREFERS_LIGHT_QUERY = '(prefers-color-scheme: light)';
