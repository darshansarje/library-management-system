import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ReturnForm } from "./ReturnForm";

describe("ReturnForm", () => {
  const mockReturnBook = jest.fn();
  const mockBooks = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      isAvailable: false,
      checkedOutBy: "John Doe",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z"
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders return form correctly", () => {
    const mockUseLibrary = jest.fn().mockReturnValue({
      state: { books: mockBooks },
      returnBook: mockReturnBook
    });

    jest.doMock("../context/LibraryContext", () => ({
      useLibrary: mockUseLibrary
    }));

    render(<ReturnForm />);

    expect(screen.getByText("Return a book")).toBeInTheDocument();
    expect(screen.getByLabelText("Select a book")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Return" })).toBeInTheDocument();
  });

  it("submits return form successfully", async () => {
    mockReturnBook.mockResolvedValue({
      id: 1,
      title: "Clean Code",
      isAvailable: true,
      checkedOutBy: null
    });

    const mockUseLibrary = jest.fn().mockReturnValue({
      state: { books: mockBooks },
      returnBook: mockReturnBook
    });

    jest.doMock("../context/LibraryContext", () => ({
      useLibrary: mockUseLibrary
    }));

    render(<ReturnForm />);

    const bookSelect = screen.getByLabelText("Select a book");
    const submitButton = screen.getByRole("button", { name: "Return" });

    fireEvent.change(bookSelect, { target: { value: "1" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockReturnBook).toHaveBeenCalledWith({ bookId: 1 });
    });

    expect(await screen.findByText("Book returned successfully!")).toBeInTheDocument();
  });

  it("shows error message on return failure", async () => {
    mockReturnBook.mockRejectedValue(new Error("Book is already available"));

    const mockUseLibrary = jest.fn().mockReturnValue({
      state: { books: mockBooks },
      returnBook: mockReturnBook
    });

    jest.doMock("../context/LibraryContext", () => ({
      useLibrary: mockUseLibrary
    }));

    render(<ReturnForm />);

    const bookSelect = screen.getByLabelText("Select a book");
    const submitButton = screen.getByRole("button", { name: "Return" });

    fireEvent.change(bookSelect, { target: { value: "1" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Book is already available")).toBeInTheDocument();
  });
});