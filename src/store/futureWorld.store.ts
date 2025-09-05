import { atom } from "recoil";
import { futureWorldType } from "@/types/futureWorld.type";
import configs from "@/appConfig";

function generateYearMonthArray(today: Date, yearsInFuture: number): string[] {
  let year = today.getFullYear();
  let month = today.getMonth();
  const endYear = year + yearsInFuture;

  const yearMonthArray: string[] = [];

  for (let y = year; y <= endYear; y++) {
    let endMonth = y === endYear ? month : 11;
    for (let m = y === year ? month : 0; m <= endMonth; m++) {
      // Pad the month string with a leading zero if it's less than 10
      const monthString = (m + 1).toString().padStart(2, "0");
      yearMonthArray.push(`${y}-${monthString}`);
    }
  }

  return yearMonthArray;
}

export const futureWorld = atom<futureWorldType>({
  key: "futureWorld",
  default: {
    date: generateYearMonthArray(new Date(), configs.projectionLength),
    inflation: new Array(15 * 12).fill(0.03),
    incomeGrowth: new Array(15 * 12).fill(0.03),
    stockGrowth: new Array(15 * 12).fill(0.05),
    propertyGrowth: [
      {
        propertyLocation: 1, // zip code
        propertyType: "single-family", // "single-family" | "condo" | "townhouse" | "apartment" | "land";
        propertyGrowth: new Array(15 * 12).fill(0.03),
      },
    ],
    interestRate: new Array(15 * 12).fill(0.04),
  },
});
