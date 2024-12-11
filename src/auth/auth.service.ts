import {User} from "../utils/interfaces";
import jwt from "jsonwebtoken";

const createToken = async (user: Omit<User, "password">): Promise<string> => {
  return jwt.sign(
    user,
    process.env.JWT_SECRET as string,
    {expiresIn: "7 days"}
  );
}

export { createToken };