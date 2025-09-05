import axios from "axios";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button, Input, Modal } from "antd";
import { flowData } from "@/types/flowData.type";
import { flowDataState } from "@/store/flowData.store";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

type props = {
  excApi?: ExcalidrawImperativeAPI;
  redrawCanvas: (flowData: flowData) => void;
};
const URLModal = ({ redrawCanvas }: props) => {
  const setFlowData = useSetRecoilState(flowDataState);
  const [inputURL, setInputURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  //@ts-ignore
  const handleChange = (event) => {
    setInputURL(event.target.value);
  };

  const handleOk = () => {
    axios.get(inputURL).then((data) => {
      setFlowData(data.data);
      redrawCanvas(data.data);
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="dashed"
        onClick={showModal}
        className="lg:block hidden"
        // style={{
        //   opacity: 0,
        //   zIndex: -1,
        // }}
      >
        Open from URL
      </Button>
      <Modal
        title="Open from URL"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p> Hey there, Wanna open your chart from an url? </p>
        <Input
          placeholder="put your link here..."
          value={inputURL}
          onChange={handleChange}
        />
      </Modal>
    </>
  );
};

export default URLModal;
