import {CleanRecipe, RawFavorite} from "../utils/interfaces";
import {generateNewFavorite, getAllFavorites} from "./favorite.model";
import {userExists} from "../user/user.model";
import {NotFoundError} from "../utils/response/Error";

const createFavorite = async (favorite: RawFavorite): Promise<void> => {

  const validateUser = await userExists(favorite.userId);
  if (!validateUser) {
    throw new NotFoundError("User does not exist");
  }

  return await generateNewFavorite(favorite);
}

const getFavorites = async (userId: string): Promise<CleanRecipe[]> => {
  if (!userId) {
    throw new NotFoundError("No favorites found");
  }

  return  await getAllFavorites(userId);
}

export {
  createFavorite,
  getFavorites
}