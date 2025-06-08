import { storage, firestore } from "@/services/firebase"; // Update this import path based on your file structure
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, where, orderBy, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { exportToBlob } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { messageType } from "../components/organisms/AssistBox";
import { FireStoreCanvasData } from "@/types/fireStoreData.type";

export const handleSaveToFireStore = async (
  excApi: ExcalidrawImperativeAPI | undefined,
  user: User,
  flowData: any,
  messages: messageType[],
  name: string,
  description: string
): Promise<string | null> => {
  if (!excApi) {
    return null;
  }
  const blob = await exportToBlob({
    elements: excApi?.getSceneElements(),
    mimeType: "image/png",
    files: excApi.getFiles(),
  });
  // Generate a unique filename using a timestamp
  const fileName = `canvas-image-${user.uid}-${new Date().getTime()}.png`;
  const canvasFileName = `canvas-data-${user.uid}-${new Date().getTime()}.json`;
  // Create a storage reference for the file
  const fileRef = ref(storage, `canvas-images/${fileName}`);
  const canvasFileRef = ref(storage, `canvas-data/${canvasFileName}`);
  // Upload the file to Firebase Storage
  await uploadBytes(fileRef, blob);
  await uploadBytes(canvasFileRef, new Blob([JSON.stringify(flowData)], { type: "application/json" }));
  // Get the download URL of the uploaded file
  const imageURL = await getDownloadURL(fileRef);
  // Generate a UUID for the Firestore document
  const uuid = uuidv4();
  // Save the file reference in Firestore
  if (!name) name = "Flow Canvas";
  if (!description) description = "No description";

  await setDoc(doc(firestore, "canvasData", uuid), {
    userId: user.uid,
    imageURL,
    canvas: canvasFileRef.fullPath,
    messages: JSON.stringify(messages),
    createdAt: new Date(),
    name,
    description,
  });

  return uuid;
};

export const fetchUserData = async (userID: string | null): Promise<FireStoreCanvasData[]> => {
  // Fetch stored data for the authenticated user
  if (!userID) {
    return [];
  }
  const dataQuery = query(
    collection(firestore, "canvasData"),
    where("userId", "==", userID),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(dataQuery);
  const data: FireStoreCanvasData[] = [];

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const { userId, imageURL, canvas, createdAt, name, description } = doc.data();
      const canvasRef = ref(storage, canvas);
      const canvasDataURL = await getDownloadURL(canvasRef);

      data.push({
        id: doc.id,
        userId,
        imageURL,
        canvas: canvasDataURL,
        createdAt: createdAt.toDate(),
        name,
        description,
      });
    })
  );

  data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return data;
};

export const fetchFlowDataFromFirestore = async (uuid: string): Promise<any> => {
  // Get the document reference
  const docRef = doc(firestore, "canvasData", uuid);

  // Fetch the document from Firestore
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Document data
    const data = docSnap.data();

    // Get the storage reference
    const canvasFileRef = ref(storage, data?.canvas);

    // Get the download URL
    const canvasDataURL = await getDownloadURL(canvasFileRef);

    // Fetch the data from the URL
    const response = await fetch(canvasDataURL);
    const flowData = await response.json();

    return { flowData: flowData, messages: JSON.parse(data?.messages) };
  } else {
    console.log("No such document!");
    return null;
  }
};
