// Libraries
import { Button, Card, Menu, Spin, Switch, Space, ConfigProvider } from "antd";
import { CloseOutlined, MinusOutlined, SendOutlined, MenuOutlined } from "@ant-design/icons";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import Input from "antd/es/input/Input";
import { isMobile } from "react-device-detect";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";
import * as JSON5 from "json5";

// Types
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { fin } from "@/types/metadata.type";
import { flowData } from "@/types/flowData.type";

// State
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData } from "@/store/flowData.store";
import { authenticatedUserID } from "@/store/fireStoreData.store";
import { updateFlagAtom } from "@/store/updateFlag.store";
import { futureWorld } from "@/store/futureWorld.store";
import { showMenuState } from "@/store/menu.store";

// Helpers
import { getTargetElements } from "@/helper/excalidraw.helper";
import signInWithGoogle from "@/helper/signInWithGoogle";
import signOutUser from "@/helper/signOutWithGoogle";
import handleAuthStateChanged from "@/helper/onAuthStateChanged";
import { handleSaveToFireStore } from "@/helper/sharing.helper";

// Components
import MessageBox from "../molecules/MessageBox";
import MyCanvases from "@/components/molecules/MyCanvases";

// Functions & Services
import {
  sendChatRequest,
  sendEntityRequest,
  sendFutureRequest,
  toolProcedures,
} from "../molecules/supportFunctions";
import buildFlowData from "../molecules/templateFlowData";
import sharingFunctions from "@/services/sharingFunctions";
import updateMessages from "@/services/MessageUpdate";
import { firestore } from "@/services/firebase";
import configs from "@/appConfig.js";

//variables
import { baseCoTPrompt, baseQAPrompt } from "../molecules/prompts";
import { initialMessage } from "../molecules/initialMessages";
import { set } from "lodash";

type props = {
  redrawCanvas: (flowData: flowData) => void;
  excApi?: ExcalidrawImperativeAPI;
};

interface ElementTimeSeries {
  date: string;
  value: number;
}

interface TimeSeriesItem {
  date: string;

  [key: string]: string;
}
let dataPlot: TimeSeriesItem[] = [];

interface TimeSeriesType {
  topic: string;
  array: TimeSeriesItem[];
}

export type messageType = {
  message: ReactNode;
  sender: string;
  dataPlot?: TimeSeriesItem[] | undefined;
};

// Create an atom to hold the messages
export const messageState = atom<messageType[]>({
  key: "messageState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const AssistBox = ({ redrawCanvas, excApi }: props) => {
  const [appState, setAppState] = useRecoilState(excalidrawAppState);
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const setUpdateFlag = useSetRecoilState(updateFlagAtom);
  const [futureState, setFutureState] = useRecoilState(futureWorld);
  let currentYearData = getCurrentYearData(flowData);
  const [selectedElement, setSelectedElement] = useState<ExcalidrawElement | null>(null);

  const [selectedTroughTime, setSelectedTroughTime] = useState<ElementTimeSeries[] | undefined>();
  const [selectedElementFinData, setSelectedElementFinData] = useState<fin>();
  const [chatModeIsAgent, setChatModeIsAgent] = useState(true);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useRecoilState(messageState);
  const [messagesGPT, setMessagesGPT] = useState<{ role: string; content: string }[]>([]);

  // REGION START: Sign in with Google Logic
  const [userID, setUserID] = useRecoilState(authenticatedUserID);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!configs.enableFirebase) return;
    const unsubscribe = handleAuthStateChanged(
      (user) => {
        if (user) {
          // user signed in
          //get user data from firestore
          const docRef = doc(firestore, "users", user.uid);
          getDoc(docRef).then((docSnap) => {
            let userLoginNum = 0;
            if (docSnap.exists()) {
              userLoginNum = docSnap.data().userLoginNum;
            }
            //write various user object data to firestore
            setDoc(doc(firestore, "users", user.uid), {
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              lastLogin: new Date(),
              url: window.location.href,
              browser: navigator.userAgent,
              screenWidth: window.screen.width,
              userLoginNum: userLoginNum + 1,
            });
          });

          setMessages((prev) => [
            ...prev,
            {
              message: "You are signed in with user " + user?.email + ".",
              sender: "Canvas",
              dataPlot: undefined,
            },
            ...initialMessage,
          ]);
          setUser(user);
        } else {
          setUser(null);
        }
      },
      () => {}
    );

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  // update state of the userID
  useEffect(() => {
    if (user) {
      setUserID(user.uid);
    } else {
      setUserID(null);
    }
  }, [user]);

  const handleSignIn = () => {
    if (!configs.enableFirebase) {
      setMessages((prev) => [...prev, { message: "Cloud features are disabled.", sender: "Canvas" }]);
      return;
    }
    if (user === null) {
      //@ts-ignore
      signInWithGoogle();
    }
  };

  const handleSignOut = () => {
    if (!configs.enableFirebase) return;
    if (user !== null) {
      signOutUser();
    }
    setUser(null);
    setMessages((prev) => [...prev, { message: "You are signed out.", sender: "Canvas", dataPlot: undefined }]);
  };

  // REGION END: Sign in with Google Logic

  // REGION Start, Chatbox logic

  const drawflow = (message: string) => {
    return new Promise<flowData>(async (resolve) => {
      setLoading(true);
      const res = await sendEntityRequest(message);
      const extractedEntities = res.extractedEntities;
      const jsonResponse = res.jsonResponse;

      // Debug: extracted entities
      // console.debug("extracted entities", extractedEntities);

      if (typeof extractedEntities === "string") {
        setMessages((prev) => [
          ...prev,
          {
            message:
              "I could not extract any financial information from your message. Please try again with /drawflow command at the beginning.",
            sender: "Canvas",
            dataPlot: undefined,
          },
        ]);
        resolve(flowData);
      } else if (typeof extractedEntities === "object") {
        const extractedFlowData = buildFlowData(extractedEntities);
        //@ts-ignore
        setFlowData(extractedFlowData);
        //@ts-ignore
        redrawCanvas(extractedFlowData);
        setUpdateFlag("chatBox");
        setMessages((prev) => [
          ...prev,
          {
            message:
              "OK, I have built a financial model based on the financial information you provided and draw it on Flow Canvas. Here is a summary: " +
              jsonResponse,
            sender: "GPT",
            dataPlot: undefined,
          },
        ]);
        setMessages((prev) => [
          ...prev,
          {
            message:
              "You can now explore the Flow canvas, or ask me questions about your financial situation. What are you planning about?",
            sender: "GPT",
            dataPlot: undefined,
          },
        ]);
        resolve(extractedFlowData);
      }
      setLoading(false);
    });
  };

  // REGION Commands
  // main function for handling a new message
  const sendMessageAndUpdateState = async (message: string) => {
    if (message === "") return;
    // check if the massages contains a command with "/"
    if (message.slice(0, 1) === "/") {
      if (message.slice(1, 9) === "drawflow") {
        drawflow(message);
      }
      if (message.slice(1, 7) === "future") {
        future(message);
      }
      if (message.slice(1, 5) === "save") {
        if (configs.enableFirebase) shareThisCanvas(message);
        else setMessages((prev) => [...prev, { message: "Cloud save is disabled.", sender: "Canvas" }]);
      }
      if (message.slice(1, 5) === "load") {
        if (configs.enableFirebase) loadCanvasfromFirebase(message.slice(6, message.length));
        else setMessages((prev) => [...prev, { message: "Cloud load is disabled.", sender: "Canvas" }]);
      }
      if (message.slice(1, 7) === "signin") {
        handleSignIn();
      }
      if (message.slice(1, 8) === "signout") {
        handleSignOut();
      }
      if (message.includes("my-canvases")) {
        if (configs.enableFirebase) loadMyCanvases();
        else setMessages((prev) => [...prev, { message: "My Canvases requires cloud features.", sender: "Canvas" }]);
      }
      if (message.includes("current")) {
        current(message);
      }
    }
    // if a message is a general chat message.
    if (message.slice(0, 1) !== "/") {
      generalChat(message);
    }
  };

  const loadMyCanvases = () => {
    setMessages((prev) => [
      ...prev,
      {
        message: <MyCanvases redrawCanvas={redrawCanvas} />,
        sender: "Canvas",
        dataPlot: undefined,
      },
    ]);
  };
  // REGION END, Chatbox logic

  // REGION START, Axililary functions for chatbox logic
  // Axilary function for sending a general chat message
  const generalChat = async (message: string) => {
    setLoading(true);
    // First draw canvas based on the information and then redirect to the agentic chat
    const numberUserMessages = messages.filter((message) => message.sender === "User").length;
    if (numberUserMessages === 0) {
      // if the user has just started the chat
      setMessages((prev) => [
        ...prev,
        {
          message: "Let me first draw a Flow financial canvas based on your information.",
          sender: "Canvas",
          dataPlot: undefined,
        },
      ]);
      // draw the canvas
      const outDraw = await drawflow(message);
      // setMessages((prev) => [
      //   ...prev,
      //   {
      //     message: "Is this Flow financial model correctly describe your current situation?",
      //     sender: "Canvas",
      //     dataPlot: undefined,
      //   },
      // ]);
    }
    if (numberUserMessages > 0) {
      // STEPS for constructing the message to be sent to GPT
      const tempMessagesGPT = [];
      if (chatModeIsAgent) tempMessagesGPT.push({ role: "user", content: baseCoTPrompt });
      if (!chatModeIsAgent) tempMessagesGPT.push({ role: "user", content: baseQAPrompt });
      // STEP 1- add all massages containing the draw command
      messages.forEach((m) => {
        if (typeof m.message === "string" && m.message.slice(1, 9) === "drawflow") {
          tempMessagesGPT.push({ role: "user", content: m.message }); // the first message that user has inputted. It is the one that contains the draw command
        }
        // STEP 2- add other messages that user has inputted
        if (typeof m.message === "string" && m.sender === "User" && m.message.slice(1, 9) !== "drawflow") {
          tempMessagesGPT.push({ role: "user", content: m.message });
        }
        // STEP 3- add messages from assistant
        if (m.sender === "GPT") {
          tempMessagesGPT.push({ role: "assistant", content: m.message });
        }
      }); // message from the Flow canvas about financial summaries
      // STEP 4- add financial summaries generated from the canvas
      tempMessagesGPT.push({
        role: "user",
        content: message,
        // + `\n` +
        // "Also feel free to use the following financial summary data:" +
        // `\n` +
        // calculateFinancialSummaries(flowData, futureState).toString(),
      });
      // STEP 5- add the new message from the user
      // tempMessagesGPT.push({ role: "user", content: message }); // the new message from the user
      // STEP 6- send the message to ChatGPT
      const res = await sendChatRequest(tempMessagesGPT, chatModeIsAgent);
      tempMessagesGPT.push({ role: "assistant", content: res });
      console.log("GPT messages:", tempMessagesGPT);
      // updating message states
      setMessagesGPT(tempMessagesGPT);
      setMessages((prev) => [
        ...prev,
        {
          message: res,
          sender: "GPT",
          dataPlot: undefined,
        },
      ]);
      // check if message contains a CALL command to draw canvas or get financial data
      const toolOutput = await toolProcedures(res, flowData);
      console.log("toolOutput: ", toolOutput);

      // CASE 1: when tool call was get_financial_data and string does not contain {"model":
      if (toolOutput !== "" && !toolOutput.includes('{"model":')) {
        tempMessagesGPT.push({ role: "user", content: toolOutput });
        setMessages((prev) => [
          ...prev,
          {
            message: toolOutput,
            sender: "User",
            dataPlot: undefined,
          },
        ]);
        const resTools = await sendChatRequest(tempMessagesGPT, chatModeIsAgent);
        tempMessagesGPT.push({ role: "assistant", content: resTools });
        console.log("GPT messages:", tempMessagesGPT);
        // updating message states
        setMessages((prev) => [
          ...prev,
          {
            message: resTools,
            sender: "GPT",
            dataPlot: undefined,
          },
        ]);
      }

      // CASE 2: when tool call was build_financial_model and output contains {"model":
      if (toolOutput !== "" && toolOutput.includes('{"model":')) {
        //save canvas with title and current date before replacing it with the new model
        await shareThisCanvas("Automatic Save, " + new Date().toLocaleDateString());
        setMessages((prev) => [
          ...prev,
          {
            message:
              "I saved the canvas so you can access it later. Now I am updating it with the new model.",
            sender: "canvas",
            dataPlot: undefined,
          },
        ]);
        const extractedEntities = JSON5.parse(toolOutput).model;
        const extractedFlowData = buildFlowData(JSON5.parse(extractedEntities));
        //@ts-ignore
        setFlowData(extractedFlowData);
        //@ts-ignore
        redrawCanvas(extractedFlowData);
        setUpdateFlag("chatBox");
        setMessages((prev) => [
          ...prev,
          {
            message:
              "OK, model is redrawn with the financial information provided. Do you agree with this model for your future scenario?",
            sender: "GPT",
            dataPlot: undefined,
          },
        ]);
      }
    }
    setLoading(false);
  };

  // REGION START Axilary function for drawing a canvas from a message with named entity recognition
  // TODO => Enable user to add single elements to the canvas rather than using buildFlowData function.
  // Axilary functions for updating the futureState of the World
  function underscoreToCamel(variableName: string): string {
    return variableName.replace(/_([a-z])/g, (_match, letter) => {
      return letter.toUpperCase();
    });
  }

  const future = async (message: string) => {
    setLoading(true);
    const res = (await sendFutureRequest(message)) as TimeSeriesType;
    console.log("Future Time Series exctacted: ", res);
    const futureStateCopy = JSON.parse(JSON.stringify(futureState));
    if (res.topic === "inflation" || res.topic === "interest_rate" || res.topic === "stock_growth") {
      futureStateCopy[underscoreToCamel(res.topic)] = res.array.map((el) => Number(el[res.topic]) / 100);
    }
    if (res.topic === "income_growth") {
      futureStateCopy[underscoreToCamel(res.topic)] = res.array.map((el, index) => {
        if (el[res.topic] === "inflation_rate") {
          // if user mentioned that their income match inflation.
          return futureStateCopy.inflation[index];
        } else if (!isNaN(Number(el[res.topic]))) {
          return Number(el[res.topic]) / 100;
        } else {
          return 0;
        }
      });
    }
    if (res.topic === "property_growth") {
      futureStateCopy.propertyGrowth.propertyGrowth = res.array.map((el) => Number(el[res.topic]) / 100);
    }
    dataPlot = res.array.map((el) => {
      return { date: el.date, value: el[res.topic] };
    });
    setFutureState(futureStateCopy);
    setMessages((prev) => [
      ...prev,
      {
        message: "OK, I have updated the " + res.topic + " parameter for the future. Here is how it looks: ",
        sender: "Canvas",
        dataPlot: dataPlot,
      },
    ]);
    setLoading(false);
  };

  const current = (message: string) => {
    setLoading(true);
    // dataPlot = futureState[underscoreToCamel(res.topic)].map((el) => {
    //   return { date: el.date, value: el[res.topic] };
    // });
    const futureStateCopy = JSON.parse(JSON.stringify(futureState));
    let dataPlot: TimeSeriesItem[] = [];
    let nameStr: string = "";
    if (message.includes("inflation")) {
      dataPlot = futureStateCopy.inflation.map((el: number, index: string | number) => {
        return { date: futureStateCopy.date[index], value: String(el * 100) };
        nameStr = "inflation";
      });
    } else if (message.includes("stock")) {
      dataPlot = futureState.stockGrowth.map((el, index) => {
        return { date: futureState.date[index], value: String(el * 100) };
        nameStr = "stock growth";
      });
    } else if (message.includes("interest")) {
      dataPlot = futureState.interestRate.map((el, index) => {
        return { date: futureState.date[index], value: String(el * 100) };
        nameStr = "interest";
      });
    } else if (message.includes("income")) {
      dataPlot = futureState.incomeGrowth.map((el, index) => {
        return { date: futureState.date[index], value: String(el * 100) };
        nameStr = "income growth";
      });
    } else if (
      message.includes("property") ||
      message.includes("housing") ||
      message.includes("real estate")
    ) {
      dataPlot = futureState.propertyGrowth[0].propertyGrowth.map((el, index) => {
        return { date: futureState.date[index], value: String(el * 100) };
        nameStr = "housing market growth";
      });
    }

    if (dataPlot) {
      setMessages((prev) => [
        ...prev,
        {
          message: "The current " + nameStr + " rate is :",
          sender: "Canvas",
          dataPlot: dataPlot,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          message:
            "I could not find the current value for the parameter requested. Please mention any of inflation, stock market, interest rate, income growth or housing market growth.",
          sender: "Canvas",
          dataPlot: undefined,
        },
      ]);
    }
    setLoading(false);
  };

  // Axilary functions for sharing the canvas
  const shareThisCanvas = async (message: string) => {
    if (!configs.enableFirebase) {
      setMessages((prev) => [...prev, { message: "Cloud save is disabled.", sender: "Canvas" }]);
      return;
    }
    setLoading(true);
    const canvasName = message.split(",")[0].slice(6);
    const description = message.split(",")[1]?.slice(1);
    let uuid1: string | null = null;
    let uuid2: string | null = null;

    uuid1 = await sharingFunctions.saveVariableToFirebase(flowData, messages);
    if (user) {
      uuid2 = await handleSaveToFireStore(excApi, user, flowData, messages, canvasName, description);
    }
    if (uuid1) {
      setMessages((prev) => [
        ...prev,
        {
          message:
            "You can share this canvas using this link: \n [https://app.planwithflow.com/" +
            uuid1 +
            "](https://app.planwithflow.com/" +
            uuid1 +
            ")",
          sender: "Canvas",
          dataPlot: undefined,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          message: "Sorry, I could generate sharable link. Please try again later.",
          sender: "Canvas",
          dataPlot: undefined,
        },
      ]);
    }
    setLoading(false);
  };

  const loadCanvasfromFirebase = async (uuid: string) => {
    if (!configs.enableFirebase) {
      setMessages((prev) => [...prev, { message: "Cloud load is disabled.", sender: "Canvas" }]);
      return;
    }
    const flowDataFromFirebase = await sharingFunctions.loadVariableFromFirebase(uuid);
    console.log("flowData in AssistBox: ", flowDataFromFirebase);
    //@ts-ignore
    setFlowData(flowDataFromFirebase);
    console.log("start of redraw");
    //@ts-ignore
    redrawCanvas(flowDataFromFirebase);
    console.log("done", flowDataFromFirebase);

    setUpdateFlag("loadFromFirebase");
  };

  // function to set the chat mode between Agent and QA
  const toggleChatMode = () => {
    setChatModeIsAgent((prevChatMode) => !prevChatMode);
  };

  function handleEnterPress() {
    if (message.trim() !== "") {
      setShowGPTMenu(false);
      // @ts-ignore
      inputRef.current?.focus();
      setMessages((prev) => [
        ...prev,
        {
          message: message,
          sender: "User",
        },
      ]);
      sendMessageAndUpdateState(message);
      setMessage("");
    }
  }

  // REGION START, useEffect procedures
  // to get the selected element and update its financial data
  useEffect(() => {
    if (appState && getTargetElements(currentYearData?.elements, appState).length !== 0) {
      setSelectedElement(getTargetElements(currentYearData?.elements, appState)[0]);
      currentYearData.metaData.finData?.forEach((el) => {
        if (el.id === selectedElement?.id) {
          setSelectedElementFinData(el);
        }
      });
    }
  });
  // capture financial data for the selected canvas element and its financial data
  useEffect(() => {
    if (selectedElementFinData) {
      const elsValue = flowData.map((fl) => {
        return fl?.metaData?.finData?.find((el) => el.type !== "none" && el.id === selectedElementFinData.id)
          ?.data.value;
      });
      const date = flowData
        .map((el) => {
          return el.metaData.year + "-" + el.metaData.month;
        })
        .flat();
      if (elsValue) {
        const data = [];
        for (let i = 0; i < elsValue.length; i++) {
          //@ts-ignore
          data.push({ date: date[i], value: Math.floor(elsValue[i]) });
        }
        setSelectedTroughTime(data);
      }
    }
  }, [flowData, selectedElementFinData]);

  // update the messages array when the selectedTroughTime changes
  useEffect(() => {
    //@ts-ignore
    setMessages((prev) => {
      //@ts-ignore
      return updateMessages(prev, selectedTroughTime);
    });
  }, [selectedTroughTime]);

  // REGION END, useEffect procedures

  // REGION START, GPT MENU Logic
  const [selectedKey, setSelectedKey] = useState("");
  const [showGPTMenu, setShowGPTMenu] = useState(false);
  const inputRef = useRef(null);

  const gptMenuRef = useRef(null);
  const handleInputCommand = (input?: string) => {
    if (input === "") {
      setShowGPTMenu(false);
      setSelectedKey("");
    }

    if (input) {
      if (input.length === 1 && input === "/") {
        console.log(gptMenuRef.current);
        setShowGPTMenu(true);
        // @ts-ignore
        //gptMenuRef.current?.focus();
      }
      if (input.includes(" ")) {
        setShowGPTMenu(false);
        setSelectedKey("");
      }
    }
  };
  const [gptMenuItems, setGptMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const newGptMenuItems = [
      {
        label: (
          <div className="flex items-center gap-2 mt-2">
            <CloseOutlined />
            <div className="text-sm mt-1">Close Menu</div>
          </div>
        ),
        key: "close",
      },
      {
        label: (
          <div className="flex flex-col">
            <div className="text-sm">Future</div>
            <div
              className="font-light text-gray-500"
              style={{
                fontSize: "10px",
                lineHeight: "10px",
              }}
            >
              Set the future inflation, income growth, real estate and stock markets returns.
            </div>
          </div>
        ),
        key: "future",
      },
      {
        label: (
          <div className="flex flex-col">
            <div className="text-sm">Current</div>
            <div
              className="font-light text-gray-500"
              style={{
                fontSize: "10px",
                lineHeight: "10px",
              }}
            >
              Get the current value of inflation, income growth, real estate and stock markets returns.
            </div>
          </div>
        ),
        key: "get current",
      },
      {
        label: (
          <div className="flex flex-col">
            <div className="text-sm mt-2">Draw flow</div>
            <div
              className="font-light text-gray-500"
              style={{
                fontSize: "10px",
                lineHeight: "10px",
              }}
            >
              Draw canvas based on your financial story.
            </div>
          </div>
        ),
        key: "drawflow ",
      },
      {
        label: (
          <div className="flex flex-col">
            <div className="text-sm mt-2">Save Canvas</div>
            <div
              className="font-light text-gray-500"
              style={{
                fontSize: "10px",
                lineHeight: "10px",
              }}
            >
              Store and create a link to share canvas.
            </div>
          </div>
        ),
        key: "save <canvas name>, <description>",
      },
      {
        label: (
          <div className="flex flex-col">
            <div className="text-sm mt-2">Show My Canvases</div>
            <div
              className="font-light text-gray-500"
              style={{
                fontSize: "10px",
                lineHeight: "10px",
              }}
            >
              show all your canvases
            </div>
          </div>
        ),
        key: "my-canvases",
      },
      {
        label: (
          <div className="flex flex-col">
            <div className="text-sm mt-2"> {user === null ? "Sign in" : "Sign out"}</div>
            <div
              className="font-light text-gray-500"
              style={{
                fontSize: "10px",
                lineHeight: "10px",
              }}
            >
              {user === null ? "Sign in with a Google account." : "Sign out from your Google account."}
            </div>
          </div>
        ),
        key: user === null ? "signin" : "signout",
      },
    ];
    setGptMenuItems(newGptMenuItems);
  }, [user]);
  // REGION END, GPT MENU Logic

  const [showMobileMenu, setShowMobileMenu] = useRecoilState(showMenuState);
  const [scaleState, setScaleState] = useState({
    height: 700,
    width: 500,
  });

  const [minified, setMinified] = useState(false);
  // REGION START, JSX for Mobile
  return isMobile ? (
    <Card
      title={
        <div className="flex items-center justify-between flex">
          <span className="mt-3">Plan with Flow GPT</span>
          <Space direction="horizontal">
            <div className="text-regular mt-2"> Chat Mode:</div>
            <Switch
              checkedChildren="Agent"
              unCheckedChildren="QA"
              defaultChecked
              onChange={toggleChatMode}
              style={{ marginTop: "6px" }}
            />
            <Button
              onClick={() => {
                setMinified(!minified);
              }}
              type="text"
              className="flex items-center"
            >
              <MinusOutlined />
            </Button>
          </Space>
        </div>
      }
      className="flex-col justify-start flex lg:right-2 bottom-0"
      style={{
        transition: "all 0.3s ease-in-out",
        minWidth: minified ? (isMobile ? "100vw" : "220px") : isMobile ? "100vw" : "30vw",
        height: minified ? "64px" : isMobile ? "calc(50vh)" : "calc(100vh - 128px)",
        position: "fixed",
        zIndex: 10,
      }}
      bodyStyle={{
        padding: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: isMobile ? "calc(50vh - 52px)" : scaleState.height - 64,
        }}
        className={`${"flex flex-col justify-end relative"}`}
      >
        <div className="overflow-y-auto customized-scrollbar">
          {messages.map((el, i) => {
            return (
              <MessageBox
                key={i}
                message={el.message}
                isSender={el.sender === "User"}
                chartData={el.dataPlot}
              />
            );
          })}
        </div>
        {loading && <Spin> </Spin>}
        <div
          className="absolute z-10 bottom-8 shadow-2xl shadow-slate-700 min-w-[128px] rounded-2xl"
          style={{
            opacity: showGPTMenu ? 1 : 0,
            zIndex: showGPTMenu ? 100 : -1,
          }}
        >
          <Menu
            ref={gptMenuRef}
            className="rounded-2xl"
            items={gptMenuItems}
            selectedKeys={[selectedKey]}
            onSelect={(selectedObject) => {
              setShowGPTMenu(false);
              // @ts-ignore
              inputRef.current?.focus();
              setMessage((prev) => prev + selectedObject.key);
              setSelectedKey(selectedObject.key);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowGPTMenu(false);
                // @ts-ignore
                inputRef.current?.focus();
              }

              if (e.key === "Enter") {
                setShowGPTMenu(false);
                // @ts-ignore
                inputRef.current?.focus();
              }
            }}
          />
        </div>
        <Input
          className="mt-0"
          ref={inputRef}
          autoComplete="off"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleInputCommand(e.target.value);
          }}
          prefix={
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={() => {
                setMessage("/");
                setShowGPTMenu(true);
              }}
              //style={{ backgroundColor: "#DE5651", borderColor: "#DE5651" }}
            />
          }
          addonAfter={
            <div
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
              }}
            >
              Tools
            </div>
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnterPress();
            }
          }}
          suffix={
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleEnterPress}
              disabled={message.trim() === ""}
              //style={{ backgroundColor: "#DE5651", borderColor: "#DE5651" }}
            />
          }
        />
      </div>
    </Card>
  ) : (
    // REGION JSX for Desktop
    <Resizable
      height={scaleState.height}
      width={scaleState.width}
      onResize={(event, { node, size, handle }) => {
        setScaleState({ width: size.width, height: size.height });
      }}
      resizeHandles={["w", "n", "nw"]}
    >
      <Card
        title={
          <div className="flex items-center justify-between flex">
            <span className="mt-2">Plan with Flow GPT</span>
            <Space direction="horizontal">
              <div className="text-regular mt-2"> Chat Mode:</div>
              <Switch
                checkedChildren="Agent"
                unCheckedChildren="QA"
                defaultChecked
                onChange={toggleChatMode}
                style={{ marginTop: "6px" }}
              />
              <Button
                onClick={() => {
                  setMinified(!minified);
                }}
                type="text"
                className="flex items-center"
              >
                <MinusOutlined />
              </Button>
            </Space>
          </div>
        }
        className="flex-col justify-start flex lg:bottom-[20px] lg:right-2 bottom-0"
        style={{
          // transition: "all 0.1s ease-in-out",
          width: scaleState.width + "px",
          height: scaleState.height + "px",
          // minWidth: minified
          position: "fixed",
          zIndex: 10,
        }}
        bodyStyle={{
          padding: "0px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: isMobile ? "calc(50vh - 52px)" : scaleState.height - 58,
          }}
          className={`${"flex flex-col justify-end relative"}`}
        >
          <div className="overflow-y-auto customized-scrollbar">
            {messages.map((el, i) => {
              return (
                <MessageBox
                  key={i}
                  message={el.message}
                  isSender={el.sender === "User"}
                  chartData={el.dataPlot}
                />
              );
            })}
          </div>
          {loading && <Spin> </Spin>}
          <div
            className="absolute z-10 bottom-8 shadow-2xl shadow-slate-700 min-w-[128px] rounded-2xl"
            style={{
              opacity: showGPTMenu ? 1 : 0,
              zIndex: showGPTMenu ? 100 : -1,
            }}
          >
            <Menu
              ref={gptMenuRef}
              className="rounded-2xl"
              items={gptMenuItems}
              selectedKeys={[selectedKey]}
              onSelect={(selectedObject) => {
                setShowGPTMenu(false);

                if (selectedObject.key !== "close") {
                  // @ts-ignore
                  inputRef.current?.focus();
                  setMessage((prev) => prev + selectedObject.key);
                  setSelectedKey(selectedObject.key);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowGPTMenu(false);
                  // @ts-ignore
                  inputRef.current?.focus();
                }

                if (e.key === "Enter") {
                  setShowGPTMenu(false);
                  // @ts-ignore
                  inputRef.current?.focus();
                }
              }}
            />
          </div>
          <Input
            className="mt-0 bottom-0"
            ref={inputRef}
            placeholder="Enter you message or press / for command menu"
            autoComplete="off"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleInputCommand(e.target.value);
            }}
            prefix={
              <Button
                type="primary"
                icon={<MenuOutlined />}
                onClick={() => {
                  setMessage("/");
                  setShowGPTMenu(true);
                }}
                //style={{ backgroundColor: "#DE5651", borderColor: "#DE5651" }}
              />
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleEnterPress();
              }
            }}
            suffix={
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleEnterPress}
                disabled={message.trim() === ""}
                //style={{ backgroundColor: "#DE5651", borderColor: "#DE5651" }}
              />
            }
          />
        </div>
      </Card>
    </Resizable>
  );
};

export default AssistBox;
