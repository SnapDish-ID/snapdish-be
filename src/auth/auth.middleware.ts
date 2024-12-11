import {NextFunction, Response} from "express";
import {UnauthorizedError} from "../utils/response/Error";
import jwt, {Secret} from "jsonwebtoken";
import {AuthenticatedRequest, User} from "../utils/interfaces";
import {responseError} from "../utils/response/Response";

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction)=> {
  try {
    if (!req.headers.authorization) {
      responseError(res, new UnauthorizedError("Authorization Required"));
      return;
    }

    const token = req.headers.authorization?.replace("Bearer ", "");

    jwt.verify(token!, process.env.JWT_SECRET as Secret, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            responseError(res, new UnauthorizedError("Token Expired"));
            break;
          case "JsonWebTokenError":
            responseError(res, new UnauthorizedError("Invalid Token"));
            break;
          default:
            responseError(res, new UnauthorizedError("Invalid Authorization"));
            break;
        }

        return;
      }

      req.user = decoded as Omit<User, "password">;
    });

    next();
  } catch (error: any) {
    responseError(res, error);
    return;
  }
}

export default authMiddleware;