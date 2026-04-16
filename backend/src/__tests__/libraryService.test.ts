import { libraryService } from "../services/libraryService";
import { bookModel } from "../models/bookModel";

process.env.NODE_ENV = "test";
process.env.DATABASE_FILE = ":memory:";

let initialized = false;

beforeAll(async () => {
  const database = await import("../config/database");
  await database.initializeDatabase();
  initialized = true;
});

afterAll(async () => {
  if (!initialized) return;
  const database = await import("../config/database");
  const db = await database.getDatabase();
  await db.close();
});

describe("Library Service", () => {
  describe("getAvailableBooks", () => {
    it("should return available books", async () => {
      const books = await libraryService.getAvailableBooks();
      expect(Array.isArray(books)).toBe(true);
      expect(books.length).toBeGreaterThan(0);
      expect(books[0]).toHaveProperty("id");
      expect(books[0]).toHaveProperty("title");
      expect(books[0]).toHaveProperty("isAvailable", true);
    });
  });

  describe("checkoutBook", () => {
    it("should successfully checkout an available book", async () => {
      const availableBooks = await libraryService.getAvailableBooks();
      const bookToCheckout = availableBooks[0];

      const result = await libraryService.checkoutBook({
        bookId: bookToCheckout.id,
        borrowerName: "Test User"
      });

      expect(result.id).toBe(bookToCheckout.id);
      expect(result.isAvailable).toBe(false);
      expect(result.checkedOutBy).toBe("Test User");
    });

    it("should throw error for non-existent book", async () => {
      await expect(libraryService.checkoutBook({
        bookId: 99999,
        borrowerName: "Test User"
      })).rejects.toThrow("Book not found");
    });

    it("should throw error for already checked out book", async () => {
      const availableBooks = await libraryService.getAvailableBooks();
      const bookId = availableBooks[0].id;

      // First checkout
      await libraryService.checkoutBook({
        bookId,
        borrowerName: "User 1"
      });

      // Second checkout should fail
      await expect(libraryService.checkoutBook({
        bookId,
        borrowerName: "User 2"
      })).rejects.toThrow("Book is already checked out");
    });
  });

  describe("returnBook", () => {
    it("should successfully return a checked out book", async () => {
      const availableBooks = await libraryService.getAvailableBooks();
      const bookId = availableBooks[0].id;

      // Checkout first
      await libraryService.checkoutBook({
        bookId,
        borrowerName: "Test User"
      });

      // Return
      const result = await libraryService.returnBook({ bookId });

      expect(result.id).toBe(bookId);
      expect(result.isAvailable).toBe(true);
      expect(result.checkedOutBy).toBeNull();
    });

    it("should throw error for non-existent book", async () => {
      await expect(libraryService.returnBook({ bookId: 99999 })).rejects.toThrow("Book not found");
    });

    it("should throw error for already available book", async () => {
      const availableBooks = await libraryService.getAvailableBooks();
      const bookId = availableBooks[0].id;

      await expect(libraryService.returnBook({ bookId })).rejects.toThrow("Book is already available in the library");
    });
  });
});

describe("Book Model", () => {
  describe("findAvailableBooks", () => {
    it("should return only available books", async () => {
      const books = await bookModel.findAvailableBooks();
      expect(books.every(book => book.isAvailable)).toBe(true);
      expect(books.length).toBeGreaterThan(0);
    });
  });

  describe("findById", () => {
    it("should return book when found", async () => {
      const availableBooks = await bookModel.findAvailableBooks();
      const book = await bookModel.findById(availableBooks[0].id);
      expect(book).not.toBeNull();
      expect(book!.id).toBe(availableBooks[0].id);
    });

    it("should return null for non-existent book", async () => {
      const book = await bookModel.findById(99999);
      expect(book).toBeNull();
    });
  });

  describe("markAsCheckedOut", () => {
    it("should return true for successful checkout", async () => {
      const availableBooks = await bookModel.findAvailableBooks();
      const result = await bookModel.markAsCheckedOut({
        bookId: availableBooks[0].id,
        borrowerName: "Test User"
      });
      expect(result).toBe(true);
    });

    it("should return false for already checked out book", async () => {
      const availableBooks = await bookModel.findAvailableBooks();
      const bookId = availableBooks[0].id;

      // First checkout
      await bookModel.markAsCheckedOut({
        bookId,
        borrowerName: "User 1"
      });

      // Second checkout should fail
      const result = await bookModel.markAsCheckedOut({
        bookId,
        borrowerName: "User 2"
      });
      expect(result).toBe(false);
    });
  });

  describe("markAsReturned", () => {
    it("should return true for successful return", async () => {
      const availableBooks = await bookModel.findAvailableBooks();
      const bookId = availableBooks[0].id;

      // Checkout first
      await bookModel.markAsCheckedOut({
        bookId,
        borrowerName: "Test User"
      });

      // Return
      const result = await bookModel.markAsReturned(bookId);
      expect(result).toBe(true);
    });

    it("should return false for already available book", async () => {
      const availableBooks = await bookModel.findAvailableBooks();
      const result = await bookModel.markAsReturned(availableBooks[0].id);
      expect(result).toBe(false);
    });
  });
});