import { getTargetElements } from "@/helper/excalidraw.helper";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData, rewriteMetadataInTheCurrentYear } from "@/store/flowData.store";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Select, InputNumber, Switch, DatePicker, Tooltip, Input } from "antd";
import { elementType, fin } from "@/types/metadata.type";
import { cloneObject } from "@/helper/object.helper";
import { updateFlagAtom } from "@/store/updateFlag.store";
import dayjs from "dayjs";
import RealEStateAssetIcon from "../../icons/RealEstateAsset.icon";

//create options variable out of following types "own" | "rental" | "commercial" | "raw-land";
const options = [
  {
    value: "own",
    label: "Own",
  },
  {
    value: "rental",
    label: "Rental",
  },
  {
    value: "commercial",
    label: "Commercial",
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

const AssetsRealEstateMenu = () => {
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

    setFlag("assetsSecurities-fields");
  };

  return (
    <Card size="small">
      <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
        <RealEStateAssetIcon />
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
        <Tooltip title="Value at this date" placement="bottom">
          <InputNumber
            width="500px"
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            value={selectedElementFinData?.data.value}
            onChange={(value) => value && handleSelectedFieldChange(value, "value", "current_month")}
          />
        </Tooltip>

        <DatePicker
          // @ts-ignore
          value={dayjs(selectedElementFinData?.data.valueDate)}
          onChange={(value) => {
            value && handleSelectedFieldChange(dayjs(value).toString(), "valueDate", "all_months");
          }}
        />

        <div style={{ backgroundColor: "#999999", width: "1px", height: "32px" }} />
        <Tooltip title="Property location" placement="bottom">
          <InputNumber
            //   formatter={(value) =>
            //     `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            //   }
            // @ts-ignore
            value={selectedElementFinData?.data.location}
            onChange={(value) => value && handleSelectedFieldChange(value, "location", "all_months")}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export default AssetsRealEstateMenu;
