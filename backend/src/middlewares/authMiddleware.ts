import { NextFunction, Request, Response } from "express";

import { env } from "../config/env";
import { AppError } from "../errors/AppError";

/**
 * Extracts the API key from the request headers.
 *
 * Supports both custom `x-api-key` and Bearer token authorization formats.
 *
 * @param req - Incoming Express request object.
 * @returns The extracted API key, or null when no valid key is present.
 */
function getApiKeyFromRequest(req: Request): string | null {
  const authorizationHeader = req.header("authorization");
  const customHeader = req.header("x-api-key");

  if (customHeader) {
    return customHeader;
  }

  if (authorizationHeader?.startsWith("Bearer ")) {
    return authorizationHeader.slice("Bearer ".length).trim();
  }

  return null;
}

/**
 * Express middleware that validates the request's API key.
 *
 * Rejects unauthorized requests with an AppError when the key is missing or invalid.
 *
 * @param req - Express request object.
 * @param _res - Express response object.
 * @param next - Next middleware callback.
 */
export function authenticateRequest(req: Request, _res: Response, next: NextFunction): void {
  const providedApiKey = getApiKeyFromRequest(req);

  if (!providedApiKey || providedApiKey !== env.apiKey) {
    next(new AppError(401, "UNAUTHORIZED", "Unauthorized request"));
    return;
  }

  next();
}
