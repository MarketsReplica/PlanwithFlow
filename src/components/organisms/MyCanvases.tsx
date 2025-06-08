import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { flowDataState } from "@/store/flowData.store";
import { updateModalOpen } from "@/store/updateFlag.store";
import { authenticatedUserID, fireStoreCanvasDataState } from "@/store/fireStoreData.store";
import { fetchUserData, fetchFlowDataFromFirestore } from "@/helper/sharing.helper";
import { useParams } from "react-router-dom";
import { flowData } from "@/types/flowData.type";
import { messageState } from "./AssistBox";

type Props = {
  redrawCanvas: (flowData: flowData) => void;
};

export default function MyCanvases(props: Props) {
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const [openModal, setOpenModal] = useRecoilState(updateModalOpen);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [userData, setUserData] = useRecoilState(fireStoreCanvasDataState);
  const [userID, setUserID] = useRecoilState(authenticatedUserID);
  const [messages, setMessages] = useRecoilState(messageState);

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        const data = await fetchUserData(userID);
        setUserData(data);
      } else {
        setUserData([]);
      }
    };

    fetchData();
    console.log("userData", userData);
  }, [userID, isWelcomeModalOpen]);
  console.log("userData2", userData);

  const showModal = () => {
    setIsWelcomeModalOpen(true);
  };
  //  use useeffect to change iswelcomeModalOpen when isOpen changes
  useEffect(() => {
    if (openModal === "MyCanvasesModal") showModal();
  }, [openModal]);

  const handleCardClick = async (key: any) => {
    const data = await fetchFlowDataFromFirestore(key);
    const flowDataFromFirestore = data.flowData;
    const messagesFromFirestore = data.messages;
    if (flowDataFromFirestore) {
      setFlowData(flowDataFromFirestore);
      props.redrawCanvas(flowDataFromFirestore);
    }
    if (messagesFromFirestore) {
      setMessages(messagesFromFirestore);
    }
    setIsWelcomeModalOpen(false);
    setOpenModal("none");
  };

  const { url: paramUrl } = useParams();

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Clear the timer when the component is unmounted or when showAlert is updated
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      You have saved the following Flow canvases:
      <div className="flex items-center gap-[20px] flex-wrap mt-7">
        {userData.map((data) => (
          <Card
            key={data.id}
            className="min-w-[256px] hover:shadow hover:cursor-pointer transition-all"
            // cover={<img height={143} width={215} src={data.image} />}
            onClick={() => handleCardClick(data.id)}
          >
            <Card.Meta
              title={data.name}
              description={data.description}
              style={{ padding: "3px" }}
            ></Card.Meta>
            {<img height={143} width={215} src={data.imageURL} />}
          </Card>
        ))}
      </div>
    </>
  );
}
