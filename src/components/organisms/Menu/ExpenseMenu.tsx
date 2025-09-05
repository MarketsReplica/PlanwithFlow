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
import ExpenseEntityIcon from "../../icons/ExpenseEntity.icon";

//create options variable with the folowig "regular" | "one-time";
const options = [
  {
    value: "regular",
    label: "Regular",
  },
  {
    value: "one-time",
    label: "One Time",
  },
];

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

const ExpenseMenu = () => {
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

    setFlag("expenseMenu-fields");
  };

  return (
    <Card size="small">
      <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
        <ExpenseEntityIcon />
        <Select
          value={selectedElementFinData?.data.type}
          onChange={(value) => {
            handleSelectedFieldChange(value, "type", "all_months");
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
          value={selectedElementFinData?.data.value}
          onChange={(value) => value && handleSelectedFieldChange(value, "value", "future_months")}
        />
        <Select
          // @ts-ignore
          value={selectedElementFinData?.data.period}
          onChange={(value) => handleSelectedFieldChange(value, "period", "future_months")}
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? "").includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={paymentPeriodOptions}
        />

        <div style={{ backgroundColor: "#999999", width: "1px", height: "32px" }} />

        <Switch
          // @ts-ignore
          checked={selectedElementFinData?.data.deductable}
          onChange={(value) => {
            handleSelectedFieldChange(value, "deductable", "future_months");
          }}
          // make the switch disabled
          disabled={true}
        />
        <span> Deductable </span>
      </div>
    </Card>
  );
};

export default ExpenseMenu;
