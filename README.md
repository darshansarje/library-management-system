# Library Management System

A full-stack web application for managing library book checkouts and returns. Built with modern technologies and best practices for scalability, maintainability, and testability.

## Project Structure

- `backend/` - Node.js REST API with Express, TypeScript, and SQLite
- `frontend/` - React frontend with TypeScript, Vite, and Context API

## System Architecture

### Backend Architecture

The backend follows a layered architecture pattern for clean separation of concerns:

- **Config Layer** (`src/config/`) - Environment configuration and database initialization
- **Model Layer** (`src/models/`) - Data access objects for database operations
- **Service Layer** (`src/services/`) - Business logic and application workflows
- **Controller Layer** (`src/controllers/`) - HTTP request/response handling
- **Routes Layer** (`src/routes/`) - API endpoint definitions and middleware composition
- **Middleware Layer** (`src/middlewares/`) - Cross-cutting concerns (auth, logging, error handling)
- **Schemas Layer** (`src/schemas/`) - Request validation using Zod
- **Utils Layer** (`src/utils/`) - Shared utilities (async handlers, logging)
- **Errors Layer** (`src/errors/`) - Custom error types and handling

### Frontend Architecture

The frontend uses modern React patterns:

- **Context API** - Global state management for library operations
- **Component-based** - Modular, reusable UI components
- **Error Boundaries** - Graceful error handling and user feedback
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## API Endpoints

### Books
- `GET /api/books` - Retrieve available books for checkout
- `POST /api/checkout` - Checkout a book (requires `bookId` and `borrowerName`)
- `POST /api/return` - Return a checked-out book (requires `bookId`)

### Authentication
Protected by API key middleware:
- Header: `x-api-key: library-secret-key` or `Authorization: Bearer library-secret-key`
- Default key can be overridden with `LIBRARY_API_KEY` environment variable

## Database Schema

```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT NOT NULL UNIQUE,
  is_available INTEGER NOT NULL DEFAULT 1,
  checked_out_by TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_books_availability ON books (is_available);
```

## Features

### Core Functionality
- ✅ View available books
- ✅ Checkout books with borrower name
- ✅ Return checked-out books
- ✅ Real-time availability updates
- ✅ Input validation and error handling
- ✅ Responsive UI for mobile and desktop

### Technical Features
- ✅ Layered architecture for maintainability
- ✅ TypeScript for type safety
- ✅ Comprehensive error handling
- ✅ Structured logging
- ✅ Database transactions
- ✅ API key authentication
- ✅ Request validation with Zod
- ✅ Global state management with Context API
- ✅ Error boundaries for React components

## Testing Strategy

### Backend Testing
- **Unit Tests** - Service and model layer testing with Jest
- **Integration Tests** - API endpoint testing with Supertest
- **Database Tests** - In-memory SQLite for isolated testing

### Frontend Testing
- **Component Tests** - React Testing Library for UI components
- **Integration Tests** - Context API and user interactions
- **Mocking** - Fetch API mocking for isolated testing

### Test Coverage
- Backend: Service layer, model layer, API routes
- Frontend: Components, forms, error states, success states

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Setup
1. Clone the repository.
2. Open a terminal and navigate to the project root:
   ```bash
   cd library-management-system
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies in a second terminal:
   ```bash
   cd frontend
   npm install
   ```

### Running Locally

#### Start the backend
In the `backend` folder:
```bash
npm run dev
```
This starts the Express API on the configured port (default `3000`). The backend will create the SQLite database file automatically.

#### Start the frontend
In the `frontend` folder:
```bash
npm run dev
```
This starts the Vite development server and opens the React app in the browser.

#### Verify the app
- Backend API: `http://localhost:3000/api/books`
- Frontend app: the Vite server URL shown in the terminal (usually `http://localhost:5173`)

### Testing
Run tests for each app separately.

#### Backend tests
```bash
cd backend
npm test
```

#### Frontend tests
```bash
cd frontend
npm test
```

## Environment Variables

### Backend
- `NODE_ENV` - Environment (development/production/test)
- `PORT` - Server port (default: 3000)
- `DATABASE_FILE` - SQLite database path
- `LIBRARY_API_KEY` - API authentication key

### Frontend
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3000)

## Assumptions

- The backend and frontend will run locally on the same machine during development.
- A simple API key is sufficient for authentication in this demo-style project.
- SQLite is an acceptable storage choice for a small library management system and local development.
- The app only needs to manage a single library inventory with basic checkout/return workflows.
- User authentication, multi-user roles, and persistent session management are outside the current scope.
- The frontend fetches available books only; checkout and return operations refresh the list after each action.

## Code Quality

### Backend
- JSDoc comments for all public functions
- TypeScript strict mode enabled
- ESLint configuration
- Prettier code formatting
- Comprehensive error handling

### Frontend
- TypeScript for type safety
- ESLint and Prettier
- Error boundaries for resilience
- Accessible UI components
- Mobile-responsive design

## Performance Optimizations

- SQLite WAL mode for concurrent reads/writes
- Database indexes on frequently queried columns
- Lazy loading of components
- Optimized bundle size with Vite
- Efficient state updates with useReducer

## Security Considerations

- API key authentication for backend endpoints
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- CORS configuration
- Error message sanitization (no sensitive data leakage)

## Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve dist/ directory with any static server
```

## Contributing

1. Follow the established code style and architecture patterns
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting PRs

## License

This project is licensed under the MIT License.

SQLite is used for the backend database.

### Why SQLite

- It is lightweight and easy to set up for a small-to-medium library management project.
- It does not require a separate database server, which keeps local development simple.
- It is a good fit for interview-style or starter projects where portability and quick setup matter.
- It still supports transactions, indexing, and write-ahead logging, which helps with reliability and concurrent access.

### Schema

The backend creates a `books` table automatically on startup:

```sql
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT NOT NULL UNIQUE,
  is_available INTEGER NOT NULL DEFAULT 1,
  checked_out_by TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

An index is also created for availability lookups:

```sql
CREATE INDEX idx_books_availability ON books (is_available);
```

### Connection Details

- Database file: `backend/data/library.sqlite`
- Driver: `sqlite3`
- Access library: `sqlite`

### Seed Data

On first startup, the backend seeds a few sample books so the API can be tested immediately.

## Backend Setup

From the `backend` directory:

```bash
npm install
npm run dev
```

The server starts on `http://localhost:3000`.

Optional environment variables:

- `PORT` - server port
- `LIBRARY_API_KEY` - API key used by the auth middleware

## Example Requests

### Get Available Books

```bash
curl http://localhost:3000/api/books \
  -H "x-api-key: library-secret-key"
```

### Check Out a Book

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -H "x-api-key: library-secret-key" \
  -d "{\"bookId\":1,\"borrowerName\":\"Alice\"}"
```

### Return a Book

```bash
curl -X POST http://localhost:3000/api/return \
  -H "Content-Type: application/json" \
  -H "x-api-key: library-secret-key" \
  -d "{\"bookId\":1}"
```

## Frontend Setup

The frontend application is located in the `frontend` folder. It is built with React, TypeScript, and Vite.

From the `frontend` folder:

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to the backend at `http://localhost:3000`.

## Performance Considerations

- `GET /api/books` filters on `is_available`, and an index is created on that column to keep reads efficient as the table grows.
- The checkout and return operations update rows conditionally (`WHERE id = ? AND is_available = ?`), which avoids race-prone read-then-write logic and helps with concurrent users.
- SQLite write-ahead logging (`PRAGMA journal_mode = WAL`) is enabled to improve concurrent read/write behavior.
- A single shared database connection is reused instead of opening a new connection for every request.
- Request validation happens at the controller boundary, which prevents invalid payloads from reaching the service and model layers.
- Structured request and error logging includes a request ID, making production debugging easier without scattering logging code across controllers.
- For very large datasets or high write concurrency, a server-based relational database such as PostgreSQL would be the better next step.
