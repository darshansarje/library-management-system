import fs from "fs";
import path from "path";

import app from "./app";
import { initializeDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./utils/logger";

const dataDirectory = path.resolve(__dirname, "../data");

/**
 * Boots the Express server and ensures the database is initialized.
 *
 * Creates the data directory if needed, initializes SQLite, and starts listening on the configured port.
 */
async function startServer(): Promise<void> {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  await initializeDatabase();

  app.listen(env.port, () => {
    logger.info("Library management API running", {
      port: env.port,
      environment: env.nodeEnv
    });
  });
}

startServer().catch((error) => {
  logger.error("Failed to start server", {
    stack: error instanceof Error ? error.stack : String(error)
  });
  process.exit(1);
});
