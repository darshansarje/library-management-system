import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";

/**
 * Handles unmatched routes by forwarding a 404 AppError to the error handler.
 *
 * @param req - Express request object.
 * @param _res - Express response object.
 * @param next - Next middleware callback.
 */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(404, "ROUTE_NOT_FOUND", `Route not found: ${req.method} ${req.originalUrl}`));
}

/**
 * Centralized Express error handling middleware.
 *
 * Formats Zod validation errors, AppError instances, and unknown errors into structured JSON responses.
 *
 * @param error - The thrown error.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param _next - Next middleware callback.
 */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof ZodError) {
    logger.warn("Validation failed", {
      method: req.method,
      path: req.originalUrl,
      requestId: req.requestId,
      issues: error.issues
    });

    res.status(400).json({
      error: "Invalid request payload",
      code: "VALIDATION_ERROR",
      details: error.issues
    });
    return;
  }

  if (error instanceof AppError) {
    logger.error(error.message, {
      code: error.code,
      method: req.method,
      path: req.originalUrl,
      requestId: req.requestId,
      details: error.details
    });

    res.status(error.statusCode).json({
      error: error.message,
      code: error.code
    });
    return;
  }

  logger.error("Unhandled application error", {
    method: req.method,
    path: req.originalUrl,
    requestId: req.requestId,
    stack: error.stack
  });

  res.status(500).json({
    error: "Internal server error",
    code: "INTERNAL_SERVER_ERROR"
  });
}
