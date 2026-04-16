import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";

/**
 * Attaches a unique request ID to incoming requests and response headers.
 *
 * This enables traceability across logs and request lifecycle events.
 */
export function attachRequestContext(req: Request, res: Response, next: NextFunction): void {
  const requestId = req.header("x-request-id") ?? randomUUID();

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  next();
}
