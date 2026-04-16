import { useLibrary } from "../context/LibraryContext";

/**
 * Displays the checkout form and handles selection of a book and borrower name.
 *
 * Uses context actions to initiate checkout and validate user input.
 */
export function CheckoutForm() {
  const { state, handleCheckout, setSelectedBookId, setBorrowerName } = useLibrary();
  const { books, borrowerName, selectedBookId, loading } = state;

  return (
    <section className="panel panel--form">
      <div className="panel__header">
        <h2>Check out a book</h2>
        <p>Select a title and enter your name to confirm checkout.</p>
      </div>

      <label className="field">
        <span>Choose a book</span>
        <select
          value={selectedBookId ?? ""}
          onChange={(event) => setSelectedBookId(Number(event.target.value))}
        >
          <option value="">Select a title</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Your name</span>
        <input
          type="text"
          value={borrowerName}
          placeholder="Enter your name"
          onChange={(event) => setBorrowerName(event.target.value)}
        />
      </label>

      <button className="button button--primary" onClick={handleCheckout} disabled={loading || !selectedBookId || borrowerName.trim().length === 0}>
        {loading ? "Processing..." : "Check Out"}
      </button>
    </section>
  );
}
