import { Request, Response } from "express";

import { checkoutBookSchema, returnBookSchema } from "../schemas/librarySchemas";
import { libraryService } from "../services/libraryService";

/**
 * Controller for library-related HTTP endpoints.
 * Handles requests for book operations including listing, checkout, and return.
 */

/**
 * Retrieves and returns all available books.
 * @param _req - Express request object (unused)
 * @param res - Express response object
 */
export async function getAvailableBooks(_req: Request, res: Response): Promise<void> {
  const books = await libraryService.getAvailableBooks();

  res.status(200).json({
    data: books
  });
}

/**
 * Handles book checkout requests.
 * Validates input and processes the checkout operation.
 * @param req - Express request object containing checkout data
 * @param res - Express response object
 */
export async function checkoutBook(req: Request, res: Response): Promise<void> {
  const payload = checkoutBookSchema.parse(req.body);
  const book = await libraryService.checkoutBook(payload);

  res.status(200).json({
    message: "Book checked out successfully",
    data: book
  });
}

/**
 * Handles book return requests.
 * Validates input and processes the return operation.
 * @param req - Express request object containing return data
 * @param res - Express response object
 */
export async function returnBook(req: Request, res: Response): Promise<void> {
  const payload = returnBookSchema.parse(req.body);
  const book = await libraryService.returnBook(payload);

  res.status(200).json({
    message: "Book returned successfully",
    data: book
  });
}
