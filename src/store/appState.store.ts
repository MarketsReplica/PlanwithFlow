import { atom, SetterOrUpdater } from "recoil";
import { AppState } from "@excalidraw/excalidraw/types/types";
import _ from "lodash";
import { cloneObject } from "@/helper/object.helper";

let lock = false;

export const excalidrawAppState = atom<AppState | undefined>({
  key: "appState",
  default: undefined,
});
export const updateAppState = (appState?: AppState, currentAppState?: AppState, setAppState?: SetterOrUpdater<AppState | undefined>) => {
  if (appState?.cursorButton === "down") lock = true;
  else lock = false;

  if (!lock && !_.isEqual(cloneObject(appState ?? {}), currentAppState) && appState) {
    setAppState?.(cloneObject(appState));
  }
};
