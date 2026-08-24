import { ScanDto } from '../../../common/dtos/scan.dto';
import { HEATMAP_LEVEL_RATIOS, MONTH_LABELS } from '../constants';
import { HeatmapData, HeatmapLevel, HeatmapMonth } from '../types/heatmap';
import { getDaysInMonth, getYesterday, toDateKey } from './date';

/** Number of scans per local calendar day, keyed by `YYYY-MM-DD`. */
export const countScansByDay = (scans: ScanDto[]): Map<string, number> => {
  const countsByDay = new Map<string, number>();

  scans.forEach((scan) => {
    const dateKey = toDateKey(new Date(scan.date));

    countsByDay.set(dateKey, (countsByDay.get(dateKey) ?? 0) + 1);
  });

  return countsByDay;
};

/**
 * Last day the heatmap may show for a year: yesterday for the current year,
 * Dec 31 for a past year. `null` when nothing is visible yet (a future year, or
 * the current year on Jan 1st — when yesterday still belongs to the year before).
 */
export const getLastVisibleDate = (year: number, today: Date): Date | null => {
  const yesterday = getYesterday(today);
  const endOfYear = new Date(year, 11, 31);
  const lastVisibleDate = yesterday < endOfYear ? yesterday : endOfYear;

  return lastVisibleDate.getFullYear() === year ? lastVisibleDate : null;
};

export const getScanLevel = (
  scanCount: number,
  maxDailyScans: number
): HeatmapLevel => {
  if (scanCount <= 0 || maxDailyScans <= 0) return 1;

  const ratio = scanCount / maxDailyScans;
  const levelIndex = HEATMAP_LEVEL_RATIOS.findIndex(
    (maxRatio) => ratio <= maxRatio
  );

  return levelIndex === -1 ? 5 : ((levelIndex + 2) as HeatmapLevel);
};

/**
 * Builds the month rows for a year, up to and including the last visible day,
 * and colors each day relative to the busiest *visible* day. Scans outside the
 * visible range (e.g. future dates the API returns for the current year) are
 * excluded from both the grid and the maximum.
 */
export const buildHeatmapData = (
  scans: ScanDto[],
  year: number,
  today: Date
): HeatmapData => {
  const lastVisibleDate = getLastVisibleDate(year, today);

  if (!lastVisibleDate) return { months: [], maxDailyScans: 0 };

  const lastMonth = lastVisibleDate.getMonth();
  const countsByDay = countScansByDay(scans);

  const visibleDays = Array.from({ length: lastMonth + 1 }, (_, month) => {
    const lastDayOfMonth =
      month === lastMonth
        ? lastVisibleDate.getDate()
        : getDaysInMonth(year, month);

    return Array.from({ length: lastDayOfMonth }, (_, dayIndex) => {
      const date = new Date(year, month, dayIndex + 1);
      const dateKey = toDateKey(date);

      return {
        date,
        dateKey,
        dayOfMonth: dayIndex + 1,
        scanCount: countsByDay.get(dateKey) ?? 0,
      };
    });
  });

  const maxDailyScans = visibleDays
    .flat()
    .reduce((max, { scanCount }) => Math.max(max, scanCount), 0);

  const months: HeatmapMonth[] = visibleDays.map((days, month) => ({
    month,
    label: MONTH_LABELS[month],
    days: days.map((day) => ({
      ...day,
      level: getScanLevel(day.scanCount, maxDailyScans),
    })),
  }));

  return { months, maxDailyScans };
};
