import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import { fetchAvailableBooks, checkoutBook, returnBook } from "../api";
import type { Book } from "../types";

interface State {
  books: Book[];
  loading: boolean;
  error: string | null;
  success: string | null;
  selectedBookId: number | null;
  borrowerName: string;
  returnBookId: string;
}

type Action =
  | { type: "setLoading" }
  | { type: "setBooks"; payload: Book[] }
  | { type: "setError"; payload: string | null }
  | { type: "setSuccess"; payload: string | null }
  | { type: "setSelectedBookId"; payload: number | null }
  | { type: "setBorrowerName"; payload: string }
  | { type: "setReturnBookId"; payload: string }
  | { type: "clearMessages" };

const initialState: State = {
  books: [],
  loading: false,
  error: null,
  success: null,
  selectedBookId: null,
  borrowerName: "",
  returnBookId: ""
};

/**
 * Reducer that updates library state based on dispatched actions.
 *
 * @param state - Current library state.
 * @param action - Action describing the desired state change.
 * @returns Updated state after applying the action.
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: true, error: null };
    case "setBooks":
      return { ...state, books: action.payload, loading: false };
    case "setError":
      return { ...state, error: action.payload, success: null, loading: false };
    case "setSuccess":
      return { ...state, success: action.payload, error: null, loading: false };
    case "setSelectedBookId":
      return { ...state, selectedBookId: action.payload };
    case "setBorrowerName":
      return { ...state, borrowerName: action.payload };
    case "setReturnBookId":
      return { ...state, returnBookId: action.payload };
    case "clearMessages":
      return { ...state, error: null, success: null };
    default:
      return state;
  }
}

interface LibraryContextType {
  state: State;
  loadBooks: () => Promise<void>;
  handleCheckout: () => Promise<void>;
  handleReturn: () => Promise<void>;
  setSelectedBookId: (value: number | null) => void;
  setBorrowerName: (value: string) => void;
  setReturnBookId: (value: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

/**
 * Provides the library state and actions to application components.
 *
 * @param children - Child components that will consume the library context.
 * @returns Library context provider component.
 */
export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadBooks();
  }, []);

  /**
   * Loads available books from the backend API and updates local state.
   */
  async function loadBooks() {
    dispatch({ type: "setLoading" });

    try {
      const books = await fetchAvailableBooks();
      dispatch({ type: "setBooks", payload: books });
    } catch (error) {
      dispatch({ type: "setError", payload: (error as Error).message });
    }
  }

  /**
   * Submits a checkout request for the selected book.
   *
   * Validates input, updates UI state, and refreshes the book list.
   */
  async function handleCheckout() {
    if (!state.selectedBookId || state.borrowerName.trim().length === 0) {
      dispatch({ type: "setError", payload: "Please select a book and enter your name." });
      return;
    }

    dispatch({ type: "setLoading" });

    try {
      const book = await checkoutBook(state.selectedBookId, state.borrowerName.trim());
      dispatch({ type: "setSuccess", payload: `Checked out "${book.title}" successfully.` });
      dispatch({ type: "setSelectedBookId", payload: null });
      dispatch({ type: "setBorrowerName", payload: "" });
      dispatch({ type: "setReturnBookId", payload: String(book.id) });
      await loadBooks();
    } catch (error) {
      dispatch({ type: "setError", payload: (error as Error).message });
    }
  }

  /**
   * Submits a return request for the typed book ID.
   *
   * Validates the ID and updates state after the return completes.
   */
  async function handleReturn() {
    const bookId = Number(state.returnBookId);

    if (!bookId || Number.isNaN(bookId)) {
      dispatch({ type: "setError", payload: "Enter a valid book ID to return." });
      return;
    }

    dispatch({ type: "setLoading" });

    try {
      const book = await returnBook(bookId);
      dispatch({ type: "setSuccess", payload: `Returned "${book.title}" successfully.` });
      dispatch({ type: "setReturnBookId", payload: "" });
      await loadBooks();
    } catch (error) {
      dispatch({ type: "setError", payload: (error as Error).message });
    }
  }

  const value: LibraryContextType = {
    state,
    loadBooks,
    handleCheckout,
    handleReturn,
    setSelectedBookId: (value) => dispatch({ type: "setSelectedBookId", payload: value }),
    setBorrowerName: (value) => dispatch({ type: "setBorrowerName", payload: value }),
    setReturnBookId: (value) => dispatch({ type: "setReturnBookId", payload: value })
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

/**
 * Retrieves the library context and throws if the hook is used outside its provider.
 *
 * @returns Context value for library state and actions.
 */
export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
