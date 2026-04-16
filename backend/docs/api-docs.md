# Backend API Documentation

## Overview

This backend exposes a small REST API to manage library book checkouts and returns.

## Endpoints

### GET `/api/books`

- **Description:** Returns the list of books that are currently available for checkout.
- **Auth required:** Yes
- **Request body:** None
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

### POST `/api/checkout`

- **Description:** Marks a book as checked out by a borrower.
- **Auth required:** Yes
- **Request body example:**
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

### POST `/api/return`

- **Description:** Returns a previously checked-out book to the library inventory.
- **Auth required:** Yes
- **Request body example:**
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

### GET `/health`

- **Description:** Health check endpoint for the server.
- **Auth required:** No
- **Request body:** None
- **Response example:**
  ```json
  {
    "status": "ok"
  }
  ```
