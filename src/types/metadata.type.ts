// TODO => handle the none element type in ui side.

export type elementType =
  | "cashbox"
  | "government"
  | "assetRealAssets"
  | "assetSecurities"
  | "assetRealEstate"
  | "expense"
  | "income"
  | "liability"
  | "transaction"
  | "none";

export type repaymentSchedule = "Monthly" | "Annually";
export type period = "Monthly" | "Annually" | "bi-weekly";

type baseType = {
  name?: string;
  value: number;
};

export type repayment = {
  repaymentValue: number;
  repaymentSchedule: repaymentSchedule;
  monthlyPayment: number;
};

export type cashbox = {
  type: "cash-deposit" | "savings-account" | "foreign-currency";
} & baseType;

export type transaction = {
  type: "regular" | "one-time";
  manualEntry: boolean;
} & baseType;

export type liability = {
  type: "mortgage" | "auto-loan" | "home-line-of-equity" | "student-loan" | "credit-card" | "personal-loan";
  interestRate: number;
  amortization: number;
  maxValue: number;
} & repayment &
  baseType;

export type income = {
  type: "employment-salary" | "side-hustle" | "gift-inheritance";
  period: period;
  taxable: boolean;
  currency?: "USD" | "CAD" | "EUR" | "GBP";
} & baseType;

export type expense = {
  type: "regular" | "one-time";

  period: period;
  deductable: boolean;
} & baseType;

export type assetsRealEstate = {
  type: "own" | "rental" | "commercial" | "raw-land";
  location: string | number | null;
  valueDate: string; // DATE SHOULD BE IN UTC
  propertyType: string;
} & baseType;

export type holding = {
  ticker: string;
  amount: number;
};
export type assetsSecurities = {
  type: "401-plan" | "roth-ira" | "traditional-ira" | "non-registered";
  holdings: holding[];
  contribution: number;
  maxContribution: number;
} & baseType;

export type assetRealAssets = {
  type: "car" | "crypto" | "gold" | "collectables" | "Cash Reserve";
  valueDate: string; // DATE SHOULD BE IN UTC
  contribution: number;
} & baseType;

export type government = {
  type: "gov";
  taxResidance: "country" | "state";
} & baseType;

export type fin = {
  id: string;
  type: elementType;
  data:
    | cashbox
    | liability
    | assetRealAssets
    | assetsRealEstate
    | assetsSecurities
    | income
    | expense
    | government
    | transaction;
};

export type finData = fin[];

export type metadata = {
  currentYear: boolean;
  month: number;
  year: number;
  finData: finData;
  netWorth: number;
};
