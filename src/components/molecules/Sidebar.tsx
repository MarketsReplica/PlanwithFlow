import React, { useEffect, useState } from "react";
import {
  ArrowRightOutlined,
  LineOutlined,
  ScissorOutlined,
  HighlightOutlined,
  FontColorsOutlined,
  HomeOutlined,
  FundOutlined,
  CarOutlined,
  BankOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { AppState } from "@excalidraw/excalidraw/types/types";
import { toolType } from "@/types/ui.type";
import { useRecoilState } from "recoil";
import { excalidrawAppState } from "@/store/appState.store";
import DebtBoxIcon from "@/components/icons/DebtBox.icon";
import IncomeEntityIcon from "@/components/icons/IncomeEntity.icon";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import {
  checkIfIdIsInMetadata,
  flowDataState,
  getCurrentYearData,
  updateMetadataInTheCurrentYear,
} from "@/store/flowData.store";
import { getElementById, getTargetElements } from "@/helper/excalidraw.helper";
import { updateFlagAtom } from "@/store/updateFlag.store";
import {
  assetRealAssets,
  expense,
  income,
  liability,
  elementType,
  assetsRealEstate,
} from "@/types/metadata.type";
import moment from "moment";
import { calculateLoanProperties } from "@/services/supporting_functions";
import ExpenseEntityIcon from "../icons/ExpenseEntity.icon";
import styled from "styled-components";
import { Button } from "antd";
import { AiOutlineDown } from "react-icons/ai";
import { isSidebarCollapsed, showMenuState } from "@/store/menu.store";
import { set } from "lodash";

let lock = false;
const { Sider } = Layout;

const CustomSider = styled(Sider)`
  position: fixed;
  z-index: 10;
  width: 200px;
  max-height: calc(100vh - 128px);
  overflow-x: hidden;
  overflow-y: auto;
  top: 96px;
  left: -15px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
`;
const CustomSiderMobile = styled(Sider)`
  position: fixed;
  z-index: 10;
  width: 100%;
  max-height: 64px;
  overflow-x: auto;
  overflow-y: hidden;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
`;

const CustomMobileMenu = styled.div<{
  expand: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100vw;
  height: ${(props) => (props.expand ? "100%" : "96px")};
  transition: all 0.2s;
  z-index: 10;
`;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Selection",
    "none-selection",
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0L9 9.70786L4.76471 10.3071L7.35294 14.9813L5.47059 16L3.29412 11.1461L0 13.603V0Z"
          fill="#004AF2"
        />
      </svg>
    </span>
  ),
  getItem(
    "Transaction",
    "transaction-arrow",
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.62023 15.0834L4.00023 9.05004L11.2402 9.05004L7.62023 15.0834Z" fill="black" />
      <path
        d="M7.61908 0C7.61908 11.1547 7.61927 5.43 7.61914 13.2733"
        stroke="black"
        stroke-width="2.41333"
      />
    </svg>
  ),
  getItem(
    "Cash Box",
    "cashbox-rectangle",
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1H17V12H1V1Z"
          fill="#DDE9AF"
          fillOpacity="0.411765"
          stroke="black"
          strokeWidth="1.52294"
        />
        <path
          d="M8.60795 10.8182V2.63636H9.1321V10.8182H8.60795ZM10.3722 5.09091C10.3338 4.76705 10.1783 4.51562 9.90554 4.33665C9.63281 4.15767 9.2983 4.06818 8.90199 4.06818C8.61222 4.06818 8.35866 4.11506 8.14134 4.20881C7.92614 4.30256 7.75781 4.43146 7.63636 4.59553C7.51705 4.75959 7.45739 4.94602 7.45739 5.15483C7.45739 5.32955 7.49893 5.47976 7.58203 5.60547C7.66726 5.72905 7.77592 5.83239 7.90803 5.91548C8.04013 5.99645 8.17862 6.06357 8.32351 6.11683C8.46839 6.16797 8.60156 6.20952 8.72301 6.24148L9.38778 6.42045C9.55824 6.4652 9.74787 6.52699 9.95668 6.60582C10.1676 6.68466 10.369 6.79226 10.5607 6.92862C10.7546 7.06285 10.9144 7.23544 11.0401 7.44638C11.1658 7.65732 11.2287 7.91619 11.2287 8.22301C11.2287 8.5767 11.136 8.89631 10.9506 9.18182C10.7674 9.46733 10.4989 9.69425 10.1452 9.86257C9.79368 10.0309 9.36648 10.1151 8.86364 10.1151C8.39489 10.1151 7.98899 10.0394 7.64595 9.88814C7.30504 9.73686 7.03658 9.52592 6.84055 9.25533C6.64666 8.98473 6.53693 8.67045 6.51136 8.3125H7.32955C7.35085 8.55966 7.43395 8.7642 7.57884 8.92614C7.72585 9.08594 7.91122 9.20526 8.13494 9.28409C8.3608 9.3608 8.60369 9.39915 8.86364 9.39915C9.16619 9.39915 9.43786 9.35014 9.67862 9.25213C9.91939 9.15199 10.1101 9.01349 10.2507 8.83665C10.3913 8.65767 10.4616 8.44886 10.4616 8.21023C10.4616 7.9929 10.4009 7.81605 10.2795 7.67969C10.158 7.54332 9.99822 7.43253 9.80007 7.3473C9.60192 7.26207 9.38778 7.1875 9.15767 7.12358L8.35227 6.89347C7.84091 6.74645 7.43608 6.53658 7.13778 6.26385C6.83949 5.99112 6.69034 5.63423 6.69034 5.19318C6.69034 4.8267 6.78942 4.5071 6.98757 4.23438C7.18786 3.95952 7.45632 3.74645 7.79297 3.59517C8.13175 3.44176 8.50994 3.36506 8.92756 3.36506C9.34943 3.36506 9.72443 3.4407 10.0526 3.59197C10.3807 3.74112 10.6406 3.94567 10.8324 4.20561C11.0263 4.46555 11.1286 4.76065 11.1392 5.09091H10.3722Z"
          fill="black"
          fillOpacity="0.994819"
        />
      </svg>
    </span>
  ),
  getItem(
    "Debt Box",
    "liability-rectangle",
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <DebtBoxIcon />
    </span>
  ),
  getItem(
    "Income",
    "income-ellipse",
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <IncomeEntityIcon />
    </span>
  ),
  getItem(
    "Expense",
    "expense-ellipse",
    <span>
      <ExpenseEntityIcon />
    </span>
  ),
  getItem(
    "Real Estate",
    "assetRealEstate-rectangle",
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <HomeOutlined />
    </span>
  ),

  getItem(
    "Stocks & Bonds",
    "assetSecurities-rectangle",
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <FundOutlined />
    </span>
  ),
  getItem(
    "Other Assets",
    "assetRealAssets-rectangle",
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <CarOutlined />
    </span>
  ),
  getItem(
    "Government / Tax",
    "government-diamond",
    <span role="img" aria-label="desktop" className="anticon anticon-desktop ant-menu-item-icon">
      <BankOutlined />
    </span>
  ),

  getItem("Draw Line", "none-line", <LineOutlined />),
  getItem("Delete", "none-eraser", <ScissorOutlined />),
  getItem("Add Text", "none-text", <FontColorsOutlined />),
  getItem("Free Draw", "none-freedraw", <HighlightOutlined />),
];

type props = {
  selectedToolChanged?: (toolType: toolType, elementType: elementType) => void;
  appState?: AppState;
};

const Sidebar = ({ selectedToolChanged }: props) => {
  const [collapsed, setCollapsed] = useRecoilState(isSidebarCollapsed);
  const [selected, setSelected] = useState("none-selection");
  const [appState, setAppState] = useRecoilState(excalidrawAppState);
  const [flowData, setFlowData] = useRecoilState(flowDataState);
  const [flag, setFlag] = useRecoilState(updateFlagAtom);
  const getToolType = (key: string) => {
    const keys = key.split("-").map((el) => el.toLowerCase());
    return keys[keys.length - 1] as toolType;
  };
  const getELementType = (key: string) => {
    const keys = key.split("-").map((el) => el);
    return keys[0] as elementType;
  };

  // const getSelectedTool = () => {
  //
  // }

  if (lock === false) {
    setTimeout(() => {
      setCollapsed(false);
      lock = true;
    }, 2000);
  }

  useEffect(() => {
    let selectedElement: ExcalidrawElement | undefined = undefined;
    if (appState) {
      selectedElement = getTargetElements(getCurrentYearData(flowData)?.elements, appState)[0];

      if (!checkIfIdIsInMetadata(flowData, selectedElement?.id) && selectedElement?.id) {
        updateMetadataInTheCurrentYear(
          {
            // @ts-ignore
            id: selectedElement?.id,
            type: (() => {
              if (appState?.editingElement?.type !== "text") return getELementType(selected);
              else return "none";
            })(),

            data: (() => {
              if (getELementType(selected) === "none" && appState?.editingElement?.type === "text") {
                return;
              } else if (getELementType(selected) === "cashbox") {
                return {
                  value: 3000,
                  type: "cash-deposit",
                };
              } else if (getELementType(selected) === "liability") {
                return {
                  type: "mortgage",
                  interestRate: 5,
                  amortization: 25,
                  repaymentSchedule: "Monthly",
                  repaymentValue: calculateLoanProperties(100000, 5, 25 * 12, null).monthlyPayment,
                  value: 100000,
                  maxValue: 10000,
                } as liability;
              } else if (getELementType(selected) === "income") {
                return {
                  value: 3500,
                  taxable: true,
                  period: "Monthly",
                  type: "employment-salary",
                } as income;
              } else if (getELementType(selected) === "expense") {
                return {
                  value: 1500,
                  deductable: true,
                  period: "Monthly",
                  type: "regular",
                } as expense;
              } else if (getELementType(selected) === "transaction") {
                return {
                  value: 0,
                  type: "regular",
                  manualEntry: false,
                };
              } else if (getELementType(selected) === "assetRealAssets") {
                return {
                  value: 0,
                  type: "Cash Reserve",
                  valueDate: moment(new Date()).toString(),
                } as assetRealAssets;
              } else if (getELementType(selected) === "assetSecurities") {
                return {
                  value: 120000,
                  type: "401-plan",
                  contribution: 1000,
                  maxContribution: 2000,
                };
              } else if (getELementType(selected) === "assetRealEstate") {
                return {
                  type: "own",
                  location: 1,
                  valueDate: moment(new Date()).toString(),
                  propertyType: "house",
                  value: 350000,
                } as assetsRealEstate;
              } else if (getELementType(selected) === "government") {
                return {
                  taxResidance: "country",
                };
              }
            })(),
          },
          appState,
          flowData,
          setFlowData
        );

        setFlag(getELementType(selected) + "-Sidebar");
      }
    }
  }, [appState]);

  const [showMobileMenu, setShowMobileMenu] = useRecoilState(showMenuState);

  return (
    // TODO => CHECK FOR IF YOU CAN USE THE STORE APPSTATE [DONE]
    // TODO => FIX THE BUG WHERE WHENEVER YOU ADD STH TO THE MINOR YEAR ITS GOING TO RE-WRITE WHOLE FUTURE
    // TODO => ADD MENU BUTTONS AND WITH THEIR ICONS. [DONE]
    <>
      <Sider
        collapsible
        className="fixed z-50 w-full lg:hidden shadow h-screen"
        collapsedWidth={0}
        collapsed={showMobileMenu}
        onCollapse={(collapsed, type) => {
          setShowMobileMenu(collapsed);
        }}
        theme="light"
        zeroWidthTriggerStyle={{
          display: "none",
        }}
      >
        <Menu
          // selectable={false}
          selectedKeys={(() => {
            if (appState?.activeTool.type === "selection") return ["none-selection"];
            else return [selected];
          })()}
          mode="inline"
          items={items}
          onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
            setSelected(key);
            const keys = key.split("-").map((el) => el);
            selectedToolChanged?.(keys[keys.length - 1] as toolType, keys[0] as elementType);
            setShowMobileMenu(true);
          }}
        />
      </Sider>

      <div className="max-h-screen w-screen hidden lg:block">
        <CustomSider
          collapsedWidth={64}
          width={175}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          className="customized-scrollbar"
        >
          <Menu
            // selectable={false}
            selectedKeys={(() => {
              if (appState?.activeTool.type === "selection") return ["none-selection"];
              else return [selected];
            })()}
            mode="inline"
            items={items}
            onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
              setSelected(key);
              const keys = key.split("-").map((el) => el);
              selectedToolChanged?.(keys[keys.length - 1] as toolType, keys[0] as elementType);
            }}
          />
        </CustomSider>
      </div>
    </>
  );
};

export default Sidebar;
