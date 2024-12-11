import {BadRequestError} from "../utils/response/Error";
import {RawRecipe} from "../utils/interfaces";
import {getRecipeById} from "./recipe.model";

const getRecipe = async (id: string): Promise<RawRecipe> => {
  if (!id) {
    throw new BadRequestError("Missing required fields");
  }

  return await getRecipeById(id);
}

export { getRecipe };