import {collection, query, addDoc, getDocs, where, updateDoc, doc, getDoc, deleteDoc} from "firebase/firestore";
import { db } from "../config/firebase";
import {RawUser, User} from "../utils/interfaces";
import {InternalServerError, NotFoundError} from "../utils/response/Error";

const userCollection = collection(db, "users");

const createNewUser = async (user: RawUser): Promise<Omit<User, "password">> => {
  const userRef = await addDoc(userCollection, user);
  if (!userRef) {
    throw new InternalServerError("Something went wrong");
  }

  return { id: userRef.id, name: user.name, email: user.email };
}

const userExists = async (id: string): Promise<boolean> => {
  const findId = await getDoc(doc(db, "users", id));
  return findId.exists();
}

const emailExists = async (email: string): Promise<boolean> => {
  const findEmail = await getDocs(query(userCollection, where("email", "==", email)));
  return !findEmail.empty;
}


const getUserById = async (id: string): Promise<User> => {
  const user = await getDoc(doc(db, "users", id));
  if (!user.exists()) {
    throw new NotFoundError("User has not been registered");
  }

  return { id: user.id, ...user.data() } as User;
}


const getUserByEmail = async (email: string): Promise<User> => {
  const user = await getDocs(query(userCollection, where("email", "==", email)));
  if (user.empty) {
    throw new NotFoundError("User has not been registered");
  }

  return { id: user.docs[0].id, ...user.docs[0].data() } as User;
}


const updateUserDoc = async (id: string, user: RawUser): Promise<Omit<User, "password">> => {
  const userRef = doc(db, "users", id);
  if (!userRef) {
    throw new InternalServerError("Something went wrong");
  }

  await updateDoc(userRef, { ...user });

  return { id, name: user.name, email: user.email };
}


const deleteUserDoc = async (id: string): Promise<void> => {
  const userRef = doc(db, "users", id);
  if (!userRef) {
    throw new InternalServerError("Something went wrong");
  }

  await deleteDoc(userRef);

  return;
}


export {
  createNewUser,
  userExists,
  emailExists,
  getUserById,
  getUserByEmail,
  updateUserDoc,
  deleteUserDoc
}