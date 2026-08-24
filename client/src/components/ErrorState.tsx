import Button from '@mui/material/Button';
import { useTranslation } from '../hooks/useTranslation';

interface ErrorStateProps {
  title: string;
  /** Server-provided detail; falls back to a translated generic message. */
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export const ErrorState = ({
  title,
  message,
  onRetry,
  isRetrying,
}: ErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <div className="error-state" role="alert">
      <div className="error-state-title">{title}</div>
      <div className="error-state-message">
        {message || t('errors.unexpected')}
      </div>
      <Button
        variant="outlined"
        size="small"
        onClick={onRetry}
        disabled={isRetrying}
      >
        {t('actions.retry')}
      </Button>
    </div>
  );
};
