import { Request, Response, NextFunction } from "express-serve-static-core";
import { CustomError } from "../utils/CustomError";
import { QueryFailedError } from "typeorm";

export function globalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({
      status: error.statusCode,
      message: error.message,
    });
  }
  if (error instanceof QueryFailedError) {
    return res.status(500).send({
      status: 409,
      message: error.message,
    });
  }
  res
    .status(500)
    .send({ status: 500, message: error.message || "Internal server error" });
}
