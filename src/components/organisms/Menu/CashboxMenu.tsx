import { getTargetElements } from "@/helper/excalidraw.helper";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData, rewriteMetadataInTheCurrentYear } from "@/store/flowData.store";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Select, InputNumber } from "antd";
import CashBoxIcon from "../../icons/CashBox.icon";
import { elementType, fin } from "@/types/metadata.type";
import { cloneObject } from "@/helper/object.helper";
import { updateFlagAtom } from "@/store/updateFlag.store";

type CashBoxMenuProps = {
  cashboxType: string;
  cashboxAmount: number;
  onSelectedCashboxChange: (value: string) => void;
  onCashboxAmountChanged: (value: number | null) => void;
};
const options = [
  {
    value: "cash-deposit",
    label: "Cash Deposit",
  },
  {
    value: "savings-account",
    label: "Savings Account",
  },
  {
    value: "foreign-currency",
    label: "Foreign Currency",
  },
];
const CashBoxMenu = () => {
  const [appState, setAppState] = useRecoilState(excalidrawAppState);
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  let currentYearData = getCurrentYearData(flowData);
  const [selectedElement, setSelectedElement] = useState<ExcalidrawElement | null>(null);
  const [selectedElementType, setSelectedElementType] = useState<elementType>("none");

  const [selectedElementFinData, setSelectedElementFinData] = useState<fin>();

  const [flag, setFlag] = useRecoilState(updateFlagAtom);

  useEffect(() => {
    if (appState && getTargetElements(currentYearData?.elements, appState).length !== 0) {
      setSelectedElement(getTargetElements(currentYearData?.elements, appState)[0]);
      currentYearData.metaData.finData?.forEach((el) => {
        if (el.id === selectedElement?.id && el.type !== "none") {
          setCashboxAmount(el.data.value);
          setSelectedElementType(el.type);
          setSelectedElementFinData(el);
        }
      });
    } else {
      setSelectedElementType("none");
    }
  });

  const [cashboxType, setCashboxType] = useState("cash-deposit");
  const [cashboxAmount, setCashboxAmount] = useState(0);

  const handleSelectedCashboxChange = (value: string, propagationRule: string) => {
    setCashboxType(value);
    const newFinData = currentYearData.metaData.finData?.map((el) => {
      const newEl = cloneObject(el);
      if (newEl.id === selectedElement?.id) {
        // @ts-ignore
        newEl.data.type = value as elementType;
      }
      return newEl;
    });
    if (newFinData && appState && selectedElement?.id) {
      rewriteMetadataInTheCurrentYear(
        newFinData,
        appState,
        flowData,
        setFlowData,
        propagationRule,
        selectedElement?.id
      );
    }
    setFlag("handleSelectedCashboxChange");
  };

  const handleCashboxAmountChanged = (value: number | null, propagationRule: string) => {
    if (value) {
      setCashboxAmount(value);
      const newFinData = currentYearData.metaData.finData?.map((el) => {
        const newEl = cloneObject(el);
        if (newEl.id === selectedElement?.id) {
          newEl.data.value = value;
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
    }

    setFlag("handleCashboxAmountChanged");
  };

  return (
    <Card size="small">
      <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
        <CashBoxIcon />
        <Select
          value={selectedElementFinData?.data.type}
          onChange={(value) => handleSelectedCashboxChange(value, "all_months")}
          size="small"
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
          onChange={(value) => handleCashboxAmountChanged(value, "current_month")}
          //   parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          //   onChange={onChange}
        />
      </div>
    </Card>
  );
};
export default CashBoxMenu;

// (value) => {
//     setValue(value);
//     const newFinData = currentYearData.metaData.finData?.map((el) => {
//       const newEl = cloneObject(el);
//       if (newEl.id === selectedElement?.id) {
//         // @ts-ignore
//         newEl.data.type = value as elementType;
//       }
//       return newEl;
//     });
//     if (newFinData && appState)
//       rewriteMetadataInTheCurrentYear(
//         newFinData,
//         appState,
//         flowData,
//         setFlowData
//       );

//     setFlag("none");
//   }

// (value) => {
//     const newFinData = currentYearData.metaData.finData?.map((el) => {
//       const newEl = cloneObject(el);
//       if (newEl.id === selectedElement?.id) {
//         // @ts-ignore
//         newEl.data.value = value as number;
//       }
//       return newEl;
//     });
//     if (newFinData && appState)
//       rewriteMetadataInTheCurrentYear(
//         newFinData,
//         appState,
//         flowData,
//         setFlowData
//       );

//     setFlag("none");
//     console.log(flag);
//   }
