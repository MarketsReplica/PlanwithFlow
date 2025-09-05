// signInWithGoogle.ts
import { isSafari, isFirefox, isChrome, isEdge } from "react-device-detect";

import { signInWithRedirect, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, provider } from "@/services/firebase";
import configs from "@/appConfig.js";

const config = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
};

const createScript = () => {
  // load the sdk
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.onload = initGoogleGSI;
  document.body.appendChild(script);
};

const initGoogleGSI = () => {
  console.log("initGoogleGSI SDK initialized");
  loginUser();
  window.google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      document.cookie = "g_state=''";
      window.google.accounts.id.prompt();
      console.log("Prompt cancelled by user");
      loginUser();
    }
  });
};

export const loginUser = async () => {
  if (!configs.enableFirebase) return;
  window.google.accounts.id.initialize({
    client_id: config.clientId,
    cancel_on_tap_outside: false,
    ux_mode: 'redirect',
    callback: async (token) => {
      const credential = GoogleAuthProvider.credential(token.credential);
      const result = await signInWithCredential(auth, credential);
      console.log('result', result);

    }
    , // defined at request time
  });

  // window.google.accounts.oauth2.initTokenClient({
  //   client_id: "850297259628-jv0lb75dkjqa9hn2b31862tolasopton.apps.googleusercontent.com",
  //   scope: `profile email`,
  //   prompt:'select_account',
  //   callback: (token) => console.log('token', token)
  //   , // defined at request time
  // });

};

const signInWithGoogle = (resolver?: () => void): void => {
  createScript();
  // if (isChrome || isEdge) {
  //   signInWithRedirect(auth, provider, resolver).catch((error) => {
  //     console.error("Error signing in with Google: ", error);
  //   });
  // } else {
  //   signInWithRedirect(auth, provider, resolver).catch((error) => {
  //     console.error("Error signing in with Google: ", error);
  //   });
  // }
};
export default signInWithGoogle;
