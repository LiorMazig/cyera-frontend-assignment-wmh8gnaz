import { useContext } from 'react';
import {
  ColorSchemeContext,
  ColorSchemeContextValue,
} from '../theme/AppThemeProvider';

export const useColorScheme = (): ColorSchemeContextValue => {
  const context = useContext(ColorSchemeContext);

  if (!context) {
    throw new Error('useColorScheme must be used within an AppThemeProvider');
  }

  return context;
};
