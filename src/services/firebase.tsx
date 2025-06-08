import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkzAeX6VEL9hfQITKRfauWndWHurzTHKo",
  authDomain: "flow-b60e6.firebaseapp.com",
  databaseURL: "https://flow-b60e6-default-rtdb.firebaseio.com",
  projectId: "flow-b60e6",
  storageBucket: "flow-b60e6.appspot.com",
  messagingSenderId: "850297259628",
  appId: "1:850297259628:web:73088044d4e55d119ffa49",
  measurementId: "G-Y6RR4SYP8R",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, database, auth, provider, storage, firestore };
