/**
 * `localStorage` access throws outright in some privacy modes, and this runs at
 * import time — an unguarded read would blank the app before React mounts.
 * Persistence is a convenience, so failures are swallowed.
 */
export const readStoredValue = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeStoredValue = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage unavailable or full — the in-memory value still applies
  }
};

/** `matchMedia` is missing in some non-browser environments. */
export const matchesMedia = (query: string): boolean => {
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
};
