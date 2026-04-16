import { useLibrary } from "../context/LibraryContext";

/**
 * Renders a list of available library books.
 *
 * Uses the shared library context to display current book availability.
 */
export function BookList() {
  const { state } = useLibrary();
  const { books } = state;

  return (
    <section className="panel panel--books">
      <div className="panel__header">
        <h2>Available books</h2>
        <p>Browse current titles that are ready for checkout.</p>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">No books are available right now.</div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <article key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p className="meta">by {book.author}</p>
              <p className="meta">ISBN: {book.isbn}</p>
              <div className="tag">ID #{book.id}</div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
