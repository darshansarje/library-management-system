import { render, screen } from "@testing-library/react";
import { LibraryProvider } from "./context/LibraryContext";
import App from "./App";

describe("App", () => {
  const books = [
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
    jest.restoreAllMocks();
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: books })
    });
  });

  it("renders the app with library provider", async () => {
    render(
      <LibraryProvider>
        <App />
      </LibraryProvider>
    );

    expect(screen.getByText("Library Management")).toBeInTheDocument();
    expect(screen.getByText("Borrow and return books easily")).toBeInTheDocument();
  });

  it("loads and displays available books", async () => {
    render(
      <LibraryProvider>
        <App />
      </LibraryProvider>
    );

    expect(await screen.findByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText(/available books/i)).toBeInTheDocument();
  });
});
