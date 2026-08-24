import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { RETRY_LABEL } from '../constants';
import { ApiError } from '../api/types';

interface ErrorMessageProps {
  error: ApiError | undefined;
  onClose: () => void;
  onRetry?: () => void;
}

export const ErrorMessage = ({ error, onClose, onRetry }: ErrorMessageProps) => {
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
              {RETRY_LABEL}
            </Button>
          )
        }
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
};
