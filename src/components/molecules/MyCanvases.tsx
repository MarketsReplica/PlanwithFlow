import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { flowData } from "@/types/flowData.type";

import { flowDataState } from "@/store/flowData.store";
import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Card, Input, Modal, Space, Alert, Spin } from "antd";
import { updateFlagAtom, updateModalOpen } from "@/store/updateFlag.store";

import { fireStoreCanvasDataState } from "@/store/fireStoreData.store";
import { authenticatedUserID } from "@/store/fireStoreData.store";

import { fetchUserData, fetchFlowDataFromFirestore } from "@/helper/sharing.helper";
import { useParams } from "react-router-dom";

import { isMobile } from "react-device-detect";

type props = {
  redrawCanvas: (flowData: flowData) => void;
};

const MyCanvases = ({ redrawCanvas }: props) => {
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const [openModal, setOpenModal] = useRecoilState(updateModalOpen);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [userData, setUserData] = useRecoilState(fireStoreCanvasDataState);
  const [userID, setUserID] = useRecoilState(authenticatedUserID);

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
    const flowDataFromFirestore = await fetchFlowDataFromFirestore(key);
    if (flowDataFromFirestore) {
      setFlowData(flowDataFromFirestore);
      redrawCanvas(flowDataFromFirestore);
    }
    setIsWelcomeModalOpen(false);
    setOpenModal("none");
  };

  const { url: paramUrl } = useParams();

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleCancel = async () => {
    setIsWelcomeModalOpen(false);
    setOpenModal("none");
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

  return (
    <>
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
        <div className="lg:hidden block h-full overflow-y-auto mt-4">
          <div className="font-normal text-base mt-7">You have saved the following Flow canvases:</div>
          <div className="flex items-center gap-[20px] flex-wrap mt-7 z-100">
            {userData.map((data) => (
              <Card
                key={data.id}
                className="w-full hover:shadow hover:cursor-pointer transition-all z-100"
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
        </div>

        <div className="overflow-y-scroll lg:h-[99%] h-auto lg:block hidden">
          <div className="font-normal text-base mt-7">You have saved the following Flow canvases:</div>
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
        </div>

        {showAlert && (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Alert
              message="Error"
              description="Could not load your canvas data."
              type="error"
              closable
              onClose={() => setShowAlert(false)}
              style={{ zIndex: 1000, position: "relative" }}
            />
          </Space>
        )}
      </Modal>
    </>
  );
};

export default MyCanvases;
