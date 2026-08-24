import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { COLOR_SCHEME_STORAGE_KEY } from '../constants';
import { ColorScheme } from '../types/theme';
import { getOppositeColorScheme, resolveColorScheme } from '../utils/theme';

export interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

export const ColorSchemeContext = createContext<
  ColorSchemeContextValue | undefined
>(undefined);

const initialColorScheme = resolveColorScheme(
  localStorage.getItem(COLOR_SCHEME_STORAGE_KEY),
  window.matchMedia('(prefers-color-scheme: light)').matches
);

// Applied before the first paint, so a light-mode user never sees a dark frame.
document.documentElement.dataset.theme = initialColorScheme;

interface AppThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(initialColorScheme);

  // The attribute is what our own css reacts to, so toggling repaints the
  // boxes without re-rendering them.
  useEffect(() => {
    document.documentElement.dataset.theme = colorScheme;
    localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, colorScheme);
  }, [colorScheme]);

  const toggleColorScheme = useCallback(
    () => setColorScheme(getOppositeColorScheme),
    []
  );

  const theme = useMemo(
    () => createTheme({ palette: { mode: colorScheme } }),
    [colorScheme]
  );

  const value = useMemo<ColorSchemeContextValue>(
    () => ({ colorScheme, setColorScheme, toggleColorScheme }),
    [colorScheme, toggleColorScheme]
  );

  return (
    <ColorSchemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorSchemeContext.Provider>
  );
};
