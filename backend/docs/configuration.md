# Backend Configuration

## Environment Variables

- `NODE_ENV`
  - Determines runtime mode: `development`, `production`, or `test`.
  - Default: `development`
- `PORT`
  - Port where the Express server listens.
  - Default: `3000`
- `DATABASE_FILE`
  - Path to the SQLite database file.
  - Default: `./data/library.sqlite`
  - Use `:memory:` during tests for an in-memory database.
- `LIBRARY_API_KEY`
  - API key required for authenticated requests.
  - Default: `library-secret-key`

## Middleware Explanation

The backend uses the following middleware:

- `express.json()`
  - Parses JSON request bodies.
- `attachRequestContext`
  - Adds a unique `x-request-id` value to each request and response.
- `requestLoggingMiddleware`
  - Logs request metadata and duration after each response.
- `authenticateRequest`
  - Protects `/api` routes using API key validation.
- `notFoundHandler`
  - Converts unmatched routes to a 404 AppError.
- `errorHandler`
  - Central error handling for validation, AppError, and unknown errors.

## App Startup Flow

1. The server entrypoint is `src/server.ts`.
2. It ensures the `data/` directory exists.
3. It initializes SQLite via `src/config/database.ts`.
4. Express application is imported from `src/app.ts`.
5. Middleware is mounted and routes are configured.
6. Express begins listening on `env.port`.

## Third-Party Integrations

- `Express`
  - Web framework for routing and middleware.
- `sqlite` and `sqlite3`
  - SQLite database access and driver.
- `Zod`
  - Request payload validation.
- `uuid` / `crypto`
  - Request ID generation.
- `Jest` and `Supertest`
  - Testing and API integration.
