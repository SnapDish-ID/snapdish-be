import {Request, Response, Router} from "express";
import {LoginInput, LoginOutput, RawUser, RegisterOutput} from "../utils/interfaces";
import {createUser, loginUser} from "../user/user.service";
import {responseError, responseSuccess} from "../utils/response/Response";

const route = Router();

route.post("/register", async (req: Request, res: Response) => {
  try {
    const user: RawUser = req.body;
    const response: RegisterOutput = await createUser(user);
    responseSuccess(res, 201, "User created successfully", response);

    return;
  } catch (error: any) {
    responseError(res, error);
    return;
  }
});


route.post("/login", async (req: Request, res: Response) => {
  try {
    const userLogin: LoginInput = req.body;
    const response: LoginOutput = await loginUser(userLogin);
    responseSuccess(res, 200, "User logged in", response);

    return;
  } catch (error: any) {
    responseError(res, error);
    return;
  }
});


export default route;