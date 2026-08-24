import Button from '@mui/material/Button';
import { RETRY_LABEL } from '../constants';

interface ErrorStateProps {
  title: string;
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export const ErrorState = ({
  title,
  message,
  onRetry,
  isRetrying,
}: ErrorStateProps) => (
  <div className="error-state" role="alert">
    <div className="error-state-title">{title}</div>
    {message && <div className="error-state-message">{message}</div>}
    <Button
      variant="outlined"
      size="small"
      onClick={onRetry}
      disabled={isRetrying}
    >
      {RETRY_LABEL}
    </Button>
  </div>
);
