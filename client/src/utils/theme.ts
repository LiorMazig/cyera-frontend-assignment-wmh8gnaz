import { ColorScheme } from '../types/theme';

const COLOR_SCHEMES: ColorScheme[] = ['dark', 'light'];

const isColorScheme = (value: string | null): value is ColorScheme =>
  COLOR_SCHEMES.includes(value as ColorScheme);

/**
 * A stored choice wins; otherwise follow the OS preference, falling back to the
 * dark scheme the app was designed around.
 */
export const resolveColorScheme = (
  stored: string | null,
  prefersLight: boolean
): ColorScheme => {
  if (isColorScheme(stored)) return stored;

  return prefersLight ? 'light' : 'dark';
};

export const getOppositeColorScheme = (
  colorScheme: ColorScheme
): ColorScheme => (colorScheme === 'dark' ? 'light' : 'dark');
