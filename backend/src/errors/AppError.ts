/**
 * Custom error type used for application-specific HTTP errors.
 *
 * Contains a status code, an error code, and optional details payload.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  /**
   * Creates a new AppError instance.
   *
   * @param statusCode - HTTP status code to return.
   * @param code - Internal error code string.
   * @param message - Human-readable error message.
   * @param details - Optional extra error details.
   */
  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
