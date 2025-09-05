import { getTargetElements } from "@/helper/excalidraw.helper";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData, rewriteMetadataInTheCurrentYear } from "@/store/flowData.store";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Select, InputNumber, DatePicker } from "antd";
import { elementType, fin } from "@/types/metadata.type";
import { cloneObject } from "@/helper/object.helper";
import { updateFlagAtom } from "@/store/updateFlag.store";
import AssetIcon from "../../icons/Asset.icon";
import dayjs from "dayjs";

//create options variable out of following types "car" | "crypto" | "gold" | "collectables"
const options = [
  {
    value: "car",
    label: "Car",
  },
  {
    value: "Cash Reserve",
    label: "Cash Reserve",
  },
  {
    value: "crypto",
    label: "Crypto",
  },
  {
    value: "gold",
    label: "Gold",
  },
  {
    value: "collectables",
    label: "Collectables",
  },
];

const AssetsRealAssetsMenu = () => {
  const appState = useRecoilValue(excalidrawAppState);
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  let currentYearData = getCurrentYearData(flowData);
  const [selectedElement, setSelectedElement] = useState<ExcalidrawElement | null>(null);
  const [selectedElementFinData, setSelectedElementFinData] = useState<fin>();
  const setFlag = useSetRecoilState(updateFlagAtom);

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

  const handleSelectedFieldChangeSelect = (value: string | number | boolean, field: string) => {
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
        "all_months",
        selectedElement?.id
      );

    setFlag("AssetRealAsset-Fields");
  };

  const handleSelectedFieldChangeNumber = (
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

    setFlag("AssetRealAsset-Fields");
  };

  return (
    <Card size="small">
      <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
        <AssetIcon />
        <Select
          value={selectedElementFinData?.data.type}
          onChange={(value) => {
            handleSelectedFieldChangeSelect(value, "type");
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

        <div style={{ backgroundColor: "#999999", width: "1px", height: "32px" }} />
        <InputNumber
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          min={0}
          defaultValue={0}
          step={100}
          stringMode={true}
          value={selectedElementFinData?.data.value}
          onChange={(value) =>
            value && handleSelectedFieldChangeNumber(Number(value), "value", "current_month")
          }
        />
        <DatePicker
          // @ts-ignore
          value={dayjs(selectedElementFinData?.data.valueDate)}
          onChange={(value) => {
            value && handleSelectedFieldChangeNumber(dayjs(value).toString(), "valueDate", "all_months");
          }}
        />
      </div>
    </Card>
  );
};

export default AssetsRealAssetsMenu;
