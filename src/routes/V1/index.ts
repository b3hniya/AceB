import { Router, Request, Response } from "express";
import {
  notAsyncController,
  testAsyncController,
} from "../../controllers/v1/testAsyncController";
import { asyncControllerWrapper } from "../../utils/asyncControllerWrapper";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

router.get("/users", (req, res) => {
  res.send("Hello World");
});

router.get("/test-async", testAsyncController);

router.get("/test-not-async", asyncControllerWrapper(notAsyncController));

export default router;
