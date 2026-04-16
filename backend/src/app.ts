import express from "express";

import { authenticateRequest } from "./middlewares/authMiddleware";
import { attachRequestContext } from "./middlewares/requestContextMiddleware";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { requestLoggingMiddleware } from "./middlewares/requestLoggingMiddleware";
import { apiRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(attachRequestContext);
app.use(requestLoggingMiddleware);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.use("/api", authenticateRequest, apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
