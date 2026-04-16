# Frontend API Integration

This document describes how the frontend interacts with backend endpoints.

## API Logic Location

- All frontend API calls are implemented in `src/api.ts`.
- The frontend uses a shared `request()` helper to send requests and parse JSON responses.

## Available API Calls

### 1. Fetch available books

- **Endpoint:** `/api/books`
- **Method:** `GET`
- **Request payload:** None
- **Response example:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "isbn": "9780132350884",
        "isAvailable": true,
        "checkedOutBy": null,
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z"
      }
    ]
  }
  ```
- **Error handling:** The request helper throws an error if `response.ok` is false. The UI captures the message and displays it to the user.

### 2. Checkout a book

- **Endpoint:** `/api/checkout`
- **Method:** `POST`
- **Request payload example:**
  ```json
  {
    "bookId": 1,
    "borrowerName": "Jane Doe"
  }
  ```
- **Response example:**
  ```json
  {
    "message": "Book checked out successfully",
    "data": {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "isbn": "9780132350884",
      "isAvailable": false,
      "checkedOutBy": "Jane Doe",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
  ```
- **Error handling:** Validation and backend errors are surfaced through thrown exceptions. The context provider catches them and sets an error state.

### 3. Return a book

- **Endpoint:** `/api/return`
- **Method:** `POST`
- **Request payload example:**
  ```json
  {
    "bookId": 1
  }
  ```
- **Response example:**
  ```json
  {
    "message": "Book returned successfully",
    "data": {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "isbn": "9780132350884",
      "isAvailable": true,
      "checkedOutBy": null,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  }
  ```
- **Error handling:** Errors are thrown when the payload is invalid or the backend returns an error. The frontend catches and displays these errors.
