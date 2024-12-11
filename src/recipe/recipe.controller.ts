import {Router, Response, Request} from "express";
import {getRecipe} from "./recipe.service";
import {RawRecipe} from "../utils/interfaces";
import {responseError, responseSuccess} from "../utils/response/Response";

const route = Router();

route.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe: RawRecipe = await getRecipe(id);
    responseSuccess(res, 200, "Recipe found", recipe);

    return;
  } catch (error: any) {
    responseError(res, error);
    return;
  }
});

export default route;