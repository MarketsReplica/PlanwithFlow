import URLModal from "../molecules/URLModal";
import { saveAs } from "file-saver";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Button, Dropdown, Input, Upload } from "antd";
import { flowData } from "@/types/flowData.type";
import { flowDataState } from "@/store/flowData.store";
import { updateElementsTexts } from "../molecules/updateElementsTexts";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { MoreOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { showExcMenuProperties } from "@/store/menu.store";
import configs from "@/appConfig.js";

type props = {
  excApi?: ExcalidrawImperativeAPI;
  redrawCanvas: (flowData: flowData) => void;
  showFutureModal: () => void;
  showWelcomeModal: () => void;
  showMyCanvasesModal: () => void;
};

const BottomToolbarContainerMobile = styled.div`
  background-color: #fff;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
`;

const AppToolbar = ({
  redrawCanvas,
  showFutureModal,
  showWelcomeModal,
  showMyCanvasesModal,
}: props) => {
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    if (!jsonData) return;
    setFlowData(jsonData);
    redrawCanvas(jsonData);
  }, [jsonData, redrawCanvas, setFlowData]);

  const handleFileUpload = (event: any) => {
    const file = event.file.originFileObj;
    const reader = new FileReader();
    reader.onload = (event) => {
      // @ts-ignore
      const content = event.target.result;
      // @ts-ignore
      setJsonData(JSON.parse(content));
    };

    // @ts-ignore
    reader.readAsText(file);
  };

  const handleAddLables = () => {
    const flowWithLables = updateElementsTexts(flowData);
    setJsonData(flowWithLables);
    redrawCanvas(flowWithLables);
  };

  const [showExcMenu, setShowExcMenu] = useRecoilState(showExcMenuProperties);

  const save = () => {
    const blob = new Blob([JSON.stringify(flowData)], {
      type: "application/json",
    });
    saveAs(blob, "data.fl");
  };

  const dropDownMenuItems: any[] = [
    {
      key: "1",
      label: (
        <Button type="text" onClick={showWelcomeModal}>
          Use a Template
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Button type="text" onClick={save}>
          Save File
        </Button>
      ),
    },
    {
      key: "4",
      label: (
        <Upload showUploadList={false} accept=".fl" onChange={handleFileUpload}>
          <Button type="text">Load File</Button>
        </Upload>
      ),
    },
    {
      key: "5",
      label: (
        <Button type="text" onClick={handleAddLables}>
          Add Lables
        </Button>
      ),
    },
    // {
    //   key: "5",
    //   label: (
    //     <Button type="text" onClick={showFutureModal}>
    //       Future World State
    //     </Button>
    //   ),
    // },
    {
      key: "showExcMenuProperties",
      label: (
        <Button type="text" onClick={() => setShowExcMenu(!showExcMenu)}>
          Show Properties
        </Button>
      ),
    },
    { key: "6", label: <URLModal redrawCanvas={redrawCanvas} /> },
  ];

  if (configs.enableFirebase) {
    dropDownMenuItems.splice(1, 0, {
      key: "2",
      label: (
        <Button type="text" onClick={showMyCanvasesModal}>
          My Canvases
        </Button>
      ),
    });
  }

  return (
    <>
      {/* <BottomToolbarContainerMobile className="fixed bottom-0 left-0 w-full h-12 z-10 block lg:hidden"> */}
      {/* <div className="flex justify-between items-center h-full"> */}
      {/* <Dropdown
            menu={{
              items: dropDownMenuItems,
            }}
            trigger={["click"]}
          >
            <Button type="link">
              <MoreOutlined />
            </Button>
          </Dropdown> */}

      {/* <Input className="mx-2" />
        </div>
      </BottomToolbarContainerMobile> */}

      <Dropdown
        menu={{
          items: dropDownMenuItems,
        }}
      >
        <Button
          type="dashed"
          size="middle"
          className="z-10 fixed bottom-4 -translate-x-1/2 hidden lg:block"
          style={{
            height: "36px",
            left: "calc(50% - 150px)",
          }}
        >
          Menu
        </Button>
      </Dropdown>
    </>
  );
};

export default AppToolbar;
