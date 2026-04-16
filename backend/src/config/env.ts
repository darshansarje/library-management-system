const DEFAULT_PORT = 3000;
const DEFAULT_API_KEY = "library-secret-key";

/**
 * Parses a string value to a valid port number.
 *
 * Falls back to a default port when the input is missing, invalid, or non-positive.
 *
 * @param value - Port value from environment variables.
 * @returns A valid port number.
 */
function parsePort(value: string | undefined): number {
  const parsedValue = Number(value);

  if (!value || !Number.isInteger(parsedValue) || parsedValue <= 0) {
    return DEFAULT_PORT;
  }

  return parsedValue;
}

/**
 * Application environment configuration values.
 */
export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parsePort(process.env.PORT),
  apiKey: process.env.LIBRARY_API_KEY ?? DEFAULT_API_KEY
};
