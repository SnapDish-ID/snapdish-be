import bcrypt from "bcrypt";
import {createNewUser, deleteUserDoc, emailExists, getUserByEmail, getUserById, updateUserDoc} from "./user.model";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError
} from "../utils/response/Error";
import {LoginInput, LoginOutput, RawUser, RegisterOutput, UpdateOutput, UserPublic} from "../utils/interfaces";
import {emailRegex} from "../utils/regex";
import {createToken, hashPassword} from "../auth/auth.service";

const getUser = async (id: string): Promise<UserPublic> => {
  if (!id) {
    throw new BadRequestError("Missing required fields");
  }
  const user = await getUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }
  return { name: user.name, email: user.email };
}


const loginUser = async (input: LoginInput): Promise<LoginOutput> => {
  if (!input.email || !input.password) {
    throw new BadRequestError("Missing required fields");
  }

  const userLogin = await getUserByEmail(input.email);
  if (!userLogin) {
    throw new NotFoundError("User not found");
  }

  const passwordMatch = await bcrypt.compare(input.password, userLogin.password);
  if (!passwordMatch) {
    throw new ForbiddenError("Invalid credentials");
  }

  const token = await createToken(userLogin);

  return { token };
}


const createUser = async (user: RawUser): Promise<RegisterOutput> => {
  if (!user.email || !user.name || !user.password) {
    throw new BadRequestError("Missing required fields");
  }

  if (!emailRegex.test(user.email)) {
    throw new BadRequestError("Invalid email");
  }

  if (await emailExists(user.email)) {
    throw new UnprocessableEntityError("Email already exists");
  }

  user.password = await hashPassword(user.password);

  const newUser = await createNewUser(user);
  if (!newUser) {
    throw new InternalServerError("User not created");
  }

  const token = await createToken(newUser);

  const userData: UserPublic = { name: newUser.name, email: newUser.email };

  return { userData, token };
}


const updateUser = async (id: string, user: RawUser): Promise<UpdateOutput> => {
  if (!id || !user.email || !user.name || !user.password) {
    throw new BadRequestError("Missing required fields");
  }

  if (!emailRegex.test(user.email)) {
    throw new BadRequestError("Invalid email");
  }

  if (await emailExists(user.email)) {
    throw new UnprocessableEntityError("Email already exists");
  }

  user.password = await hashPassword(user.password);

  const updatedUser = await updateUserDoc(id, user);
  if (!updatedUser) {
    throw new InternalServerError("User not updated");
  }

  const token = await createToken(updatedUser);

  const userData: UserPublic = { name: updatedUser.name, email: updatedUser.email };

  return { userData, token };
}


const deleteAccount = async (id: string): Promise<boolean> => {
  if (!id) {
    throw new BadRequestError("Missing required fields");
  }
  await deleteUserDoc(id);

  return true;
}




export {
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteAccount
}