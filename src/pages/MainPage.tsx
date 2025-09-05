import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import "./MainPage.css";
import TimeTraveller from "@/components/molecules/TimeTraveller";
import { useRecoilState } from "recoil";
import { flowDataState, getCurrentYearData, updateSpecElementInTheScene } from "@/store/flowData.store";
import { cloneObject } from "@/helper/object.helper";
import _ from "lodash";
import { AppState, ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import Sidebar from "@/components/molecules/Sidebar";
import { excalidrawAppState, updateAppState } from "@/store/appState.store";

import FinCalculations from "@/services/FinCalculations";
import Menu from "@/components/organisms/Menu";
import { updateFlagAtom, updateModalOpen } from "@/store/updateFlag.store";
import StatsBar from "@/components/molecules/StatsBar";
import AssistBox from "@/components/organisms/AssistBox";

import AppToolbar from "@/components/organisms/AppToolbar";
import WelcomeModal from "@/components/molecules/WelcomeModal";
import LogoBar from "@/components/molecules/LogoBar";
import { hotjar } from "react-hotjar";
import configs from "@/appConfig.js";
import MyCanvases from "@/components/molecules/MyCanvases";

import { isSidebarCollapsed, showExcMenuProperties } from "@/store/menu.store";
import { useParams, useSearchParams } from "react-router-dom";

const MainPage = () => {
  if (configs.enableAnalytics) {
    hotjar.initialize(3373795, 6);
    if (hotjar.initialized()) {
      hotjar.event("app-loaded");
    }
  }

  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const [excApi, setExcApi] = useState<ExcalidrawImperativeAPI>();
  const [appState, setAppState] = useRecoilState(excalidrawAppState);
  const [openModal, setOpenModal] = useRecoilState(updateModalOpen);
  // const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [flag, setFlag] = useRecoilState(updateFlagAtom);
  let isReadFromServer = false;

  const handleShowFutureModal = () => {
    setOpenModal("FutureModal");
  };

  const handleShowWelcomeModal = () => {
    setOpenModal("WelcomeModal");
  };
  const handleShowMyCanvasesModal = () => {
    setOpenModal("MyCanvasesModal");
  };

  const handleDateChanged = (els: ExcalidrawElement[]) => {
    // if (!_.isEqual(getCurrentYearData(flowData).elements, els)) {
    // console.debug("Slider updating excalidraw ...");
    excApi?.updateScene({
      elements: cloneObject(els),
    });
    // }
  };

  const handleExcalidrawChange = (elements: readonly ExcalidrawElement[], state: AppState) => {
    // determine what has changed in the elements array
    const diff = [];
    const flowDataElements = getCurrentYearData(flowData).elements;
    const flowDataElementsIDs = flowDataElements.map((el) => el.id);
    for (let i = 0; i < elements.length; i++) {
      if (flowDataElementsIDs.includes(elements[i].id)) {
        //element already exists in the flowData, lets see if it is the same:
        if (
          !_.isEqual(
            elements[i],
            flowDataElements.find((el) => el.id === elements[i].id)
          )
        ) {
          diff.push(elements[i]);
        }
      } else {
        //element does not exist in the flowData, lets add it:
        diff.push(elements[i]);
      }
    }
    updateAppState(state, appState, setAppState);
    //@ts-ignore
    if (diff.length > 0) {
      // console.debug("Excalidraw diff:", diff);
      updateSpecElementInTheScene(cloneObject(elements), cloneObject(diff), state, flowData, setFlowData);
      // remove deleted elements from canvas
      const cleanElements = elements.filter((el) => el.isDeleted === false);
      if (cleanElements.length !== elements.length) excApi?.updateScene({ elements: cleanElements });
      // console.debug("handleExcalidrawChange");
    }
  };

  // Remove automatic authentication triggers - let the app work without forced auth
  // Users can manually sign in if they want to save/load canvases

  const [showExcMenu, setShowExcMenu] = useRecoilState(showExcMenuProperties);
  const [isSidebarCollapsedState, setIsSidebarCollapsed] = useRecoilState(isSidebarCollapsed);

  return (
    <>
      <LogoBar />
      <AppToolbar
        redrawCanvas={(data) => {
          if (!_.isEqual(getCurrentYearData(flowData).elements, data[0].elements)) {
            excApi?.updateScene({
              elements: cloneObject(data[0].elements),
            });
            isReadFromServer = true;
          }
        }}
        showFutureModal={handleShowFutureModal}
        showWelcomeModal={handleShowWelcomeModal}
        showMyCanvasesModal={handleShowMyCanvasesModal}
      />

      <AssistBox
        redrawCanvas={(data) => {
          if (!_.isEqual(getCurrentYearData(flowData).elements, data[0].elements)) {
            excApi?.updateScene({
              elements: cloneObject(data[0].elements),
            });
            excApi?.scrollToContent(data[0].elements);
            isReadFromServer = true;
          }
        }}
        excApi={excApi}
      />
      <StatsBar />
      <FinCalculations />
      <Menu />
      <Sidebar
        // appState={excApi?.getAppState()}
        selectedToolChanged={(toolType, elementType) => {
          excApi?.setActiveTool({
            type: toolType,
          });
          setFlag("selectedToolChanged");
        }}
      />
      <TimeTraveller
        dateChanged={handleDateChanged}
        redrawCanvas={(data) => {
          if (!_.isEqual(getCurrentYearData(flowData).elements, data[0].elements)) {
            excApi?.updateScene({
              elements: cloneObject(data[0].elements),
            });
            excApi?.refresh();
            isReadFromServer = true;
            // console.debug("TimeTraveller redrawCanvas");
          }
        }}
      />

      <div
        className={`canvas ${
          showExcMenu
            ? `${isSidebarCollapsedState ? "show_optional_menu_expanded" : ""}`
            : "hide_optional_menu"
        }`}
      >
        <Excalidraw
          ref={(api: ExcalidrawImperativeAPI) => setExcApi(api)}
          onChange={handleExcalidrawChange}
          UIOptions={{
            canvasActions: {},
            welcomeScreen: false,
          }}
          initialData={getCurrentYearData(flowData)}
        />
      </div>

      <WelcomeModal
        redrawCanvas={(data) => {
          if (!_.isEqual(getCurrentYearData(flowData).elements, data[0].elements)) {
            excApi?.updateScene({
              elements: cloneObject(data[0].elements),
            });
            // excApi?.scrollToContent(data[0].elements);
            // isReadFromServer = true;
          }
        }}
        // @ts-ignore
        excApi={excApi}
      />
      <MyCanvases
        redrawCanvas={(data) => {
          if (!_.isEqual(getCurrentYearData(flowData).elements, data[0].elements)) {
            excApi?.updateScene({
              elements: cloneObject(data[0].elements),
            });
            isReadFromServer = true;
          }
        }}
      />
    </>
  );
};

export default MainPage;
