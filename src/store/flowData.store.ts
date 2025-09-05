import moment from "moment";
import { atom, SetterOrUpdater } from "recoil";
import { flowData } from "@/types/flowData.type";
import { cloneObject } from "@/helper/object.helper";
import { AppState } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import _ from "lodash";
import { cashbox, finData, metadata } from "@/types/metadata.type";
import configs from "@/appConfig";

let lock = false;

function getYearMonth(offset: number): { year: number; month: number } {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + offset);

  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1, // Adjusting to non-zero index
  };
}

export const flowDataState = atom<flowData>({
  key: "elements",
  //@ts-ignore
  // default: template,
  default: (() => {
    const arr = Array.from(Array(configs.projectionLength * 12).keys()).map((index) => {
      const { year, month } = getYearMonth(index);
      return {
        elements: [],
        metaData: {
          currentYear: year === new Date().getFullYear(),
          year,
          month,
          netWorth: 0,
          finData: [],
        },
      };
    });
    return arr as flowData;
  })(),
});

export const setNewCurrentYear = (
  flowData: flowData,
  setFlowData: SetterOrUpdater<flowData>,
  month: number,
  year: number
) => {
  setFlowData(
    flowData.map((data) => {
      const el = cloneObject(data);

      if (el.metaData.month === month && el.metaData.year === year) {
        el.metaData.currentYear = true;
      } else {
        el.metaData.currentYear = false;
      }

      return el;
    })
  );
};

export const updateElementInTheCurrentYear = (
  excalidElements: ExcalidrawElement[],
  appState: AppState,
  flowData: flowData,
  setFlowData: SetterOrUpdater<flowData>
) => {
  if (appState.cursorButton === "down") lock = true;
  else lock = false;

  if (!lock && !_.isEqual(getCurrentYearData(flowData).elements, excalidElements)) {
    console.log("updateElementInTheCurrentYear");

    setFlowData(
      flowData.map((data, index) => {
        const cData = cloneObject(data);
        // console.log(getCurrentYearIndex(flowData));
        if (index >= getCurrentYearIndex(flowData)) {
          cData.elements = excalidElements;
        }
        return cData;
      })
    );
    console.log(
      "updateElementInTheCurrentYear :",
      flowData.map((data, index) => {
        const cData = cloneObject(data);
        // console.log(getCurrentYearIndex(flowData));
        if (index >= getCurrentYearIndex(flowData)) {
          cData.elements = excalidElements;
        }
        return cData;
      })
    );

    lock = false;
  }
};

export const updateSpecElementInTheScene = (
  excalidElements: ExcalidrawElement[],
  diffElements: ExcalidrawElement[],
  appState: AppState,
  flowData: flowData,
  setFlowData: SetterOrUpdater<flowData>
) => {
  if (appState.cursorButton === "down") lock = true;
  else lock = false;

  if (
    !lock &&
    diffElements.length > 0 &&
    !_.isEqual(getCurrentYearData(flowData).elements, excalidElements)
  ) {
    // find which elements of the diffElements are from new elements and which are from existing elements
    const newdiffElements = diffElements.filter(
      (el) =>
        !getCurrentYearData(flowData)
          .elements.map((el) => el.id)
          .includes(el.id)
    );
    const existingdiffElements = diffElements.filter((el) =>
      getCurrentYearData(flowData)
        .elements.map((el) => el.id)
        .includes(el.id)
    );
    // logic on how we will update the rest of FlowData the months given by the existingdiffElements in the current year
    // The logic is to update the element for all months except if the element is deleted
    if (existingdiffElements.length > 0) {
      const updatedFlowData = flowData.map((data, index) => {
        const cData = cloneObject(data);
        if (index >= getCurrentYearIndex(flowData)) {
          //update only future months of the flowData
          // update flowData with the updated values for the elements coming from Excalidraw
          for (let i = 0; i < existingdiffElements.length; i++) {
            const index = cData.elements.findIndex(
              (el: ExcalidrawElement) => el.id === existingdiffElements[i].id && el.isDeleted === false
            );
            cData.elements[index] = existingdiffElements[i];
          }
        }
        return cData;
      });

      //remove isdeleted== true elements out of the updatedFlowData
      for (let n = 0; n < updatedFlowData.length; n++) {
        for (let i = 0; i < updatedFlowData[n].elements.length; i++) {
          if (updatedFlowData[n].elements[i].isDeleted === true) {
            let deletedElementId = updatedFlowData[n].elements[i].id;
            updatedFlowData[n].elements.splice(i, 1);
            updatedFlowData[n].metaData.finData.splice(
              updatedFlowData[n].metaData.finData.findIndex((el: { id: any }) => el.id === deletedElementId),
              1
            );
            i--;
          }
        }
      }

      setFlowData(updatedFlowData);
    }
    if (newdiffElements.length > 0) {
      setFlowData(
        flowData.map((data, index) => {
          const cData = cloneObject(data);
          // console.log(getCurrentYearIndex(flowData));
          if (index >= getCurrentYearIndex(flowData)) {
            for (let i = 0; i < newdiffElements.length; i++) {
              cData.elements.push(newdiffElements[i]);
            }
          }
          return cData;
        })
      );
    }
    lock = true;
  }
};

export const checkIfIdIsInMetadata = (flowData: flowData, id: string) => {
  const cur = getCurrentYearData(flowData);

  if (cur?.metaData?.finData) return cur?.metaData?.finData?.findIndex((m) => m.id === id) !== -1;
  else return false;
};

// function to update the metaData.finData when an element is added for the first time to the canvas
export const updateMetadataInTheCurrentYear = (
  finData: finData,
  appState: AppState,
  flowData: flowData,
  setFlowData: SetterOrUpdater<flowData>
) => {
  if (appState?.cursorButton === "down") lock = true;
  else lock = false;

  console.log("new one", finData);
  console.log("old one ", getCurrentYearData(flowData).metaData.finData);

  if (!lock && !_.isEqual(getCurrentYearData(flowData).metaData.finData, finData)) {
    console.log("update MetaData");

    setFlowData(
      flowData.map((data, index) => {
        const cData = cloneObject(data);
        if (index >= getCurrentYearIndex(flowData)) {
          if (cData.metaData) cData.metaData.finData.push(finData);
        }
        return cData;
      })
    );
    console.log(
      "After adding a new element finData, here is flowData :",
      flowData.map((data, index) => {
        const cData = cloneObject(data);
        if (index >= getCurrentYearIndex(flowData)) {
          if (cData.metaData) cData.metaData.finData.push(finData);
        }
        return cData;
      })
    );

    lock = false;
  }
};
// function for updating the metaData.finData for the current and future months when elements finData property change in the menu
export const rewriteMetadataInTheCurrentYear = (
  finData: finData, // the new finData of the element
  appState: AppState,
  flowData: flowData,
  setFlowData: SetterOrUpdater<flowData>,
  propatationRule: string,
  id: string //id of the element that is selected.
) => {
  if (appState?.cursorButton === "down") lock = true;
  else lock = false;

  console.log("new one", finData);
  console.log("old one ", getCurrentYearData(flowData).metaData.finData);

  if (!lock && !_.isEqual(getCurrentYearData(flowData).metaData.finData, finData)) {
    console.log("update MetaData");
    const finDataIndex = finData.findIndex((el) => el.id === id);
    setFlowData(
      flowData.map((data, index) => {
        const cData = cloneObject(data); // the old finData of the element that should be replaced by the new one finData
        const cDataIndex = cData.metaData.finData.findIndex((el: { id: string }) => el.id === id);
        if (cDataIndex !== -1 && finDataIndex !== -1) {
          if (propatationRule === "current_month") {
            if (index === getCurrentYearIndex(flowData)) {
              if (cData.metaData) cData.metaData.finData[cDataIndex] = finData[finDataIndex];
            }
          } else if (propatationRule === "future_months") {
            if (index >= getCurrentYearIndex(flowData)) {
              if (cData.metaData) cData.metaData.finData[cDataIndex] = finData[finDataIndex];
            }
          } else if (propatationRule === "all_months") {
            if (cData.metaData) cData.metaData.finData[cDataIndex] = finData[finDataIndex];
          }
        }
        return cData;
      })
    );

    console.log(
      "flowData updated from rewriteMetadataInTheCurrentYear: ",
      flowData.map((data, index) => {
        const cData = cloneObject(data);
        if (index >= getCurrentYearIndex(flowData)) {
          if (cData.metaData) cData.metaData.finData = finData;
        }
        return cData;
      })
    );

    lock = false;
  }
};

export function getCurrentYearData(flowData: flowData) {
  const output = flowData.filter((el) => el?.metaData?.currentYear)[0];
  const a = {
    ...output,
    appState: { viewBackgroundColor: "#F9F6F3", currentItemFontFamily: 1 },
  };
  return a;
}
export const getCurrentYearIndex = (flowData: flowData) =>
  flowData.findIndex((el) => el?.metaData?.currentYear);

export const updateTheWholeDataWithFinData = (
  flowData: flowData,
  setFlowData: SetterOrUpdater<flowData>,
  finDataArray: finData[],
  appState: AppState
) => {
  if (appState?.cursorButton === "down") lock = true;
  else lock = false;

  if (!lock) {
    const clone = cloneObject(flowData);
    finDataArray.forEach((el, index) => {
      clone[index].metaData.finData = el;
      //@ts-ignore
      clone[index].metaData.netWorth = el.netWorth;
    });
    if (!_.isEqual(clone, flowData)) {
      console.log("updateTheWholeDataWithFinData: ", clone);
      setFlowData(clone);
    }
  }
};
