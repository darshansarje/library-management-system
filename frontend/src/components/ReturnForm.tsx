import { useLibrary } from "../context/LibraryContext";

/**
 * Displays the book return form and submits the return request.
 *
 * Uses the shared library context to validate the book ID and perform the return operation.
 */
export function ReturnForm() {
  const { state, handleReturn, setReturnBookId } = useLibrary();
  const { returnBookId, loading } = state;

  return (
    <section className="panel panel--form">
      <div className="panel__header">
        <h2>Return a book</h2>
        <p>Enter the book ID from a checkout record to return it.</p>
      </div>

      <label className="field">
        <span>Book ID</span>
        <input
          type="number"
          value={returnBookId}
          placeholder="123"
          min="1"
          onChange={(event) => setReturnBookId(event.target.value)}
        />
      </label>

      <button className="button button--secondary" onClick={handleReturn} disabled={loading || returnBookId.trim().length === 0}>
        {loading ? "Processing..." : "Return Book"}
      </button>
    </section>
  );
}
