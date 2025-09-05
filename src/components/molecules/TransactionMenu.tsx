import { getTargetElements } from "@/helper/excalidraw.helper";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData, rewriteMetadataInTheCurrentYear } from "@/store/flowData.store";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Select, InputNumber, Switch, DatePicker } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { elementType, fin } from "@/types/metadata.type";
import { cloneObject } from "@/helper/object.helper";
import { updateFlagAtom } from "@/store/updateFlag.store";
import dayjs from "dayjs";

//create options variable out of following types "car" | "crypto" | "gold" | "collectables"
const options = [
  {
    value: "regular",
    label: "Regular Transaction",
  },
  {
    value: "one-time",
    label: "One Time Transaction",
  },
];

// create a variable named paymentPeriodOptions and fill it with these value: "Monthly" | "Annually";
const paymentPeriodOptions = [
  {
    value: "Monthly",
    label: "Monthly",
  },
  {
    value: "Annually",
    label: "Annually",
  },
];

const TransactionMenu = () => {
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
        newEl.data.manualEntry = true;
      }
      return newEl;
    });
    if (newFinData && appState && selectedElement?.id) {
      rewriteMetadataInTheCurrentYear(
        newFinData,
        appState,
        flowData,
        setFlowData,
        "future_months",
        selectedElement.id
      );
    }
    setFlag("transactionMenu-field");
  };
  const handleSelectedFieldChangeNumber = (value: string | number | boolean, field: string) => {
    const newFinData = currentYearData.metaData.finData?.map((el) => {
      const newEl = cloneObject(el);
      if (newEl.id === selectedElement?.id) {
        // @ts-ignore
        newEl.data[field] = value as elementType;
        newEl.data.manualEntry = true;
      }
      return newEl;
    });
    if (selectedElementFinData?.data?.type === "one-time") {
      if (newFinData && appState && selectedElement?.id)
        rewriteMetadataInTheCurrentYear(
          newFinData,
          appState,
          flowData,
          setFlowData,
          "current_month",
          selectedElement?.id
        );
    } else {
      if (newFinData && appState && selectedElement?.id)
        rewriteMetadataInTheCurrentYear(
          newFinData,
          appState,
          flowData,
          setFlowData,
          "future_months",
          selectedElement?.id
        );
    }
    setFlag("transactionMenu-field");
  };

  return (
    <Card size="small">
      <div className="flex items-center gap-2">
        <ArrowRightOutlined />
        <Select
          value={selectedElementFinData?.data?.type ?? "regular"}
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
          value={selectedElementFinData?.data?.value ?? 0}
          onChange={(value) => value && handleSelectedFieldChangeNumber(value, "value")}
        />
      </div>
    </Card>
  );
};

export default TransactionMenu;
