import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({
      status: error.statusCode,
      message: error.message,
    });
  }
  res.status(500).send({ status: 500, message: "Internal server error" });
};
