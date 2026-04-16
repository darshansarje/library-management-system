import { getDatabase } from "../config/database";
import { Book, BookRow, CheckoutBookInput } from "../types/book";

/**
 * Maps a database row to a Book object.
 * @param row - Database row from books table
 * @returns Mapped Book object
 */
function mapBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    isbn: row.isbn,
    isAvailable: row.is_available === 1,
    checkedOutBy: row.checked_out_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

/**
 * Data access layer for book operations.
 * Handles all database interactions related to books.
 */
export const bookModel = {
  /**
   * Retrieves all books that are currently available for checkout.
   * @returns Promise resolving to array of available books
   */
  async findAvailableBooks(): Promise<Book[]> {
    const db = await getDatabase();
    const rows = await db.all<BookRow[]>(
      `
        SELECT id, title, author, isbn, is_available, checked_out_by, created_at, updated_at
        FROM books
        WHERE is_available = 1
        ORDER BY title ASC
      `
    );

    return rows.map(mapBook);
  },

  /**
   * Finds a book by its ID.
   * @param bookId - The unique identifier of the book
   * @returns Promise resolving to the book or null if not found
   */
  async findById(bookId: number): Promise<Book | null> {
    const db = await getDatabase();
    const row = await db.get<BookRow>(
      `
        SELECT id, title, author, isbn, is_available, checked_out_by, created_at, updated_at
        FROM books
        WHERE id = ?
      `,
      bookId
    );

    return row ? mapBook(row) : null;
  },

  /**
   * Marks a book as checked out by updating its availability and borrower.
   * @param input - Checkout details including book ID and borrower name
   * @returns Promise resolving to true if update was successful, false otherwise
   */
  async markAsCheckedOut(input: CheckoutBookInput): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run(
      `
        UPDATE books
        SET is_available = 0,
            checked_out_by = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
          AND is_available = 1
      `,
      input.borrowerName,
      input.bookId
    );

    return (result.changes ?? 0) > 0;
  },

  /**
   * Marks a book as returned by updating its availability.
   * @param bookId - The unique identifier of the book to return
   * @returns Promise resolving to true if update was successful, false otherwise
   */
  async markAsReturned(bookId: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.run(
      `
        UPDATE books
        SET is_available = 1,
            checked_out_by = NULL,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
          AND is_available = 0
      `,
      bookId
    );

    return (result.changes ?? 0) > 0;
  }
};
