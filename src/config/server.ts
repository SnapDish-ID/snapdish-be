import express from 'express';
import cors from 'cors';

import authMiddleware from "../auth/auth.middleware";
import userController from "../user/user.controller";
import recipeController from "../recipe/recipe.controller";
import favoriteController from "../favorites/favorite.controller";
import authController from "../auth/auth.controller";

const createServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/auth', authController);
  app.use('/api/recipe', recipeController);
  app.use('/api/user', authMiddleware, userController);
  app.use('/api/favorite', authMiddleware, favoriteController);

  return app;
}

export default createServer;