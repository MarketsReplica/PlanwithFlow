import { Button, Card, Select, Slider } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import { selector, useRecoilState } from "recoil";
import { flowDataState, setNewCurrentYear } from "@/store/flowData.store";
import { useState, useEffect, useRef } from "react";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { updateFlagAtom } from "@/store/updateFlag.store";
import { PlayCircleOutlined } from "@ant-design/icons";
import { flowData } from "@/types/flowData.type";
import { updateElementsTexts } from "./updateElementsTexts";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperRef } from "swiper/react";
import "swiper/css";

const yearsArray = Array.from(Array(15).keys()).map((el) => ({
  value: el + 2023,
  key: el + 2023,
}));
const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((el, index) => ({
  value: el,
  key: index + 1,
}));

const getMonthNumber = (month: string) =>
  monthArray.findIndex((el) => el.value === month) + 1;

const dates = yearsArray
  .map((year) =>
    monthArray.map((month) => ({
      year: year.value,
      month: month.value,
    }))
  )
  .flat();

type selected = { value: string | number; key: number };
type props = {
  dateChanged: (els: ExcalidrawElement[]) => void;
  redrawCanvas: (flowData: flowData) => void;
};
const TimeTraveller = ({ dateChanged, redrawCanvas }: props) => {
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const [flag, setFlag] = useRecoilState(updateFlagAtom);
  const [month, setMonth] = useState<{ value: string | number; key: number }>({
    value: "Jan",
    key: 1,
  });
  const [year, setYear] = useState<{ value: string | number; key: number }>({
    value: 2023,
    key: 2023,
  });

  const handleMonthChange = (value: string, obj: selected | selected[]) =>
    setMonth(obj as selected);
  const handleYearChange = (value: string, obj: selected | selected[]) =>
    setYear(obj as selected);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    if (!jsonData) return;
    setFlowData(jsonData);
    redrawCanvas(jsonData);
  }, [jsonData]);

  const handleAddLables = (event: any) => {
    const flowWithLables = updateElementsTexts(flowData);
    setJsonData(flowWithLables);
    redrawCanvas(flowWithLables);
  };

  const swipperRef = useRef<SwiperRef>(null);

  return (
    <>
      <Button
        type="primary"
        icon={<DollarCircleOutlined />}
        className="fixed lg:hidden top-[128px] right-0 z-10 min-w-[36px] min-h-[36px]"
        style={{
          color: "#333",
          backgroundColor: "#fff",
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
        }}
        onClick={handleAddLables}
      />

      <div className="block lg:hidden p-0 fixed z-10 top-0 w-full">
        <Swiper
          ref={swipperRef}
          onSlideChange={(eve) => {
            const [month, year] = eve.slides
              .filter((sl, index) => eve.activeIndex === index)[0]
              .accessKey.split("-");

            // DISCUSSION => finds the new year that we swiped to
            const newYear = flowData.filter(
              (el, index) =>
                index ===
                flowData.findIndex(
                  (el) =>
                    el.metaData.month === getMonthNumber(month) &&
                    el.metaData.year === parseInt(year)
                )
            )[0];
            console.log(newYear.metaData);
            dateChanged(newYear.elements);

            setNewCurrentYear(
              flowData,
              setFlowData,
              newYear.metaData.month,
              newYear.metaData.year
            );
            setFlag("timeTraveller-slider");
          }}
        >
          {dates.map((el, index) => {
            if (el.year === 2023 && getMonthNumber(el.month) < 4) return null;
            else
              return (
                <SwiperSlide key={index} accessKey={`${el.month}-${el.year}`}>
                  <div className="flex w-full justify-between items-center h-12 bg-white">
                    <Button
                      type="text"
                      disabled={index === 0}
                      onClick={() => swipperRef.current?.swiper.slidePrev()}
                    >
                      Prev
                    </Button>
                    {`${el.month} ${el.year}`}
                    <Button
                      type="text"
                      onClick={() => swipperRef.current?.swiper.slideNext()}
                    >
                      Next
                    </Button>
                  </div>
                </SwiperSlide>
              );
          })}
        </Swiper>
      </div>

      <Card
        bordered={false}
        style={{
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          borderRadius: "0.5 rem",
          overflowX: "auto",
          overflowY: "hidden",
        }}
        bodyStyle={{ padding: "7px" }}
        className="p-0 fixed z-10 top-2 left-[50%] -translate-x-1/2 lg:min-w-[720px] sm:w-[400px] lg:block hidden"
      >
        <div className="flex gap-2 items-center w-[700px]">
          {/* <Select
          defaultValue="2023"
          style={{ width: 120 }}
          onChange={handleYearChange}
          options={yearsArray}
          size="small"
        />
        <Select
          defaultValue="Jan"
          style={{ width: 120 }}
          onChange={handleMonthChange}
          options={monthArray}
          size="small"
        />
        <Button
          type="text"
          size="small"
          onClick={() => {
            // SO THE Explanation here is that you should handle excalidraw changes
            // before you update the flowData.
            dateChanged(
              flowData.filter(
                (el) =>
                  el.metaData.month === month.key &&
                  year.key === el.metaData.year
              )[0].elements
            );
            setNewCurrentYear(flowData, setFlowData, month.key, year.key);
            setFlag("none");
          }}
        >
          Submit
        </Button> */}

          <Button
            type="text"
            icon={<DollarCircleOutlined />}
            className="mx-2"
            onClick={handleAddLables}
          >
            {/* 
            find play icon from ant design
          */}
          </Button>

          <Slider
            marks={{
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
            }}
            defaultValue={0}
            max={179}
            // step={12}
            className="w-[720px] mx-4"
            onChange={(value) => {
              const newYear = flowData.filter(
                (el, index) => index === value
              )[0];
              console.log(newYear.metaData);

              dateChanged(newYear.elements);
              setNewCurrentYear(
                flowData,
                setFlowData,
                newYear.metaData.month,
                newYear.metaData.year
              );
              setFlag("timeTraveller-slider");
            }}
          />
        </div>
      </Card>
    </>
  );
};

export default TimeTraveller;
