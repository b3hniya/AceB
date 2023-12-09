import { Request, Response } from "express";
import { asyncControllerWrapper } from "../../utils/asyncControllerWrapper";

export const testAsyncController = asyncControllerWrapper(
  (req: Request, response: Response) => {
    return new Promise((res, rej) => {
      setTimeout(() => res("HEY"), 10_000);
    }).then((data) => {
      return response.send(data + " " + "HEY");
      // throw createAPIError(500, "Internal Server Error");
    });
  }
);

export const notAsyncController = (req: Request, response: Response) => {
  return response.send("HEY BUT NOT ASYNC");
};