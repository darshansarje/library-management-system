export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
  checkedOutBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  message?: string;
  data: T;
}
