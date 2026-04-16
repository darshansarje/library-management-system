# Frontend Structure

## Folder Structure

```text
frontend/
  ├── src/
  │   ├── api.ts
  │   ├── App.tsx
  │   ├── App.test.tsx
  │   ├── components/
  │   │   ├── BookList.tsx
  │   │   ├── CheckoutForm.tsx
  │   │   ├── ReturnForm.tsx
  │   │   └── ErrorBoundary.tsx
  │   ├── context/
  │   │   └── LibraryContext.tsx
  │   ├── main.tsx
  │   ├── setupTests.ts
  │   ├── styles.css
  │   ├── types.ts
  │   └── vite-env.d.ts
  ├── package.json
  ├── tsconfig.json
  ├── vite.config.ts
  └── README.md
```

## Main Directories

- `src/`
  - Entry point for the React application and core source files.
- `src/components/`
  - Reusable UI components, including the book list, checkout form, return form, and error boundary.
- `src/context/`
  - Global state management using React Context and `useReducer`.
- `src/api.ts`
  - API integration logic for backend calls.
- `src/types.ts`
  - Shared TypeScript interfaces used across the frontend.
- `src/styles.css`
  - Application-level styling for layout and component visuals.

## Architectural Pattern

The frontend is built with a **component-driven architecture** and a simple **feature-based structure**.

- UI elements are separated into dedicated components.
- Global state and side effects are centralized in a context provider.
- API integration is isolated in a single service-like module (`src/api.ts`).

This makes the application easy to extend and maintain for a small-to-medium feature set.
