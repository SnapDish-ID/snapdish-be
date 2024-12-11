import {CleanRecipe, RawFavorite} from "../utils/interfaces";
import {setDoc, collection, doc, getDocs, where, query} from "firebase/firestore";
import {db} from "../config/firebase";
import {NotFoundError} from "../utils/response/Error";


const generateNewFavorite = async (favorite: RawFavorite): Promise<void> => {
  return await setDoc(doc(db, "favorites", `${favorite.userId}_${favorite.recipeId}`), favorite);
}


const getAllFavorites = async (userId: string): Promise<CleanRecipe[]> => {
  const q =
    query(collection(db, "favorites"),
      where("userId", "==", userId));

  const favoritesSnapshot = await getDocs(q);

  if (favoritesSnapshot.empty) {
    throw new NotFoundError("No favorites found");
  }

  const favorites: CleanRecipe[] = [];

  favoritesSnapshot.forEach((doc) => {
    const favorite: CleanRecipe = {
      recipeId: doc.data().recipeId,
      title: doc.data().title,
      category: doc.data().category,
    }

    favorites.push(favorite);
  });

  return favorites;
}


export {
  generateNewFavorite,
  getAllFavorites
}