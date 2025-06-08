import {
  ExcalidrawElement,
  ExcalidrawTextElement,
  ExcalidrawTextElementWithContainer,
  NonDeletedExcalidrawElement,
} from "@excalidraw/excalidraw/types/element/types";
import { flowData } from "@/types/flowData.type";
import _ from "lodash";
import { getCurrentYearData } from "@/store/flowData.store";
import { AppState } from "@excalidraw/excalidraw/types/types";

export const updateSceneWithElements = (
  updateScene: (data: { elements: ExcalidrawElement[] }) => void,
  elements: ExcalidrawElement[],
  flowData: flowData
) => {
  if (
    !_.isEqual(getCurrentYearData(flowData).elements, elements ? elements : {})
  )
    updateScene({ elements: getCurrentYearData(flowData).elements });
};

export const isTextElement = (
  element: ExcalidrawElement | null
): element is ExcalidrawTextElement => {
  return element != null && element.type === "text";
};
export const isBoundToContainer = (
  element: ExcalidrawElement | null
): element is ExcalidrawTextElementWithContainer => {
  return (
    element !== null &&
    "containerId" in element &&
    element.containerId !== null &&
    isTextElement(element)
  );
};
export const getSelectedElements = (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: AppState,
  includeBoundTextElement: boolean = false
) =>
  elements.filter((element) => {
    if (appState.selectedElementIds[element.id]) {
      return element;
    }
    if (
      includeBoundTextElement &&
      isBoundToContainer(element) &&
      appState.selectedElementIds[element?.containerId]
    ) {
      return element;
    }
    return null;
  });

export const getTargetElements = (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: AppState
) =>
  appState.editingElement
    ? [appState.editingElement]
    : getSelectedElements(elements, appState, true);

export const getElementById = (
  elements: readonly NonDeletedExcalidrawElement[],
  id: string
) => elements.filter((el) => el?.id === id).flat();
