import { ONE_DAY_IN_MS } from '../constants';

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

export const formatFullDate = (date: Date): string =>
  date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
