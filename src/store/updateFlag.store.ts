import { atom } from "recoil";

export const updateFlagAtom = atom({
  key: "updateFlag",
  default: "none",
});

export const updateModalOpen = atom<string>({
  key: "updateModal",
  default: "none",
});

export const isFinModelUpdatedTheApplication = (flag: string) => flag === "finModel";
