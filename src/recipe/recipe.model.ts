import {db} from "../config/firebase";
import {doc, getDoc} from "firebase/firestore";
import {NotFoundError} from "../utils/response/Error";
import {RawRecipe} from "../utils/interfaces";

const getRecipeById = async (id: string): Promise<RawRecipe> => {
  const recipe = await getDoc(doc(db, "recipes", id));
  if (!recipe.exists()) {
    throw new NotFoundError("Recipe not found");
  }

  return recipe.data() as RawRecipe;
}

export { getRecipeById };