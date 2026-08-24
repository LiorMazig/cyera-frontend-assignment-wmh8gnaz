export interface GetScansParams {
  startDate?: string;
  endDate?: string;
  cloudProvidersIds?: string[];
}

export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Error thrown by the api layer. Structurally an `ApiError`, so it can be
 * handed straight to error UI, while still being a real `Error` for react-query.
 */
export class ApiRequestError extends Error implements ApiError {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}
