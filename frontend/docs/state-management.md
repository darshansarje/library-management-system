# Frontend State Management

## Approach

This frontend uses the **React Context API** combined with a **reducer-based state pattern**.

- Global state is provided by `src/context/LibraryContext.tsx`.
- The context stores application state and dispatch functions.
- Components use `useLibrary()` to read state and trigger actions.

## Data Flow

1. `App.tsx` renders the application inside `LibraryProvider`.
2. `LibraryProvider` initializes state using `useReducer`.
3. When the app mounts, `loadBooks()` fetches available books and updates state.
4. Components call context actions such as `handleCheckout()` and `handleReturn()`.
5. The reducer updates state and triggers re-renders across subscribed components.

## Global vs Local State

### Global state

Stored in `LibraryContext`:

- `books` — current available books list
- `loading` — active API request status
- `error` — error messages for user display
- `success` — success messages for user display
- `selectedBookId` — currently selected book for checkout
- `borrowerName` — text input for checkout
- `returnBookId` — text input for return

### Local state

This frontend does not use separate local component state for the checkout or return UI fields. Instead, the form values are stored globally to keep the UI and form actions synchronized.

## Why this approach?

- Simple and lightweight for this application size.
- Avoids the complexity of external state libraries like Redux.
- Makes it easy to share state across multiple components.
- Provides a clear single source of truth for book and form state.
