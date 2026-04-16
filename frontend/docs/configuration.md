# Frontend Configuration

## Environment Variables

- `VITE_API_BASE_URL`
  - Description: Base URL for the backend API.
  - Default: `http://localhost:3000`

## How to Run Locally

1. Open terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in the browser using the Vite URL displayed in the terminal.

## Build Instructions

From the `frontend` folder:
```bash
npm run build
```

This command compiles TypeScript and bundles the app for production in `dist/`.

## Deployment Steps

1. Run the production build:
   ```bash
   npm run build
   ```
2. Serve the generated `dist/` folder with a static hosting solution.
3. Ensure the environment variable `VITE_API_BASE_URL` points to the deployed backend API.

## Notes

- The frontend uses Vite for development and build tooling.
- Production build output is stored in `frontend/dist/`.
