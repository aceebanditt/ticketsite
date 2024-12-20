export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public isRetryable: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromError(error: any): ApiError {
    if (error.isNetworkError) {
      return new ApiError(
        'Unable to connect to the server. Please check your internet connection.',
        0,
        true
      );
    }
    
    return new ApiError(
      error.message || 'An unexpected error occurred',
      error.status || 500,
      error.status ? error.status >= 500 : false
    );
  }
}

export function isRetryableError(error: any): boolean {
  return (
    error.isRetryable ||
    error.isNetworkError ||
    (error.status && error.status >= 500) ||
    error.code === 'ECONNABORTED'
  );
}