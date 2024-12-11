import { Router, Response } from "express";
import {deleteAccount, getUser, updateUser} from "./user.service";
import {responseError, responseSuccess} from "../utils/response/Response";
import {AuthenticatedRequest, RawUser, UpdateOutput, UserPublic} from "../utils/interfaces";


const route = Router();

route.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user: UserPublic = await getUser(req.user?.id!);
    responseSuccess(res, 200, "User found", { ...user });

    return;
  } catch (error: any) {
    responseError(res, error);
    return;
  }
});


route.put("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user: RawUser = req.body;
    const updatedUser: UpdateOutput = await updateUser(req.user?.id!, user);
    responseSuccess(res, 200, "User updated", updatedUser);

    return;
  } catch (error: any) {
    responseError(res, error);
    return;
  }
});


route.delete("/delete", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const response: boolean = await deleteAccount(req.user?.id!);
    if (response) {
      responseSuccess(res, 200, "User deleted");
    }

    return;
  } catch (error: any) {
    responseError(res, error);
    return;
  }
});

export default route;