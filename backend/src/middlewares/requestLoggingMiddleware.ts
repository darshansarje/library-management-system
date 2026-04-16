import { NextFunction, Request, Response } from "express";

import { logger } from "../utils/logger";

/**
 * Middleware that logs request completion details after each response.
 *
 * Tracks the request duration and writes a structured log entry when the response finishes.
 */
export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info("HTTP request completed", {
      method: req.method,
      path: req.originalUrl,
      requestId: req.requestId,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt
    });
  });

  next();
}
