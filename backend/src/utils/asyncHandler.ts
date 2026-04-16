import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * Wraps an asynchronous Express route handler and forwards any thrown errors to next().
 *
 * This prevents the need for manual try/catch blocks within every async route.
 *
 * @param handler - Async route handler function.
 * @returns Synchronous Express middleware function.
 */
export function asyncHandler(handler: AsyncRouteHandler): RequestHandler {
  return (req, res, next) => {
    void handler(req, res, next).catch(next);
  };
}
