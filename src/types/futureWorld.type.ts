export type futureWorldType = {
  date: string[];
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
