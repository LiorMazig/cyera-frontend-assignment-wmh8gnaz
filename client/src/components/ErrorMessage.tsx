import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { ApiError } from '../api/types';
import { useTranslation } from '../hooks/useTranslation';

interface ErrorMessageProps {
  error: ApiError | undefined;
  onClose: () => void;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  error,
  onClose,
  onRetry,
}: ErrorMessageProps) => {
  const { t } = useTranslation();

  if (!error) return null;

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        sx={{ width: '100%' }}
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              {t('actions.retry')}
            </Button>
          )
        }
      >
        {error.message || t('errors.unexpected')}
      </Alert>
    </Snackbar>
  );
};
