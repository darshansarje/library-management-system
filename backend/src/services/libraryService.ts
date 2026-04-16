import { bookModel } from "../models/bookModel";
import { AppError } from "../errors/AppError";
import { Book, CheckoutBookInput, ReturnBookInput } from "../types/book";

/**
 * Service layer for library operations.
 * Handles business logic for book management including checkout and return processes.
 */
export const libraryService = {
  /**
   * Retrieves all available books that can be checked out.
   * @returns Promise resolving to array of available books
   */
  async getAvailableBooks(): Promise<Book[]> {
    return bookModel.findAvailableBooks();
  },

  /**
   * Checks out a book for a borrower.
   * @param input - Checkout details including book ID and borrower name
   * @returns Promise resolving to the updated book record
   * @throws AppError if book not found or already checked out
   */
  async checkoutBook(input: CheckoutBookInput): Promise<Book> {
    const wasUpdated = await bookModel.markAsCheckedOut(input);

    if (!wasUpdated) {
      const existingBook = await bookModel.findById(input.bookId);

      if (!existingBook) {
        throw new AppError(404, "BOOK_NOT_FOUND", "Book not found");
      }

      throw new AppError(409, "BOOK_UNAVAILABLE", "Book is already checked out");
    }

    const updatedBook = await bookModel.findById(input.bookId);

    if (!updatedBook) {
      throw new AppError(404, "BOOK_NOT_FOUND", "Book not found");
    }

    return updatedBook;
  },

  /**
   * Returns a checked-out book to the library.
   * @param input - Return details including book ID
   * @returns Promise resolving to the updated book record
   * @throws AppError if book not found or already returned
   */
  async returnBook(input: ReturnBookInput): Promise<Book> {
    const wasUpdated = await bookModel.markAsReturned(input.bookId);

    if (!wasUpdated) {
      const existingBook = await bookModel.findById(input.bookId);

      if (!existingBook) {
        throw new AppError(404, "BOOK_NOT_FOUND", "Book not found");
      }

      throw new AppError(409, "BOOK_ALREADY_RETURNED", "Book is already available in the library");
    }

    const updatedBook = await bookModel.findById(input.bookId);

    if (!updatedBook) {
      throw new AppError(404, "BOOK_NOT_FOUND", "Book not found");
    }

    return updatedBook;
  }
};
