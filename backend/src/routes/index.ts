import { Router } from "express";

import { libraryRouter } from "./libraryRoutes";

const apiRouter = Router();

apiRouter.use("/", libraryRouter);

export { apiRouter };
