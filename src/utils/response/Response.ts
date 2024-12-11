import { Response } from "express";
import {BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError, UnprocessableEntityError} from "./Error";

const responseError = (res: Response, error: Error) => {
  if (
    error instanceof BadRequestError ||
    error instanceof UnauthorizedError ||
    error instanceof ForbiddenError ||
    error instanceof NotFoundError ||
    error instanceof UnprocessableEntityError
  ) {
    return res.status(error.code).json({
      name: error.name,
      message: error.message
    });
  }

  console.error(error);

  return res.status(500).json({
    name: "InternalServerError",
    message: "Internal Server Error"
  });
}

const responseSuccess = (res: Response, code: number, message: string, data?: any) => {
  return res.status(code).json({
    message,
    data
  });
}

export {
  responseError,
  responseSuccess
};