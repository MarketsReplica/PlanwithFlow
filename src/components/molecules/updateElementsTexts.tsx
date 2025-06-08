import { cloneObject } from "@/helper/object.helper";

import { flowData } from "@/types/flowData.type";
//import finData type
import { elementType, fin } from "@/types/metadata.type";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
const createText = (
  containerId: string,
  originalText: string,
  strokeColor: string,
  text: string,
  width: number,
  id: string,
  x: number,
  y: number
) => {
  return {
    angle: 0,
    backgroundColor: "transparent",
    baseline: 18,
    boundElements: null,
    containerId, // Container ID.
    fillStyle: "hachure",
    fontFamily: 1,
    fontSize: 16,
    groupIds: [],
    height: 25,
    id, // CREATE THISw
    isDeleted: false,
    link: null,
    locked: false,
    opacity: 100,
    originalText, // CREATE THIS
    roughness: 0,
    roundness: null,
    seed: 2117425206,
    strokeColor, // CREATE THIS
    strokeStyle: "solid",
    strokeWidth: 1,
    text, // CREATE THIS
    textAlign: "center",
    type: "text",
    updated: 1676537078633,
    version: 61,
    versionNonce: 1415363179,
    verticalAlign: "middle",
    width, // CREATE THIS
    x, // CREATE THIS
    y, // CREATE THIS
  };
};

function labelMap(finDataElement: fin) {
  const str = finDataElement.type;
  switch (str) {
    case "income":
      return "Income";
    case "expense":
      return "Expense";
    case "assetRealEstate":
      return "Real Estate";
    case "assetSecurities":
      return "Stocks Portfolio";
    case "cashbox":
      return "Cash";
    case "assetRealAssets":
      return "Real Assets";
    case "liability":
      return "Debt";
    case "transaction":
      return "";
    default:
      return "";
  }
}

export function updateElementsTexts(flowData: flowData) {
  const flowDataTexts = cloneObject(flowData);
  //remove isdeleted== true elements out of the flowData
  for (let n = 0; n < flowDataTexts.length; n++) {
    for (let i = 0; i < flowDataTexts[n].elements.length; i++) {
      if (flowDataTexts[n].elements[i].isDeleted === true) {
        let deletedElementId = flowDataTexts[n].elements[i].id;
        flowDataTexts[n].elements.splice(i, 1);
        flowDataTexts[n].metaData.finData.splice(
          //@ts-ignore
          flowDataTexts[n].metaData.finData.findIndex((el) => el.id === deletedElementId),
          1
        );
        i--;
      }
    }
  }
  for (let n = 0; n < flowData.length; n++) {
    for (let i = 0; i < flowData[n].elements.length; i++) {
      // Type 1: element does ot have a bounded text
      if (
        !["line", "text", "freedraw"].includes(flowData[n].elements[i].type) &&
        flowData[n].elements[i].isDeleted === false &&
        !(flowData[n].elements[i].boundElements?.map((el) => el.type).includes("text") ?? false) &&
        flowData[n].elements[i].isDeleted === false
      ) {
        let finDataIndex = flowData[n].metaData.finData?.findIndex(
          (el) => el.id === flowData[n].elements[i].id
        );
        // to maintain the same id for the new bounde text to elements[i] for all n, we create an static id'
        let newId = flowData[n].elements[i].id.slice(0, 21 - 6) + "-label";
        // if the element is an arrow then text doesn't get \n
        let text =
          //@ts-ignore
          labelMap(flowData[n].metaData.finData[finDataIndex]) +
          ((x) => (x === "arrow" ? "" : "\n "))(flowData[n].elements[i].type) +
          //@ts-ignore
          flowData[n].metaData.finData[finDataIndex].data.value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        let x = flowData[n].elements[i].x + flowData[n].elements[i].width / 2 - 100;
        let y = flowData[n].elements[i].y + flowData[n].elements[i].height / 2 - 4;
        flowDataTexts[n].elements.push(
          createText(flowData[n].elements[i].id, text, "#454443", text, 200, newId, x, y)
        );
        //assign bounded text to the current element
        if (!flowData[n].elements[i].boundElements) {
          flowDataTexts[n].elements[i].boundElements = [];
        }
        flowDataTexts[n].elements[i].boundElements.push({ id: newId, type: "text" });
        flowDataTexts[n].metaData.finData.push({
          id: newId,
          type: "none",
          //@ts-ignore
          data: flowData[n].metaData.finData[finDataIndex].data,
        });
        // Type 2: element has a bounded text already
      } else if (
        !["line", "text", "freedraw"].includes(flowData[n].elements[i].type) &&
        flowData[n].elements[i].isDeleted === false &&
        flowData[n].elements[i].isDeleted === false
      ) {
        //same as above but for the case when the text is already bounded just update the currency number
        let finDataIndex = flowData[n].metaData.finData?.findIndex(
          (el) => el.id === flowData[n].elements[i].id
        );
        let textboundIndex = flowData[n].elements[i].boundElements?.find((el) => el.type === "text")?.id;
        let textflowIndex = flowData[n].elements.findIndex((el) => el.id === textboundIndex);
        // Type 2-1: (Cash\n$3,000) if the element text contains \n just update the currency number.
        if (flowDataTexts[n].elements[textflowIndex].text.includes("\n")) {
          let text =
            //@ts-ignore
            flowData[n].elements[textflowIndex].text.split("\n")[0] +
            "\n " +
            //@ts-ignore
            flowData[n].metaData.finData[finDataIndex].data.value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
          if (textflowIndex) {
            flowDataTexts[n].elements[textflowIndex].text = text;
            flowDataTexts[n].elements[textflowIndex].originalText = text;
            flowDataTexts[n].elements[textflowIndex].width = 100;
            flowDataTexts[n].elements[textflowIndex].x =
              flowData[n].elements[i].x + flowData[n].elements[i].width / 2 - 50;
            flowDataTexts[n].elements[textflowIndex].y =
              flowData[n].elements[i].y + flowData[n].elements[i].height / 2 - 4;
          }
        } else {
          // Type 2-2: (Cash) or ($1,500)  if the element text does not contain \n then add \n and update the currency number or in the case of ($1,500) just update the currency number.
          let text =
            //@ts-ignore
            ((x) => (x.includes("$") ? "" : flowData[n].elements[textflowIndex].text))(
              //@ts-ignore
              flowData[n].elements[textflowIndex].text
            ) +
            ((x) => (x === "arrow" ? "" : "\n "))(flowData[n].elements[i].type) +
            //@ts-ignore
            flowData[n].metaData.finData[finDataIndex].data.value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });

          if (textflowIndex) {
            flowDataTexts[n].elements[textflowIndex].text = text;
            flowDataTexts[n].elements[textflowIndex].originalText = text;
            flowDataTexts[n].elements[textflowIndex].width = 100;
            flowDataTexts[n].elements[textflowIndex].x =
              flowData[n].elements[i].x + flowData[n].elements[i].width / 2 - 50;
            flowDataTexts[n].elements[textflowIndex].y =
              flowData[n].elements[i].y + flowData[n].elements[i].height / 2;
          }
        }
      } else if (
        !["line", "text", "freedraw"].includes(flowData[n].elements[i].type) &&
        flowData[n].elements[i].isDeleted === false &&
        flowData[n].elements[i].isDeleted === false
      ) {
        // for elements that have a bounded text and the text is already update with \n and currency

        let textboundIndex = flowData[n].elements[i].boundElements?.find((el) => el.type === "text")?.id;
        let textflowIndex = flowData[n].elements.findIndex((el) => el.id === textboundIndex);
        //@ts-ignore
        let text = flowData[n].elements[textflowIndex].text;
        //check if the text contain \n
        if (text.includes("\n")) {
          // do nothing
        }
      }
    }
  }

  return flowDataTexts;
}
