export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
  checkedOutBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookRow {
  id: number;
  title: string;
  author: string;
  isbn: string;
  is_available: number;
  checked_out_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CheckoutBookInput {
  bookId: number;
  borrowerName: string;
}

export interface ReturnBookInput {
  bookId: number;
}
