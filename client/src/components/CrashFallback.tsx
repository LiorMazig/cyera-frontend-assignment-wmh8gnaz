import Button from '@mui/material/Button';
import { useTranslation } from '../hooks/useTranslation';

interface CrashFallbackProps {
  error: Error;
}

/**
 * Shown by ErrorBoundary. A function component so it can read translations;
 * the error message itself is shown as-is, since it is what identifies the bug.
 */
export const CrashFallback = ({ error }: CrashFallbackProps) => {
  const { t } = useTranslation();

  return (
    <div className="error-state" role="alert">
      <div className="error-state-title">{t('errors.crashTitle')}</div>
      <div className="error-state-message">{error.message}</div>
      <Button
        variant="outlined"
        size="small"
        onClick={() => window.location.reload()}
      >
        {t('actions.reload')}
      </Button>
    </div>
  );
};
