// authFunctions.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // make sure your firebase.js exports `auth`

// Sign up function
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Sign in function (you can use this later for login)
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
