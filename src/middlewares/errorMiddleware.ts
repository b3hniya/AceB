// src/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { APIError } from "../errors/apiError";
import logger from "../configs/logger";

export const errorMiddleware = (
  error: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error?.statusCode ?? 500;
  const message = error?.message ?? "Something went wrong";

  logger.error(
    `Error ${status} - ${message} - ${req.method} - ${req.originalUrl} - IP: ${req.ip}`
  );

  res.status(status).json({
    status,
    message,
  });
};
