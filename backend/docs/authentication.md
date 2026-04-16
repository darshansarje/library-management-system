# Backend Authentication

## Auth Strategy

This backend uses a simple **API key authentication** strategy.

- The middleware `src/middlewares/authMiddleware.ts` validates incoming requests to `/api`.
- Valid keys are accepted from either:
  - `x-api-key` header
  - `Authorization: Bearer <key>` header
- The key is compared against `LIBRARY_API_KEY` in environment configuration.

## Token Lifecycle

- There is no JWT or session token lifecycle in this implementation.
- Authentication is stateless and based solely on the API key provided with each request.
- The API key remains valid until it is changed in the environment.

## Role-Based Access Control

- Role-based access control is not implemented.
- All authenticated requests have the same permissions for API operations.

## Authentication Errors

- If the API key is missing or invalid, the server responds with an `AppError`:
  - Status: `401`
  - Code: `UNAUTHORIZED`
  - Message: `Unauthorized request`

## Notes

This authentication approach is appropriate for small internal services and development setups, but a production-ready app should use a stronger auth mechanism such as JWT, OAuth, or sessions with RBAC.
