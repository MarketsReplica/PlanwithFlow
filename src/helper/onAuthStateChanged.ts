// onAuthStateChanged.ts
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";

type OnUserSignedIn = (user: User) => void;
type OnUserSignedOut = () => void;

const handleAuthStateChanged = (
  onUserSignedIn: OnUserSignedIn,
  onUserSignedOut: OnUserSignedOut
): (() => void) => {
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        onUserSignedIn(user);
      } else {
        onUserSignedOut();
      }
    },
    (error) => {
      console.error("Error with onAuthStateChanged: ", error);
    }
  );

  return unsubscribe;
};

export default handleAuthStateChanged;
