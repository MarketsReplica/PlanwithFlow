import { getTargetElements } from "@/helper/excalidraw.helper";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData, rewriteMetadataInTheCurrentYear } from "@/store/flowData.store";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Select, InputNumber, Switch } from "antd";
import { elementType, fin } from "@/types/metadata.type";
import { cloneObject } from "@/helper/object.helper";
import { updateFlagAtom } from "@/store/updateFlag.store";
import GovIcon from "../../icons/Gov.icon";

// create a variable named options and fill it with these value:  "country" | "state";
const options = [
  {
    value: "country",
    label: "Country",
  },
  {
    value: "state",
    label: "State",
  },
];

const GovMenu = () => {
  const appState = useRecoilValue(excalidrawAppState);
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  let currentYearData = getCurrentYearData(flowData);
  const [selectedElement, setSelectedElement] = useState<ExcalidrawElement | null>(null);
  const [selectedElementFinData, setSelectedElementFinData] = useState<fin>();
  const [flag, setFlag] = useRecoilState(updateFlagAtom);

  useEffect(() => {
    if (appState && getTargetElements(currentYearData?.elements, appState).length !== 0) {
      setSelectedElement(getTargetElements(currentYearData?.elements, appState)[0]);
      currentYearData.metaData.finData?.forEach((el) => {
        if (el.id === selectedElement?.id) {
          setCashboxAmount(el.data.value);
          setSelectedElementFinData(el);
        }
      });
    }
  });

  const [cashboxAmount, setCashboxAmount] = useState(0);

  const handleSelectedFieldChange = (
    value: string | number | boolean,
    field: string,
    propagationRule: string
  ) => {
    const newFinData = currentYearData.metaData.finData?.map((el) => {
      const newEl = cloneObject(el);
      if (newEl.id === selectedElement?.id) {
        // @ts-ignore
        newEl.data[field] = value as elementType;
      }
      return newEl;
    });
    if (newFinData && appState && selectedElement?.id)
      rewriteMetadataInTheCurrentYear(
        newFinData,
        appState,
        flowData,
        setFlowData,
        propagationRule,
        selectedElement?.id
      );

    setFlag("GovernmentMenu-field");
  };

  return (
    <Card size="small">
      <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
        <GovIcon />
        <Select
          // @ts-ignore
          value={selectedElementFinData?.data.taxResidance}
          onChange={(value) => {
            handleSelectedFieldChange(value, "taxResidance", "all_months");
          }}
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? "").includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options}
        />
      </div>
    </Card>
  );
};

export default GovMenu;
