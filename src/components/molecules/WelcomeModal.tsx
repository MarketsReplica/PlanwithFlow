import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import buildFlowData from "./templateFlowData";
import { flowData } from "@/types/flowData.type";
import { SendOutlined } from "@ant-design/icons";
import { sendEntityRequest } from "./supportFunctions";
import { flowDataState } from "@/store/flowData.store";
import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Card, Input, Modal, Space, Alert, Spin } from "antd";
import { updateFlagAtom, updateModalOpen } from "@/store/updateFlag.store";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import styled from "styled-components";
import { useParams } from "react-router-dom";

// REGION start, image imports.
import canvasImage from "@/assets/images/canvas.png";
import agentButton from "@/assets/images/agentButton.png";
import buyingCar from "@/assets/images/buyingCar.png";
import singleBudget from "@/assets/images/singleBudget.png";
import familyBudget from "@/assets/images/familyBudget.png";
import planningLoan from "@/assets/images/planningLoan.png";

import sharingFunctions from "@/services/sharingFunctions";
import { isMobile } from "react-device-detect";

import { messageState } from "../organisms/AssistBox";
import configs from "@/appConfig.js";

// REGION end, image imports.

const ChatInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94%;
`;

const styles: Record<string, CSSProperties> = {
  chatInput: {
    resize: "both",
    paddingRight: "25px",
  },
  sendMessageIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
  },
};

const urls = [
  {
    url: `${configs.templateServer}simple-cash-flow.fl`,
    image: singleBudget,
    title: "Simple Budget Flow",
    description: "Flow of money from income to expense",
  },
  {
    url: `${configs.templateServer}simple-cash-flow.fl`,
    image: familyBudget,
    title: "Simple Family Budget",
    description: "Flow of money from income to expense",
  },
  {
    url: `${configs.templateServer}simple-cash-flow.fl`,
    image: buyingCar,
    title: "Buying a Car",
    description: "What can you afford? Should you finance it? ",
  },
  {
    url: `${configs.templateServer}simple-cash-flow.fl`,
    image: planningLoan,
    title: "Planning a Loan",
    description: "How would getting a loan for a big expense change your finances?",
  },
];

type props = {
  excApi?: ExcalidrawImperativeAPI;
  redrawCanvas: (flowData: flowData) => void;
};

const WelcomeModal = ({ redrawCanvas }: props) => {
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const setUpdateFlag = useSetRecoilState(updateFlagAtom);
  const [openModal, setOpenModal] = useRecoilState(updateModalOpen);

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [messages, setMessages] = useRecoilState(messageState);

  const [showAlert, setShowAlert] = useState(false);

  const showModal = () => {
    setIsWelcomeModalOpen(true);
  };

  // useEffect(() => {
  //   handleCancel();
  // }, []);

  //  use useeffect to change iswelcomeModalOpen when isOpen changes
  useEffect(() => {
    if (openModal === "WelcomeModal") showModal();
  }, [openModal]);

  const { url: paramUrl } = useParams();

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleCancel = async () => {
    setIsWelcomeModalOpen(false);
    setOpenModal("none");

    await sleep(1000); // for the canvas to load
    if (paramUrl && configs.enableFirebase) {
      await loadCanvasfromFirebase(paramUrl);
    } else {
      // Fallback to local/template server
      await loadTemplateFromServer(`${configs.templateServer}welcome.fl`);
    }
  };

  const loadTemplateFromServer = async (url: string) => {
    try {
      const resp = await axios.get(url);
      const flow = resp.data;
      // @ts-ignore
      setFlowData(flow);
      // @ts-ignore
      redrawCanvas(flow);
      setUpdateFlag("loadFromTemplate");
    } catch (e) {
      setShowAlert(true);
    }
  };

  const loadCanvasfromFirebase = async (uuid: string) => {
    const dataFromFirebase = await sharingFunctions.loadVariableFromFirebase(uuid);
    const flowDataFromFirebase = dataFromFirebase.flowData;
    const messageFromFirebase = dataFromFirebase.messages;
    console.log("flowData in AssistBox: ", flowDataFromFirebase);
    if (flowDataFromFirebase) {
      //@ts-ignore
      setFlowData(flowDataFromFirebase);
      console.log("start of redraw");
      //@ts-ignore
      redrawCanvas(flowDataFromFirebase);
    }
    if (messageFromFirebase) {
      setMessages(messageFromFirebase);
    }
    console.log("done", flowDataFromFirebase);

    setUpdateFlag("loadFromFirebase");
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Clear the timer when the component is unmounted or when showAlert is updated
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const welcomeText = (
    <>
      <h1 style={{ fontSize: "1.5rem" }}>Welcome to Plan with Flow</h1>
      <p>
        This program combines a no-code interface for building financial models with ChatGPT. It gives
        language models much more powers to solve your financial questions.
      </p>
      <p>
        1 - To construct a financial model, describe your current income, expense, assets and liabilities. For
        example,
      </p>
      <blockquote>
        <i>
          We have two income sources of $4000 and $4500 per month after tax. We have an apartment worth $520K
          with mortgage of $380K with 4% interest rate. Our expenses are $5000 for living and $1000 for
          entertainment per month. We have $10K cash.
        </i>
      </blockquote>
      <p>2- Flow Canvas will build a model from this description.</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={canvasImage} width="90%" />
      </div>
      <p>&nbsp;</p>
      <p>
        3- Choose Agentic mode for step by step guide or a simple QA if you want to ask basic questions about
        your plan. Plan with Flow Agent can help with questions such as
        <br />
        &nbsp;
      </p>
      <blockquote>
        <i>
          We want to buy a vacation home that can also be rented on Airbnb, the home is valued at 350K. Can we
          buy it in the next 2 years?
        </i>
      </blockquote>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={agentButton} width="90%" />
      </div>
      <p>
        Then follow explanation of Flow GPT and answer any questions it may have about your problem.&nbsp;
      </p>
      <p>&nbsp;</p>
      <h2>About Plan with Flow:</h2>
      <p>
        How can we improve our lives and avoid costly financial mistakes? We believe society can benefit
        profoundly if everyonen can build and interact with financial models of finance and economy. To enable
        this vision we have launched Plan with Flow that combines OpenAI&#39;s language models (ChatGPT) with
        a detailed financial model. Obviously this combination is more powerful than ChatGPT alone and much
        easier to use than building your own model and analysis in Excel. Our goal is that you can interact
        with this AI software as if an expert human financial planner explains you financial topics on a
        whiteboard.&nbsp;
      </p>
      <p>
        Since we launched this service recently, I would love to have a chat with you and understand how this
        AI system can help you solve real life problems.{" "}
        <a href="https://www.youtube.com/watch?v=PTSHCDSJqro" target="_blank">
          Click here to learn more.
        </a>
      </p>
      <p>
        Join our{" "}
        <a href="https://www.reddit.com/r/PlanwithFlow/" target="_blank">
          Reddit
        </a>{" "}
        or{" "}
        <a href="https://discord.gg/hPhGWPeM6r" target="_blank">
          Discord
        </a>{" "}
        to ask questions, see our public project roadmap and give your valuable suggestions.&nbsp;
      </p>
    </>
  );
  return (
    <>
      <Button type="dashed" onClick={showModal} className="hidden">
        Open from URL
      </Button>
      <Modal
        open={isWelcomeModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="lg:min-w-[817px] lg:h-[650px]"
        bodyStyle={{
          padding: isMobile ? "0" : "28px",
          height: "70vh",
        }}
      >
        {/*
          REGION => Mobile content
        */}
        <div className="lg:hidden block h-full overflow-y-auto mt-4">{welcomeText}</div>
        <div className="overflow-y-scroll lg:h-[99%] h-auto lg:block hidden">{welcomeText}</div>
      </Modal>
    </>
  );
};

export default WelcomeModal;
