import { z } from "zod";

export const checkoutBookSchema = z.object({
  bookId: z.number().int().positive(),
  borrowerName: z.string().trim().min(1).max(100)
});

export const returnBookSchema = z.object({
  bookId: z.number().int().positive()
});
