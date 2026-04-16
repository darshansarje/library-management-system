# Backend Database Documentation

## Tables

### `books`

- **Table name:** `books`
- **Description:** Stores library book inventory and checkout status.

#### Columns

| Column | Type | Description |
| --- | --- | --- |
| `id` | `INTEGER` | Primary key, auto-incrementing book ID. |
| `title` | `TEXT` | Book title. |
| `author` | `TEXT` | Book author(s). |
| `isbn` | `TEXT` | Book ISBN, unique. |
| `is_available` | `INTEGER` | Availability flag (`1` for available, `0` for checked out). |
| `checked_out_by` | `TEXT` | Name of the borrower when the book is checked out. |
| `created_at` | `TEXT` | Created timestamp. |
| `updated_at` | `TEXT` | Last updated timestamp. |

#### Indexes

- `idx_books_availability` on `is_available`
  - Used to efficiently query available books.

## Relationships

- There are no explicit foreign key relationships in this schema.
- The current model is a single table inventory for the library.

## ER Description

The database consists of a single `books` table. Each book record tracks whether the item is currently available or checked out, and includes the borrower's name when checked out.

This simplifies the data model for a basic library management application.
