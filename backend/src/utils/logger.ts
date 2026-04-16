type LogLevel = "INFO" | "WARN" | "ERROR";

/**
 * Writes a structured log message to stdout or stderr.
 *
 * @param level - Severity of the log entry.
 * @param message - Descriptive log message.
 * @param metadata - Optional contextual metadata.
 */
function writeLog(level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(metadata ? { metadata } : {})
  };

  const serializedPayload = JSON.stringify(payload);

  if (level === "ERROR") {
    console.error(serializedPayload);
    return;
  }

  console.log(serializedPayload);
}

export const logger = {
  info(message: string, metadata?: Record<string, unknown>): void {
    writeLog("INFO", message, metadata);
  },

  warn(message: string, metadata?: Record<string, unknown>): void {
    writeLog("WARN", message, metadata);
  },

  error(message: string, metadata?: Record<string, unknown>): void {
    writeLog("ERROR", message, metadata);
  }
};
