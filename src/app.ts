import cors from "cors";
import helmet from "helmet";
// import routes from "./routes/V1";
// import { createAPIError } from "./errors/apiError";
import path from "path";
import express, { Express } from "express";
import dynamicRouter from "./middlewares/dynamicRouter";
import { requestLogger } from "./middlewares/requestLogger";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { fileURLToPath } from "url";
import { dirname } from "path";

const origin = process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN : "*";

const methods = "GET,POST,PUT,DELETE";

const allowedHeaders = "Content-Type,Authorization";

const credentials = true;

const corsOptions = {
  origin,
  methods,
  credentials,
  allowedHeaders,
};

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
console.log(__dirname);

const createApp = async (): Promise<Express> => {
  const app = express();

  app.use(helmet());

  app.use(cors(corsOptions));

  app.use(requestLogger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /*
    You can use both approaches: 
      first one is a manual way of handling routes
      the second one is a dynamic way of handling routes
  */

  // Manual handling
  // app.use("/api/v1", routes);

  // Dynamic handling
  const routes = await dynamicRouter(path.join(__dirname, "controllers/"));

  app.use("/api", routes);

  app.use(errorMiddleware);

  return app;
};

export default createApp;
