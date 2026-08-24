import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '../hooks/useColorScheme';
import { useTranslation } from '../hooks/useTranslation';

export const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { t } = useTranslation();

  const label = t(
    colorScheme === 'dark' ? 'theme.switchToLight' : 'theme.switchToDark'
  );

  return (
    <Tooltip title={label} arrow disableInteractive>
      <IconButton onClick={toggleColorScheme} aria-label={label}>
        {colorScheme === 'dark' ? (
          <LightModeIcon fontSize="small" />
        ) : (
          <DarkModeIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};
