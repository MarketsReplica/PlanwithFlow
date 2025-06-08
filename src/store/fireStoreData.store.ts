// fireStoreData.store.ts
import { atom } from "recoil";
import { FireStoreCanvasData } from "@/types/fireStoreData.type";

export const fireStoreCanvasDataState = atom<FireStoreCanvasData[]>({
  key: "fireStoreCanvasDataState",
  default: [],
});

export const authenticatedUserID = atom<string | null>({
  key: "authenticatedUser",
  default: null,
});
