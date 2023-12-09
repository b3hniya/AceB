import express, { Express } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { createAPIError } from "./errors/apiError";

const createApp = (): Express => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    throw createAPIError(404, "Not Found");
  });

  app.use(errorMiddleware);

  return app;
};

export default createApp;
