import express, { Express } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { createAPIError } from "./errors/apiError";
import { requestLogger } from "./middlewares/requestLogger";

const createApp = (): Express => {
  const app = express();

  app.use(requestLogger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    throw createAPIError(404, "Not Found");
    // res.send("Hello World");
  });

  app.use(errorMiddleware);

  return app;
};

export default createApp;
