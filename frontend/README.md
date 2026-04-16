# Library Management Frontend

This frontend is a React + TypeScript application built with Vite.

## Features

- Homepage showing available books from the backend
- Checkout form for borrowing books with borrower name
- Return form for returning books by book ID
- Responsive design for mobile and desktop
- State managed with React Context API for global state

## State management approach

The app uses React Context API to manage global state, avoiding prop drilling. The `LibraryContext` provides:

- Global state for books, loading, errors, success messages, and form inputs
- Actions for loading books, checking out, and returning books
- Setters for form inputs

This approach is suitable because it centralizes state management in a single context, making it easy to access state and actions from any component without passing props through multiple levels. The reducer pattern is used internally for predictable state updates.

## Local development

From the `frontend` folder:

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to `http://localhost:3000`.

## Build

```bash
npm run build
```
