import {User} from "../utils/interfaces";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = async (user: Omit<User, "password">): Promise<string> => {
  return jwt.sign(
    user,
    process.env.JWT_SECRET as string,
    {expiresIn: "7 days"}
  );
}

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, process.env.SALT_ROUNDS!);
}

export { createToken, hashPassword };