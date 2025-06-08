// signOut.ts
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export default signOutUser;
