import path from "path";

import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

let dbInstance: Database | null = null;

const dbPath = process.env.DATABASE_FILE === ":memory:"
  ? ":memory:"
  : process.env.DATABASE_FILE
  ? path.resolve(process.env.DATABASE_FILE)
  : path.resolve(__dirname, "../../data/library.sqlite");

const seedBooks = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884"
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    isbn: "9781449373320"
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt and David Thomas",
    isbn: "9780135957059"
  }
];

/**
 * Initializes and returns the SQLite database instance.
 *
 * If the database is already initialized, returns the existing instance.
 * Also creates the books table and seed data if needed.
 *
 * @returns The initialized SQLite database.
 */
export async function initializeDatabase(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await dbInstance.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      isbn TEXT NOT NULL UNIQUE,
      is_available INTEGER NOT NULL DEFAULT 1,
      checked_out_by TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_books_availability
      ON books (is_available);
  `);

  const existingBooks = await dbInstance.get<{ count: number }>(
    "SELECT COUNT(*) as count FROM books"
  );

  if (!existingBooks || existingBooks.count === 0) {
    const insertStatement = await dbInstance.prepare(`
      INSERT INTO books (title, author, isbn)
      VALUES (?, ?, ?)
    `);

    try {
      for (const book of seedBooks) {
        await insertStatement.run(book.title, book.author, book.isbn);
      }
    } finally {
      await insertStatement.finalize();
    }
  }

  return dbInstance;
}

/**
 * Returns the initialized database instance, initializing it if necessary.
 *
 * @returns The active SQLite database connection.
 */
export async function getDatabase(): Promise<Database> {
  return initializeDatabase();
}
