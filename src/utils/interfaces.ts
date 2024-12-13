import { Request } from "express";
import {JwtPayload} from "jsonwebtoken";

interface BaseModel {
  id: string;
}

type Token = string | JwtPayload;

interface AuthenticatedRequest extends Request {
  user?: Omit<User, "password">
}

// === User ===
interface RawUser {
  email: string;
  name: string;
  password: string;
}

type User = RawUser & BaseModel;

type UserPublic = Omit<RawUser, "password">;

// === Recipe ===
interface RawRecipe {
  title: string;
  category: string;
  ingredients: string[];
  steps: string[];
}

interface CleanRecipe {
  recipeId: string;
  title: string;
  category: string;
}

type Recipe = RawRecipe & BaseModel;

// === Favorite ===
interface RawFavorite {
  recipeId: string;
  userId: string;
  title: string;
  category: string;
}

// === Request Inputs & Outputs ===
interface LoginInput {
  email: string;
  password: string;
}

interface LoginOutput {
  token: string;
}

interface RegisterOutput {
  userData: UserPublic;
  token: Token;
}

type UpdateOutput = RegisterOutput;

export type {
  BaseModel,
  Token,
  AuthenticatedRequest,
  RawUser,
  User,
  RawRecipe,
  Recipe,
  RawFavorite,
  LoginInput,
  LoginOutput,
  RegisterOutput,
  UserPublic,
  UpdateOutput,
  CleanRecipe
}