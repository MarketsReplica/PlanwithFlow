import { getTargetElements } from "@/helper/excalidraw.helper";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData, rewriteMetadataInTheCurrentYear } from "@/store/flowData.store";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Select, InputNumber, Tooltip } from "antd";
import { elementType, fin, liability } from "@/types/metadata.type";
import { cloneObject } from "@/helper/object.helper";
import { updateFlagAtom } from "@/store/updateFlag.store";
import DebtBoxIcon from "../../icons/DebtBox.icon";

//type: "Monthly" | "Annually";
const scheduleOptions = [
  {
    value: "Monthly",
    label: "Monthly",
  },
  {
    value: "Annually",
    label: "Annually",
  },
];

const options = [
  {
    value: "mortgage",
    label: "Mortgage",
  },
  {
    value: "auto-loan",
    label: "Auto Loan",
  },
  {
    value: "student-loan",
    label: "Student Loan",
  },
  {
    value: "credit-card",
    label: "Credit Card",
  },
  {
    value: "personal-loan",
    label: "Personal Loan",
  },
];

const DebtBoxMenu = () => {
  const [appState, setAppState] = useRecoilState(excalidrawAppState);
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  let currentYearData = getCurrentYearData(flowData);

  const [selectedElement, setSelectedElement] = useState<ExcalidrawElement | null>(null);
  const [selectedElementFinData, setSelectedElementFinData] = useState<fin>();

  const [flag, setFlag] = useRecoilState(updateFlagAtom);

  useEffect(() => {
    if (appState && getTargetElements(currentYearData?.elements, appState).length !== 0) {
      setSelectedElement(getTargetElements(currentYearData?.elements, appState)[0]);
      console.log("selectedElement", selectedElement);
      currentYearData.metaData.finData?.forEach((el) => {
        if (el.id === selectedElement?.id) {
          setSelectedElementFinData(el);
        }
      });
    }
  });

  const handleSelectedLiabilityTypeChange = (value: string, propagationRule: string) => {
    const newFinData = currentYearData.metaData.finData?.map((el) => {
      const newEl = cloneObject(el);
      if (newEl.id === selectedElement?.id) {
        // @ts-ignore
        newEl.data.type = value as elementType;
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

    setFlag("handleSelectedLiabilityTypeChange");
  };

  return (
    <Card size="small">
      <div className="flex lg:flex-nowrap flex-wrap items-center gap-2">
        <DebtBoxIcon />
        <Select
          value={selectedElementFinData?.data.type}
          onChange={(value) => handleSelectedLiabilityTypeChange(value, "all_months")}
          showSearch
          style={{ width: 200 }}
          placeholder="Debt Type"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? "").includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options}
        />

        <div style={{ backgroundColor: "#999999", width: "1px", height: "32px" }} />
        <Tooltip title="Debt Amount" placement="bottom">
          <InputNumber
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            value={selectedElementFinData?.data.value}
            onChange={(value) => {
              if (value) {
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
                    "current_month",
                    selectedElement?.id
                  );
              }

              setFlag("debt-value-change");
            }}
            placeholder="Debt Amount"

            //   parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            //   onChange={onChange}
          />
        </Tooltip>
        <InputNumber
          formatter={(value) => `${value} %`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          // @ts-ignore
          value={selectedElementFinData?.data.interestRate}
          onChange={(value) => {
            if (value) {
              const newFinData = currentYearData.metaData.finData?.map((el) => {
                const newEl = cloneObject(el);
                if (newEl.id === selectedElement?.id) {
                  newEl.data.interestRate = value;
                }
                return newEl;
              });
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

            setFlag("debt-interest-rate-change");
          }}
          placeholder="Interest Rate"
          //   parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          //   onChange={onChange}
        />
        <InputNumber
          //   formatter={(value) =>
          //     `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          //   }
          // @ts-ignore
          value={selectedElementFinData?.data.amortization}
          onChange={(value) => {
            if (value) {
              const newFinData = currentYearData.metaData.finData?.map((el) => {
                const newEl = cloneObject(el);
                if (newEl.id === selectedElement?.id) {
                  newEl.data.amortization = value;
                }
                return newEl;
              });
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

            setFlag("debt-amortization-change");
          }}
          placeholder="Amortization Period"
          //   parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          //   onChange={onChange}
        />

        <div style={{ backgroundColor: "#999999", width: "1px", height: "32px" }} />

        <InputNumber
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          // @ts-ignore
          value={selectedElementFinData?.data.repaymentValue}
          onChange={(value) => {
            if (value) {
              const newFinData = currentYearData.metaData.finData?.map((el) => {
                const newEl = cloneObject(el);
                if (newEl.id === selectedElement?.id) {
                  newEl.data.repaymentValue = value;
                }
                return newEl;
              });
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

            setFlag("debt-repayment-value-change");
          }}
          placeholder="Repayment Amount"
        />

        <Select
          // @ts-ignore
          value={selectedElementFinData?.data.repaymentSchedule}
          onChange={(value) => {
            if (value) {
              const newFinData = currentYearData.metaData.finData?.map((el) => {
                const newEl = cloneObject(el);
                if (newEl.id === selectedElement?.id) {
                  newEl.data.repaymentSchedule = value;
                }
                return newEl;
              });
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

            setFlag("debt-repayment-schedule-change");
          }}
          showSearch
          style={{ width: 200 }}
          defaultValue={"Monthly"}
          optionFilterProp="children"
          placeholder="Search to Select"
          filterOption={(input, option) => (option?.label ?? "").includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={scheduleOptions}
        />
      </div>
    </Card>
  );
};

export default DebtBoxMenu;
