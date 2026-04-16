import { Router } from "express";

import * as libraryController from "../controllers/libraryController";
import { asyncHandler } from "../utils/asyncHandler";

const libraryRouter = Router();

libraryRouter.get("/books", asyncHandler(libraryController.getAvailableBooks));
libraryRouter.post("/checkout", asyncHandler(libraryController.checkoutBook));
libraryRouter.post("/return", asyncHandler(libraryController.returnBook));

export { libraryRouter };
