import { getTargetElements } from "@/helper/excalidraw.helper";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData, rewriteMetadataInTheCurrentYear } from "@/store/flowData.store";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Select, InputNumber, Switch, DatePicker, Tooltip } from "antd";
import { elementType, fin } from "@/types/metadata.type";
import { cloneObject } from "@/helper/object.helper";
import { updateFlagAtom } from "@/store/updateFlag.store";
import AssetIcon from "../../icons/Asset.icon";

// TODO => What about the button ?

const options = [
  {
    value: "401-plan",
    label: "401 Plan",
  },
  {
    value: "roth-ira",
    label: "Roth IRA",
  },
  {
    value: "traditional-ira",
    label: "tTraditional IRA",
  },
  {
    value: "non-registered",
    label: "Non Registered",
  },
];

const AssetsSecuritiesMenu = () => {
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
    value = Number(value);
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

    setFlag("assetsSecuritiesMenu");
  };

  return (
    <Card size="small">
      <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
        <AssetIcon />
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
          stringMode={true}
          step={1000}
          onChange={(value) => value && handleSelectedFieldChange(value, "value", "current_month")}
        />

        <div style={{ backgroundColor: "#999999", width: "1px", height: "32px" }} />
        <Tooltip title="Maximun Contribution" placement="bottom">
          <InputNumber
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            //@ts-ignore
            value={selectedElementFinData?.data.maxContribution}
            step={100}
            onChange={(value) =>
              value && handleSelectedFieldChange(value, "maxContribution", "future_months")
            }
          />
        </Tooltip>
        <Tooltip title="Monthly Contribution" placement="bottom">
          <InputNumber
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            //@ts-ignore
            value={selectedElementFinData?.data.contribution}
            onChange={(value) => value && handleSelectedFieldChange(value, "contribution", "future_months")}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export default AssetsSecuritiesMenu;
