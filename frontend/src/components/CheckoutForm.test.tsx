import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CheckoutForm } from "./CheckoutForm";

describe("CheckoutForm", () => {
  const mockCheckoutBook = jest.fn();
  const mockBooks = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      isAvailable: true,
      checkedOutBy: null,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z"
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders checkout form correctly", () => {
    const mockUseLibrary = jest.fn().mockReturnValue({
      state: { books: mockBooks },
      checkoutBook: mockCheckoutBook
    });

    jest.doMock("../context/LibraryContext", () => ({
      useLibrary: mockUseLibrary
    }));

    render(<CheckoutForm />);

    expect(screen.getByText("Checkout a book")).toBeInTheDocument();
    expect(screen.getByLabelText("Select a book")).toBeInTheDocument();
    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Checkout" })).toBeInTheDocument();
  });

  it("submits checkout form successfully", async () => {
    mockCheckoutBook.mockResolvedValue({
      id: 1,
      title: "Clean Code",
      isAvailable: false,
      checkedOutBy: "John Doe"
    });

    const mockUseLibrary = jest.fn().mockReturnValue({
      state: { books: mockBooks },
      checkoutBook: mockCheckoutBook
    });

    jest.doMock("../context/LibraryContext", () => ({
      useLibrary: mockUseLibrary
    }));

    render(<CheckoutForm />);

    const bookSelect = screen.getByLabelText("Select a book");
    const nameInput = screen.getByLabelText("Your name");
    const submitButton = screen.getByRole("button", { name: "Checkout" });

    fireEvent.change(bookSelect, { target: { value: "1" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCheckoutBook).toHaveBeenCalledWith({
        bookId: 1,
        borrowerName: "John Doe"
      });
    });

    expect(await screen.findByText("Book checked out successfully!")).toBeInTheDocument();
  });

  it("shows error message on checkout failure", async () => {
    mockCheckoutBook.mockRejectedValue(new Error("Book not available"));

    const mockUseLibrary = jest.fn().mockReturnValue({
      state: { books: mockBooks },
      checkoutBook: mockCheckoutBook
    });

    jest.doMock("../context/LibraryContext", () => ({
      useLibrary: mockUseLibrary
    }));

    render(<CheckoutForm />);

    const bookSelect = screen.getByLabelText("Select a book");
    const nameInput = screen.getByLabelText("Your name");
    const submitButton = screen.getByRole("button", { name: "Checkout" });

    fireEvent.change(bookSelect, { target: { value: "1" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Book not available")).toBeInTheDocument();
  });
});