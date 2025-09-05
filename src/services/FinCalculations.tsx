import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState } from "@/store/flowData.store";
import { updateFlagAtom } from "@/store/updateFlag.store";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { calculateFinModel } from "./finModel.service";
import { futureWorld } from "@/store/futureWorld.store";

const FinCalculations = () => {
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const [appState, setAppState] = useRecoilState(excalidrawAppState);
  const [updateFlag, setUpdateFlag] = useRecoilState(updateFlagAtom);
  const futureState = useRecoilValue(futureWorld);

  useEffect(() => {
    if (updateFlag !== "finModel") {
      calculateFinModel(flowData, setFlowData, appState, updateFlag, setUpdateFlag, futureState);
    }
  }, [flowData, futureState]);
  return <div id="fin-calc"></div>;
};

export default FinCalculations;
