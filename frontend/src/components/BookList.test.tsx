import { render, screen } from "@testing-library/react";
import { BookList } from "./BookList";

describe("BookList", () => {
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
    },
    {
      id: 2,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      isbn: "9780201616224",
      isAvailable: true,
      checkedOutBy: null,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z"
    }
  ];

  it("renders available books correctly", () => {
    // Mock the context
    const mockUseLibrary = jest.fn().mockReturnValue({
      state: { books: mockBooks }
    });

    jest.doMock("../context/LibraryContext", () => ({
      useLibrary: mockUseLibrary
    }));

    render(<BookList />);

    expect(screen.getByText("Available books")).toBeInTheDocument();
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("The Pragmatic Programmer")).toBeInTheDocument();
    expect(screen.getByText("by Robert C. Martin")).toBeInTheDocument();
    expect(screen.getByText("by Andrew Hunt")).toBeInTheDocument();
  });

  it("shows empty state when no books are available", () => {
    const mockUseLibrary = jest.fn().mockReturnValue({
      state: { books: [] }
    });

    jest.doMock("../context/LibraryContext", () => ({
      useLibrary: mockUseLibrary
    }));

    render(<BookList />);

    expect(screen.getByText("No books are available right now.")).toBeInTheDocument();
  });
});