import { flowDataState, getCurrentYearData } from "@/store/flowData.store";
import Card from "antd/es/card/Card";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const StatsBar = () => {
  const flowData = useRecoilValue(flowDataState);
  const [currentYearData, setCurrentYearData] = useState(getCurrentYearData(flowData));
  const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
    (el, index) => ({
      value: el,
      key: index + 1,
    })
  );
  useEffect(() => {
    setCurrentYearData(getCurrentYearData(flowData));
  }, [flowData]);
  return (
    <div
      className="fixed top-2 right-4 z-10 lg:flex hidden"
      style={{
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        borderRadius: "0.5rem",
        overflow: "hidden",
        justifyContent: "center",
        height: "70px",
      }}
    >
      <Card style={{ height: "68px" }}>
        <div className="flex items-center gap-2 flex-row">
          <span className="text-sm font-medium">
            {monthArray.filter((el) => el.key == currentYearData.metaData.month)[0].value +
              " " +
              currentYearData.metaData.year}
          </span>
          <div style={{ backgroundColor: "#999999", width: "1px", height: "32px" }} />
          <span className="text-sm font-medium">
            Net Worth: {currentYearData.metaData.netWorth.toFixed()} $
          </span>
        </div>
      </Card>
    </div>
  );
};

export default StatsBar;
