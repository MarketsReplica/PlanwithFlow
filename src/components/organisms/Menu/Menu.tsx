import { useEffect, useState } from "react";
import { getTargetElements } from "@/helper/excalidraw.helper";
import { excalidrawAppState } from "@/store/appState.store";
import { flowDataState, getCurrentYearData } from "@/store/flowData.store";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import { elementType } from "@/types/metadata.type";
import { updateFlagAtom } from "@/store/updateFlag.store";
import CashBoxMenu from "./CashboxMenu";
import DebtBoxMenu from "./DebtBoxMenu";
import IncomeMenu from "./IncomeMenu";
import ExpenseMenu from "./ExpenseMenu";
import TransactionMenu from "../../molecules/TransactionMenu";
import AssetsRealAssetsMenu from "./AssetsRealAssetsMenu";
import AssetsSecuritiesMenu from "./AssetsSecuritiesMenu";
import AssetsRealEstateMenu from "./AssetsRealEstateMenu";
import GovMenu from "./GovernmentMenu";
import styled from "styled-components";

const MenuContainer = styled.div`
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  overflow: hidden;
`;

const Menu = () => {
  const [appState] = useRecoilState(excalidrawAppState);
  const [flowData] = useRecoilState(flowDataState);

  let currentYearData = getCurrentYearData(flowData);

  const [selectedElement, setSelectedElement] =
    useState<ExcalidrawElement | null>(null);
  const [selectedElementType, setSelectedElementType] =
    useState<elementType>("none");

  const setFlag = useSetRecoilState(updateFlagAtom);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (
      appState &&
      getTargetElements(currentYearData?.elements, appState).length !== 0
    ) {
      setSelectedElement(
        getTargetElements(currentYearData?.elements, appState)[0]
      );

      currentYearData.metaData.finData?.forEach((el) => {
        if (
          el.id === selectedElement?.id &&
          Object.keys(appState.selectedElementIds).length !== 0
        ) {
          setSelectedElementType(el.type);
          setFlag("menu-done");
        }
      });

      currentYearData.metaData.finData?.forEach((el) => {
        if (
          el.id === selectedElement?.id &&
          Object.keys(appState.selectedElementIds).length === 0
        ) {
          setFlag("menu-done");
        }
      });
    } else {
      setSelectedElementType("none");
    }
  });

  return (
    <>
      <MenuContainer
        id="test"
        className="fixed top-[52px] left-1/2 w-screen -translate-x-1/2 z-10 lg:hidden block"
      >
        {selectedElementType === "cashbox" && <CashBoxMenu />}
        {selectedElementType === "liability" && <DebtBoxMenu />}
        {selectedElementType === "income" && <IncomeMenu />}
        {selectedElementType === "expense" && <ExpenseMenu />}
        {selectedElementType === "transaction" && <TransactionMenu />}
        {selectedElementType === "assetRealAssets" && <AssetsRealAssetsMenu />}
        {selectedElementType === "assetSecurities" && <AssetsSecuritiesMenu />}
        {selectedElementType === "assetRealEstate" && <AssetsRealEstateMenu />}
        {selectedElementType === "government" && <GovMenu />}
      </MenuContainer>

      <MenuContainer
        id="test"
        className="fixed top-20 left-1/2 -translate-x-1/2 z-10 lg:block hidden"
      >
        {selectedElementType === "cashbox" && <CashBoxMenu />}
        {selectedElementType === "liability" && <DebtBoxMenu />}
        {selectedElementType === "income" && <IncomeMenu />}
        {selectedElementType === "expense" && <ExpenseMenu />}
        {selectedElementType === "transaction" && <TransactionMenu />}
        {selectedElementType === "assetRealAssets" && <AssetsRealAssetsMenu />}
        {selectedElementType === "assetSecurities" && <AssetsSecuritiesMenu />}
        {selectedElementType === "assetRealEstate" && <AssetsRealEstateMenu />}
        {selectedElementType === "government" && <GovMenu />}
      </MenuContainer>
    </>
  );
};
export default Menu;
