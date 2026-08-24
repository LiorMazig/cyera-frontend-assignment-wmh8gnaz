import { MONTHS_IN_YEAR, ONE_DAY_IN_MS } from '../constants';

/** Midnight, local time, of the given date. */
export const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const addDays = (date: Date, days: number): Date =>
  new Date(date.getTime() + days * ONE_DAY_IN_MS);

/** Midnight of the day before `today`. */
export const getYesterday = (today: Date): Date =>
  addDays(startOfDay(today), -1);

/** Number of days in a given month (0-based month index). */
export const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

/**
 * `YYYY-MM-DD` key built from local date parts.
 * Local (not UTC) to stay consistent with the local year range App.tsx queries.
 */
export const toDateKey = (date: Date): string => {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
};

export const formatFullDate = (date: Date, locale: string): string =>
  date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

/**
 * Short month names for a locale, straight from `Intl` — no locale file needs
 * to carry twelve hand-translated month names.
 */
export const getMonthLabels = (locale: string): string[] => {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short' });

  return Array.from({ length: MONTHS_IN_YEAR }, (_, month) =>
    formatter.format(new Date(2000, month, 1))
  );
};

/**
 * Half-open ISO range covering a whole year in local time — `[startDate, endDate)`,
 * matching how the server filters scans.
 */
export const getYearRange = (
  year: number
): { startDate: string; endDate: string } => ({
  startDate: new Date(year, 0, 1).toISOString(),
  endDate: new Date(year + 1, 0, 1).toISOString(),
});
