import { validationResult } from "express-validator";
import { CustomError } from "../utils/CustomError";
import { Request, Response, NextFunction } from "express-serve-static-core";

export const validationHandler = (
  req: Request<never>,
  res: Response,
  next: NextFunction
) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    const errors = results.array();
    const messages: Array<string> = [];
    errors.forEach((error) => {
      if (!messages.includes(error.msg)) messages.push(error.msg);
    });
    return next(new CustomError(messages.join(", "), 400));
  }
  return next();
};
