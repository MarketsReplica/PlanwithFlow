import { database } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { ref, set, get } from "firebase/database";
// input of any, output type is string
const saveVariableToFirebase = async (flowData: any, messages: any): Promise<string | null> => {
  const valueStr = { flowDataStr: JSON.stringify(flowData), messagesStr: JSON.stringify(messages) };
  const uuid = uuidv4();
  const dataRef = ref(database, `data/${uuid}`);

  try {
    await set(dataRef, valueStr);
    console.log(`Data saved with UUID: ${uuid}`);
    // Use the UUID to construct the URL as needed.
    const url = `https://app.planwithflow.com/${uuid}`;
    console.log(`Your URL is: ${url}`);
    return uuid;
  } catch (error: any) {
    console.error("Error saving data to Firebase:", error);
    return null;
  }
};

const loadVariableFromFirebase = async (uuid: string): Promise<any> => {
  try {
    const dataRef = ref(database, `data/${uuid}`);
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const data = await snapshot.val();
      let flowDatafromFirebase = null;
      let messagesfromFirebase = null;
      if (data.flowDataStr) {
        flowDatafromFirebase = JSON.parse(data?.flowDataStr);
      }
      if (data.messagesStr) {
        messagesfromFirebase = JSON.parse(data?.messagesStr);
      }
      console.log("flowData in load function: ", flowDatafromFirebase);
      return { flowData: flowDatafromFirebase, messages: messagesfromFirebase };
    } else {
      console.error(`No data found for UUID: ${uuid}`);
      return null;
    }
  } catch (error) {
    console.error("Error loading data from Firebase:", error);
    return null;
  }
};

export default { saveVariableToFirebase, loadVariableFromFirebase };
