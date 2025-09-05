import { BiUser } from "react-icons/bi";
import { GiArtificialHive } from "react-icons/gi";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ReactNode } from "react";

interface TimeSeriesItem {
  date: string;

  [key: string]: string;
}

type MessageBoxProps = {
  message: ReactNode;
  className?: string;
  isSender?: boolean;
  chartData?: TimeSeriesItem[];
};

const MessageBox = ({ message, className, isSender, chartData }: MessageBoxProps) => {
  const renderChart = () => {
    if (!chartData) {
      chartData = [];
    }
    if (chartData.length > 0) {
      return (
        <div className="w-full">
          <ResponsiveContainer width="70%" height={250}>
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                animationDuration={200}
              />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
    return null;
  };

  const renderMessageWithLinks = () => {
    if (typeof message === "string") {
      const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const boldTextRegex = /\*\*\*\*((?:[^*]|(\*{1,3}[^*]))+)\*\*\*\*/g; // Updated regex

      let tempMessage = message;
      let elements = [];

      // find links
      let linkMatch;
      while ((linkMatch = markdownLinkRegex.exec(tempMessage)) !== null) {
        elements.push({
          type: "link",
          text: linkMatch[1],
          href: linkMatch[2],
          index: linkMatch.index,
        });
      }

      // find bold texts
      let boldMatch;
      while ((boldMatch = boldTextRegex.exec(tempMessage)) !== null) {
        elements.push({
          type: "bold",
          text: boldMatch[1],
          index: boldMatch.index,
        });
      }

      // sort all elements based on index
      elements.sort((a, b) => a.index - b.index);

      // split message into parts and insert elements
      let lastIdx = 0;
      let result = [];
      for (let elem of elements) {
        // push text before element
        if (elem.index > lastIdx) {
          result.push(tempMessage.slice(lastIdx, elem.index));
          lastIdx = elem.index;
        }
        // push element
        if (elem.type === "link") {
          result.push(
            <a href={elem.href} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {elem.text}
            </a>
          );
          //@ts-ignore
          lastIdx += elem.text.length + 2 + elem.href.length + 2; // adjust for [text](href)
        } else if (elem.type === "bold") {
          result.push(<strong>{elem.text}</strong>);
          lastIdx += elem.text.length + 8; // adjust for ****text****
        }
      }

      // push remaining text after last element
      if (lastIdx < tempMessage.length) {
        result.push(tempMessage.slice(lastIdx));
      }

      return result;
    }
    return message;
  };

  return (
    <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} gap-2`}>
      <div className={`relative ${className} w-full`}>
        <div
          className="flex flex-col px-2"
          style={{
            minHeight: "32px",
            color: isSender ? "#f0f0f0" : "#333",
            backgroundColor: isSender ? "#3a86ff" : "#edf2f4",
          }}
        >
          <div className="p-4 flex gap-1">
            <div className="w-4 h-4">
              {isSender ? (
                <BiUser color={"#edf2f4"} size={16} />
              ) : (
                <GiArtificialHive color={"#3a86ff"} size={16} />
              )}
            </div>
            <div
              className="text-sm font-regular text-justify"
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {renderMessageWithLinks()}
            </div>
          </div>
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
