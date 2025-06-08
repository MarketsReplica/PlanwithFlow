import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { metadata } from "@/types/metadata.type";

export type flowData = {
  elements: ExcalidrawElement[];
  metaData: metadata;
}[];

export type futureWorld = {
  inflation: number[];
  incomeGrowth: number[];
  stockGrowth: number[];
  propertyGrowth: {
    propertyLocation: number;
    propertyType: "single-family" | "condo" | "townhouse" | "apartment" | "land";
    propertyGrowth: number[];
  }[];
  interestRate: number[];
};

export type flowDataElementCustomType =
  | "none"
  | "cashbox"
  | "liability"
  | "assets-cash"
  | "assets-stock"
  | "assets-real-estate"
  | "assets-real-assets"
  | "income"
  | "expense"
  | "government";
