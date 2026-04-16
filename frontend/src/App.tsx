import { LibraryProvider, useLibrary } from "./context/LibraryContext";
import { BookList } from "./components/BookList";
import { CheckoutForm } from "./components/CheckoutForm";
import { ReturnForm } from "./components/ReturnForm";
import ErrorBoundary from "./components/ErrorBoundary";

/**
 * Renders the core application view using library state from context.
 *
 * Shows the available books and checkout/return forms, plus status messages.
 */
function AppContent() {
  const { state } = useLibrary();

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Library Management</p>
          <h1>Borrow and return books easily</h1>
          <p className="intro">
            Browse available titles, check out a book with your name, or return a book by its ID. The app is responsive for mobile and desktop.
          </p>
        </div>
      </header>

      <main className="layout">
        <div className="content">
          <BookList />

          <div className="status-bar">
            {state.error ? <div className="message message--error">{state.error}</div> : null}
            {state.success ? <div className="message message--success">{state.success}</div> : null}
          </div>

          <div className="form-grid">
            <CheckoutForm />
            <ReturnForm />
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Application root component.
 *
 * Wraps the library content with context and error boundary providers.
 */
function App() {
  return (
    <LibraryProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </LibraryProvider>
  );
}

export default App;