import { Response, Router } from "express";
import {responseError, responseSuccess} from "../utils/response/Response";
import {AuthenticatedRequest, CleanRecipe, RawFavorite} from "../utils/interfaces";
import {createFavorite, getFavorites} from "./favorite.service";

const route = Router()

route.get("/", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const favorites = await getFavorites(req.user?.id!);
    responseSuccess(res, 200, "Favorites retrieved", favorites);
    return;
  } catch (error: any) {
    responseError(res, error)
    return;
  }
});

route.post("/", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const favoriteInput: CleanRecipe = req.body;

    const newFavorite = await createFavorite({ ...favoriteInput, userId: req.user?.id! } as RawFavorite);

    responseSuccess(res, 201, "Favorite created", newFavorite);
    return;
  } catch (error: any) {
    responseError(res, error)
    return;
  }
});

export default route;