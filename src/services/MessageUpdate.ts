import { cloneDeep } from "lodash";
interface ElementTimeSeries {
  date: string;
  value: number;
}

function updateMessages(
  messages: { message: string; sender: string; dataPlot: ElementTimeSeries[] | undefined }[],
  data: ElementTimeSeries[]
) {
  const cloneMessages = cloneDeep(messages);
  if (!data) return cloneMessages;

  if (cloneMessages.at(-1)?.sender === "CanvasPlotter") {
    cloneMessages.splice(-1, 1, {
      message: "Data for the selected canvas element:",
      sender: "CanvasPlotter",
      dataPlot: data,
    });
  } else {
    cloneMessages.push({
      message: "Data for the selected canvas element:",
      sender: "CanvasPlotter",
      dataPlot: data,
    });
  }
  return cloneMessages;
}

export default updateMessages;
