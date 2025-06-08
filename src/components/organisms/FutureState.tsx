import React, { useEffect, useState } from "react";
import { Button,  InputNumber, List, Modal, Select, Slider, Space, Tabs } from "antd";
// import { flowDataState } from "@/store/flowData.store";
import { useRecoilState } from "recoil";
// import AppToolbar from "../organisms/AppToolbar";
// import { flowData } from "@/types/flowData.type";
import { updateModalOpen } from "@/store/updateFlag.store";
// import { futureWorld } from "@/store/futureWorld.store";
import configs from "@/appConfig";
import { cloneObject } from "@/helper/object.helper";
import { insertInterval, monthObjectsFunc, ConstructInflationDataSummary } from "../molecules/supportFunctions";

// interface SliderProps {
//   addInflationInterval: (value: [number, number]) => void;
//   formatter: (value: number) => string;
// }

const FutureState = () => {
  // const [inputURL, setInputURL] = useState("");
  // const [flowData, setFlowData] = useRecoilState(flowDataState);
  // const [futureState, setFutureState] = useRecoilState(futureWorld);

  const [openModal, setOpenModal] = useRecoilState(updateModalOpen);
  const [currentInflation, setCurrentInflation] = useState(6);
  const [currentInterval, setCurrentInterval] = useState([0, 24]);
  const [isFutureModalOpen, setIsFutureModalOpen] = useState(false);
  const [inflationValues, setInflationValues] = useState(configs.inflationValues);
  const [inflationIntervals, setInflationIntervals] = useState(configs.inflationIntervals);



  useEffect(() => {
    if (openModal === "FutureModal") showModal();
  }, [openModal]);

  const showModal = () => {
    setIsFutureModalOpen(true);
  };

  const handleCancel = () => {
    setIsFutureModalOpen(false);
    setOpenModal("none");
    applyFutureState();
  };
  const handleSliderChange = (value: number[]) => {
    setCurrentInterval(value);
  };
  // function to update the futureState object when the model is closed
  const applyFutureState = () => {};

  //function to update inflationInterval when the slider is changed
  const addInflationInterval = () => {
    let inflationIntervalsCopy = cloneObject(inflationIntervals);
    inflationIntervalsCopy = insertInterval(inflationIntervalsCopy, currentInterval);
    setInflationIntervals(inflationIntervalsCopy);
    setInflationValues([...inflationValues, currentInflation]);
  };
  function addInflationValue(value: number | null) {
    setCurrentInflation(value as number);
  }

  const monthObjects = monthObjectsFunc(configs.projectionLength);

  // const tabItems = [
  //   { key: "inflation", label: "Inflation Outlook" },
  //   { key: "interest", label: "Interest Rate Outlook" },
  // ];
  const sliderMarks = {
    0: "2023",
    12: "2024",
    24: "2025",
    36: "2026",
    48: "2027",
    60: "2028",
    72: "2029",
    84: "2030",
    96: "2031",
    108: "2032",
    120: "2033",
    132: "2034",
    144: "2035",
    156: "2036",
    168: "2037",
    179: "2038",
  };

  const inflationDataSummary = ConstructInflationDataSummary(
    inflationIntervals,
    inflationValues,
    monthObjects
  );

  const forecastOptions = [{ value: "world-outlook", label: "IMF World Economic Outlook" }];

  const formatter = (/*value: number*/): string => {
    // const currentYear = new Date().getFullYear().toString();
    // const year = Math.floor(value / 12) + currentYear;
    // const month = monthObjects[value].month;
    let dateStr = "Jan 2025";
    return dateStr;
  };

  const handleForecastChange = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Modal
        open={isFutureModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="min-w-[817px] h-[596px] z-50"
        bodyStyle={{
          padding: "28px",
          width: "817px",
          height: "60vh",
        }}
      >
        <div className="overflow-y-scroll h-full">
          <div className="font-normal text-xl">The Future State of the Economy</div>
          <div className="font-normal text-m mt-4 mr-10">
            {" "}
            Adjust macro-economic parameters based on the following presets obtained from latest economic
            outlooks or set your own parameters according to a stress testing scenario you have in mind. To do
            so, choose a range of dates and apply the desired parameter value for the selected interval.{" "}
          </div>
          <br />
          <Select options={forecastOptions} defaultValue="world-outlook" onChange={handleForecastChange} />
          <br></br>
          <br></br>
          <Tabs defaultActiveKey="1" type="card">
            <Tabs.TabPane tab="Inflation Outlook" key="1">
              {/* @ts-ignore */}
              <Space direction="vertical" size={"middle"} style={{ width: "90%" }}>
                <Slider
                  marks={sliderMarks}
                  // @ts-ignore
                  tooltip={{ formatter }}
                  range={{ draggableTrack: true }}
                  defaultValue={currentInterval as [number, number]}
                  max={179}
                  className="mx-4"
                  style={{ width: "90%", marginTop: "20px" }}
                  onChange={(value: [number, number]) => handleSliderChange(value)}
                />
                <Space size={"large"}>
                  <InputNumber
                    min={0}
                    defaultValue={currentInflation}
                    formatter={(value) => `${value}%`}
                    onChange={(value) => {
                      addInflationValue(value);
                    }}
                  />
                  <Button onClick={() => addInflationInterval()}>Set for this interval</Button>
                </Space>
                <List
                  size="small"
                  header={
                    <div>
                      <strong> Future Inflation Rate Assumption:</strong>
                    </div>
                  }
                  bordered
                  dataSource={inflationDataSummary}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Space>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Interest Rate Outlook" key="2">
              {/* @ts-ignore */}
              <Space direction="vertical" size={"middle"} style={{ width: "90%" }}>
                <Slider
                  marks={sliderMarks}
                  //@ts-ignore
                  tooltip={{ formatter }}
                  range={{ draggableTrack: true }}
                  defaultValue={[0, 24]}
                  max={179}
                  className="mx-4"
                  style={{ width: "90%", marginTop: "20px" }}
                  onChange={() => {}}
                />
                <Space size={"large"}>
                  <InputNumber
                    min={0}
                    defaultValue={2}
                    formatter={(value) => `${value}%`}
                    onChange={() => {}}
                  />
                  <Button>Set for this interval</Button>
                </Space>
                <List
                  size="small"
                  header={
                    <div>
                      <strong> Future Interest Rate Assumption:</strong>
                    </div>
                  }
                  bordered
                  dataSource={inflationDataSummary}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Space>
            </Tabs.TabPane>
          </Tabs>
          <div className="flex items-center gap-[30px] flex-wrap mt-7"></div>
        </div>
      </Modal>
    </>
  );
};

export default FutureState;
