import type { Book, ApiResponse } from "./types";

const API_BASE_URL = "";
const API_KEY = "library-secret-key";

/**
 * Sends an HTTP request to the library backend API and returns the parsed payload.
 *
 * @typeParam T - Expected shape of the API response payload.
 * @param path - API endpoint path relative to the base URL.
 * @param options - Fetch configuration options for the request.
 * @returns The parsed JSON payload from the backend.
 * @throws Error when the network response is not ok.
 */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...options.headers
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = (payload as { message?: string }).message || response.statusText;
    throw new Error(message);
  }

  return payload as T;
}

/**
 * Fetches all books that are currently available for checkout.
 *
 * @returns The list of available books.
 */
export async function fetchAvailableBooks(): Promise<Book[]> {
  const result = await request<ApiResponse<Book[]>>("/api/books");
  return result.data;
}

/**
 * Checks out a book for a borrower.
 *
 * @param bookId - The ID of the book to checkout.
 * @param borrowerName - The name of the person borrowing the book.
 * @returns The updated book record after checkout.
 */
export async function checkoutBook(bookId: number, borrowerName: string): Promise<Book> {
  const result = await request<ApiResponse<Book>>("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ bookId, borrowerName })
  });
  return result.data;
}

/**
 * Returns a book to the library inventory.
 *
 * @param bookId - The ID of the book to return.
 * @returns The updated book record after return.
 */
export async function returnBook(bookId: number): Promise<Book> {
  const result = await request<ApiResponse<Book>>("/api/return", {
    method: "POST",
    body: JSON.stringify({ bookId })
  });
  return result.data;
}
