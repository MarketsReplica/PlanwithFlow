import { cloneObject } from "@/helper/object.helper";
import { useEffect, } from "react";
import { useRecoilState } from "recoil";
import { updateTheWholeDataWithFinData } from "@/store/flowData.store";
import _, { find } from "lodash";
import { calculateLoanProperties } from "./supporting_functions.js";
import configs from "@/appConfig.js";

const minimumCash = configs.minimumCash;
const minimumCreditCardPrincipalPaymentPercentage = configs.minimumCreditCardPrincipalPaymentPercentage;

// number of months for projection
const projectionLength = configs.projectionLength * 12;
// main function to calculate the updates to finData
export const calculateFinModel = (flowData, setFlowData, appState, flag, setFlag, futureState) => {

  console.log("finModel is starting with flag: ", flag)
  if (flag === "none") return;
  // extract finData from the flowData so that we can update the values with the financial model, later we will update the flowData with the updated finData
  const prevFinData = flowData.map((data) => data.metaData.finData);
  const finData = cloneObject(prevFinData);

  // check if the flowData and finData have the same length
  for (let n = 0; n < flowData.length; n++) {
    if (finData[n]?.length !== flowData[n]?.elements.length) {
      console.log(
        "Error: ",
        "The length of the flowData and finData are not the same.",
        "n: ",
        n,
        "finData[n]: ",
        finData[n],
        "flowData[n].elements ",
        flowData[n]?.elements
      );
      return;
    }
  }


  // REGION STEP 1: loop over the finData elements in flowData and update values based on the futureState this also includes the deleted elements as we will only consider undeleted elements in the cash flow projection ultimately.
  for (let n = 1; n < projectionLength; n++) {
    // loop over the elements in finData and update the expense elements to grow with inflation
    for (let i = 0; i < finData[n].length; i++) {
      //check if the element is an expense and if the previous month it exists
      if (finData[n][i].type === "expense" && finData[n - 1][i]) {
        finData[n][i].data.value = parseFloat(Number(finData[n - 1][i].data.value * (1 + futureState.inflation[n] / 12)).toFixed(2));
      }
    }
  }
  // loop over the elements in finData and update the income elements to grow with income growth
  for (let n = 1; n < projectionLength; n++) {
    for (let i = 0; i < finData[n].length; i++) {
      if (finData[n][i].type === "income" && finData[n - 1][i]) {
        finData[n][i].data.value = parseFloat(Number(finData[n - 1][i].data.value * (1 + futureState.incomeGrowth[n] / 12)).toFixed(2));
      }
    }
  }
  // loop over the elements in finData and update the asset elements to grow with asset growth
  for (let n = 1; n < projectionLength; n++) {
    for (let i = 0; i < finData[n].length; i++) {
      if (finData[n][i].type === "assetSecurities" && finData[n - 1][i]) {
        finData[n][i].data.value = parseFloat(Number(finData[n - 1][i].data.value * (1 + futureState.stockGrowth[n] / 12)).toFixed(2));
      }
    }
  }
  // update real-assets with inflation
  for (let n = 1; n < projectionLength; n++) {
    for (let i = 0; i < finData[n].length; i++) {
      if (finData[n][i].type === "asset-real" && finData[n - 1][i]) {
        finData[n][i].data.value = parseFloat(Number(finData[n - 1][i].data.value * (1 + futureState.inflation[n] / 12)).toFixed(2));
      }
    }
  }
  // update growth of property
  for (let n = 1; n < projectionLength; n++) {
    for (let i = 0; i < finData[n].length; i++) {
      if (finData[n][i].type === "assetRealEstate" && finData[n - 1][i]) {
        // find location of the propety and associated propertyGrowth rate
        const propertyLocation = finData[n][i].data.location;
        const propertyType = finData[n][i].data.propertyType;
        for (let pi = 0; pi < futureState.propertyGrowth.length; pi++) {
          if (futureState.propertyGrowth[pi].propertyLocation === propertyLocation) {
            finData[n][i].data.value = parseFloat(Number(finData[n - 1][i].data.value * (1 + futureState.propertyGrowth[pi].propertyGrowth[n] / 12)).toFixed(2));
          }
        }
      }
    }
  }
  // REGION STEP 2: update monthlyPayment value for the liability elements to reflect on the menu item
  for (let n = 0; n < projectionLength; n++) {
    for (let i = 0; i < finData[n].length; i++) {
      if (finData[n][i].type === "liability") {
        // find the monthly payment
        if (finData[n][i].data.type === "mortgage" || finData[n][i].data.type === "auto-loan") {
          let LoanObject = calculateLoanProperties(finData[n][i].data.value, finData[n][i].data.interestRate, finData[n][i].data.amortization * 12, null);
          finData[n][i].data.repaymentValue = LoanObject.monthlyPayment;
          // update the value of the liability
          // we do not update the value since we assume they put the liability on hold and do not pay it off if it is not connected to any cashbox
        }
        if (finData[n][i].data.type === "credit-card" || finData[n][i].data.type === "personal-loan") {
          finData[n][i].data.repaymentValue = parseFloat(Number(finData[n][i].data.value * finData[n][i].data.interestRate / 100 / 12 + finData[n][i].data.value * minimumCreditCardPrincipalPaymentPercentage / 100).toFixed(2));
        }
      }
    }
  }

  // REGION STEP 3: update conected arrows values based on the transaction values given in the connected income or expense object
  for (let n = 0; n < flowData.length; n++) {
    for (let i = 0; i < flowData[n].elements.length; i++) {
      if (flowData[n].elements[i].type === "arrow") {
        let startBindingfinIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].startBinding?.elementId);
        let endBindingfinIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].endBinding?.elementId);
        let transactionfinIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].id);
        // check if the arrow is connected to an income or expense element and set its transaction value to the value of the connected element
        if (startBindingfinIndex > -1 && endBindingfinIndex > -1 && finData[n][transactionfinIndex].data?.manualEntry === false) {
          // arrow take the value from income element at startBinding
          if (finData[n][startBindingfinIndex].type === "income") {
            finData[n][transactionfinIndex].data.value = finData[n][startBindingfinIndex].data.value;
          } else if (finData[n][startBindingfinIndex].type === "expense") {
            console.log(
              "ChatMessage: ",
              "You can not recieve money from a source of expense! Connect the arrow to a different element such as a current cash account."
            );
          } else if (finData[n][endBindingfinIndex].type === "income") {
            console.log(
              "ChatMessage: ",
              "You can not send money to your source of income! Connect the arrow to a different element such as a current cash account."
            );
            // arrow take value from expense element at endBinding
          } else if (finData[n][endBindingfinIndex].type === "expense") {
            finData[n][transactionfinIndex].data.value = finData[n][endBindingfinIndex].data.value;
            // arrow take value from assetSecurities element at startBinding
          } else if (finData[n][startBindingfinIndex].type === "assetSecurities") {
            finData[n][transactionfinIndex].data.value = finData[n][startBindingfinIndex].data.contribution;
            // arrow take value from assetSecurities element at endBinding
          } else if (finData[n][endBindingfinIndex].type === "assetSecurities") {
            finData[n][transactionfinIndex].data.value = finData[n][endBindingfinIndex].data.contribution;
            // arrow take value from assetRealAssets element at startBinding
          } else if (finData[n][startBindingfinIndex].type === "assetRealAssets") {
            finData[n][transactionfinIndex].data.value = finData[n][startBindingfinIndex].data.value;
            // arrow take value from assetRealAssets element at endBinding
          } else if (finData[n][endBindingfinIndex].type === "assetRealAssets") {
            // transactions shoul be always entered for the first time the asset is added.
            if (finData[n - 1]) {
              if (finData[n - 1][endBindingfinIndex]) {
                // do nothing
              } else {
                finData[n][transactionfinIndex].data.value = finData[n][endBindingfinIndex].data.value;
              }
            }
            // arrow takes value from liability element if it is connected to the endBinding (loan is being repaid)
          } else if (finData[n][endBindingfinIndex].type === "liability") {
            finData[n][transactionfinIndex].data.value = finData[n][endBindingfinIndex].data.repaymentValue;
          }
          // arrow takes value from cash needed to cover the month expenses if we are taking money from credit card or personal loan
          // this will be calculated inside the cashflow loop below
          // but check if the liability types of credit card or personal loan is connected to the startBinding
          else if (finData[n][startBindingfinIndex].type === "liability") {
            if (finData[n][startBindingfinIndex].data.type !== "credit-card" || finData[n][startBindingfinIndex].data.type !== "personal-loan") {
              console.log("ChatMessage: ", "You can only take money from a revolving credit card or personal loan line of credit. Mortgages or auto loans only added one time at the time of the asset purchase.")
            }
          }
        }
      }
    }
  }
  // REGION STEP 4: Loop over all months and update the cash flow whatever cash is left add it to the next month current account
  for (let n = 0; n < projectionLength - 1; n++) {
    // for the month n;
    // simulate the cash flow given the income and expense objects
    // for each type == cashbox element, loop over the connected income and expense objects and calculate monthly addition to the cash
    for (let cAi = 0; cAi < finData[n].length; cAi++) {
      if (finData[n][cAi].type === "cashbox") {
        //find id of the cashbox element
        const cashBoxID = finData[n][cAi].id;
        const cashBoxIndex = flowData[n].elements.findIndex((x) => x.id === cashBoxID);

        // find connected arrows to the this cashbox element cAi
        if (flowData[n].elements[cashBoxIndex].boundElements) {
          const connectedElements = flowData[n].elements[cashBoxIndex].boundElements.map((x) => x.id);
          // loop over all objects and find current values of money inflow and outflow from this cAi box
          let currentIncome = 0;
          let currentExpense = 0;
          let currentAssetPurchase = 0;
          for (let i = 0; i < flowData[n].elements.length; i++) {
            if (flowData[n].elements[i].boundElements) {
              let connectedArrowId = flowData[n].elements[i].boundElements.find((x) => x.type === "arrow")?.id;
              let connectedArrow = flowData[n].elements.find((el) => el.id === connectedArrowId);
              let connectedTransaction = finData[n].find((el) => el.id === connectedArrowId);
              if (connectedElements.includes(connectedArrowId)) {
                // now the flowData[n].elements[i] is connected to the cashbox element cAi
                if (finData[n].find((el) => el.id === flowData[n].elements[i].id).type === "income" && flowData[n].elements[i].isDeleted != true) {
                  // n is timestep, i is the index of the income object on FlowData.elements, cAi is the index of the cashbox object on finData, need to calculate index of the income object on finData
                  let incomeIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].id);
                  if (finData[n][incomeIndex].data.period === "Monthly") {
                    currentIncome += finData[n][incomeIndex].data.value;
                  } else if (finData[n][incomeIndex].data.period === "Annually") {
                    currentIncome += parseFloat(Number(finData[n][incomeIndex].data.value / 12).toFixed(2));
                  }
                }
                if (finData[n].find((el) => el.id === flowData[n].elements[i].id).type === "expense" && flowData[n].elements[i].isDeleted != true) {
                  let expenseIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].id);
                  if (finData[n][expenseIndex].data.period === "Monthly") {
                    currentExpense += finData[n][expenseIndex].data.value;
                  } else if (finData[n][expenseIndex].data.period === "Annually") {
                    currentExpense += parseFloat(Number(finData[n][expenseIndex].data.value / 12).toFixed(2));
                  }
                }
                //see if liabilities impact the cash flow
                if (finData[n].find((el) => el.id === flowData[n].elements[i].id).type === "liability" && flowData[n].elements[i].isDeleted !== true) {
                  let liabilityIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].id);
                  // Type 1 : loan is a mortgage or auto-loan and user has to the pay monthly payment specified in the LoanObject.
                  if (finData[n][liabilityIndex].data.type === "mortgage" || finData[n][liabilityIndex].data.type === "auto-loan") {
                    // User is paying debt: Money goes to the liability if the arrow is pointing to the liability
                    if (connectedArrow.startBinding?.elementId === flowData[n].elements[cAi].id) {
                      let LoanObject = calculateLoanProperties(
                        finData[n][liabilityIndex].data.value,
                        finData[n][liabilityIndex].data.interestRate,
                        finData[n][liabilityIndex].data.amortization * 12,
                        null
                      );
                      // update properties of the loan object
                      finData[n][liabilityIndex].data.repaymentValue = parseFloat(Number(LoanObject.monthlyPayment).toFixed(2));
                      // TODO: Correct bug to get payment value from the arrow if its manual.
                      finData[n + 1][liabilityIndex].data.value = finData[n][liabilityIndex].data.value - LoanObject.principalPayment;
                      if (finData[n + 1][liabilityIndex].data.value < 0) {
                        finData[n + 1][liabilityIndex].data.value = 0;
                      }
                      // since they are paying off the loan, the term is decreasing by 1 month
                      finData[n + 1][liabilityIndex].data.amortization = finData[n][liabilityIndex].data.amortization - 1 / 12;
                      if (finData[n + 1][liabilityIndex].data.amortization < 0) {
                        finData[n + 1][liabilityIndex].data.amortization = 0;
                      }
                      // record the expense
                      currentExpense += finData[n][liabilityIndex].data.repaymentValue;
                    }
                  }
                  // Type 2: loan is not secured and has flexible payment. The monthly payment will come from the transaction arrow 
                  if (finData[n][liabilityIndex].data.type === "credit-card" || finData[n][liabilityIndex].data.type === "personal-loan") {
                    // User is paying debt: Money goes to the liability if the arrow is pointing to the liability
                    if (connectedArrow.startBinding?.elementId === flowData[n].elements[cAi].id) {
                      const connectedTransaction = finData[n].find((el) => el.id === connectedArrowId)
                      // loan value decreases by (value of transaction - monthly interest rate charge)
                      finData[n + 1][liabilityIndex].data.value = finData[n][liabilityIndex].data.value - (connectedTransaction?.data.value - parseFloat(Number(finData[n][i].data.value * finData[n][i].data.interestRate / 100 / 12).toFixed(2)));
                      // record the expense

                      if (finData[n + 1][liabilityIndex].data.value < 0) {
                        currentExpense += connectedTransaction?.data.value + finData[n + 1][liabilityIndex].data.value
                        finData[n + 1][liabilityIndex].data.value = 0;

                      } else {
                        currentExpense += connectedTransaction.data.value;
                      }
                    }
                  }
                }
                // see if an asset transaction has been made
                const assetTypes = ["assetRealAssets", "assetRealEstate"];
                let asset = finData[n].find((el) => el.id === flowData[n].elements[i].id);
                if (assetTypes.includes(asset.type) && flowData[n].elements[i].isDeleted !== true) {
                  let assetIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].id);
                  // check direction of the transaction arrow
                  if (connectedArrow.endBinding.elementId === cashBoxID) {
                    // SALE of Assets: arrow is towards the cash box and the asset transaction is a sale
                    currentAssetPurchase += -finData[n].find((el) => el.id === connectedArrowId).data.value;
                    let assetNextValue = finData[n][assetIndex].data.value - finData[n].find((el) => el.id === connectedArrowId).data.value;
                    // the last transaction for sale of assets.
                    if (assetNextValue < 0) {
                      assetNextValue = 0;
                      currentAssetPurchase += -finData[n][assetIndex].data.value
                      // TODO: asset box should be deleted for future time stamps
                    }
                    if (finData[n + 1][assetIndex]) finData[n + 1][assetIndex].data.value = assetNextValue;

                  } else if (connectedArrow.startBinding.elementId === cashBoxID) {
                    // PURCHASE of Assets: arrow is towards the asset and the asset transaction is a purchase;
                    // type 1: asset purchase is one time
                    if (connectedTransaction.data.type === "one-time") {
                      currentAssetPurchase += connectedTransaction.data.value;
                      // only update the value of the asset if its not a real estate or a car
                      if (asset.type !== "assetRealEstate" && asset.data.type !== "car" && asset.data.type !== "collectible") {
                        finData[n + 1][assetIndex].data.value = finData[n][assetIndex].data.value + connectedTransaction.data.value;
                      }
                    } else if (connectedTransaction.data.type === "regular") {
                      currentAssetPurchase += connectedTransaction.data.value;
                      finData[n + 1][assetIndex].data.value = finData[n][assetIndex].data.value + connectedTransaction.data.value;
                    }
                  }
                }
              }
            }
          }

          // loop over all object and find burrowing needs or savings opportunities
          let currentBorrowing = 0;
          let currentSavings = 0;
          let totalCashAvailableAfterOperating = finData[n][cAi].data.value + currentIncome - currentExpense - currentAssetPurchase;
          for (let i = 0; i < flowData[n].elements.length; i++) {
            if (flowData[n].elements[i].boundElements) {
              let connectedArrowId = flowData[n].elements[i].boundElements.find((x) => x.type === "arrow")?.id;
              let connectedArrow = flowData[n].elements.find((el) => el.id === connectedArrowId);
              if (connectedElements.includes(connectedArrowId)) {
                // now the flowData[n].elements[i] is connected to the cashbox element cAi
                if (finData[n].find((el) => el.id === flowData[n].elements[i].id).type === "liability" && flowData[n].elements[i].isDeleted != true) {
                  let liabilityIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].id);
                  // 2- User is borrowing money: Money comes from the liability if the arrow is pointing to the cashbox
                  if (connectedArrow.endBinding?.elementId === flowData[n].elements[cAi].id) {
                    // borrowing happens if the available cash is less than the minimum cash, if not do not borrow hence currentBorrowing = 0 from the initialization
                    if (totalCashAvailableAfterOperating < minimumCash)
                      currentBorrowing += minimumCash - totalCashAvailableAfterOperating;
                    // 2-1 You can only borrow if the credit card or personal loan is not maxed out. If it is maxed out, borrow whatever you can to max it
                    if (finData[n][liabilityIndex].data.value + currentBorrowing > finData[n][liabilityIndex].data.maxValue) {
                      currentBorrowing = finData[n][liabilityIndex].data.maxValue - finData[n][liabilityIndex].data.value;
                      finData[n + 1][liabilityIndex].data.value = finData[n][liabilityIndex].data.value + currentBorrowing;
                    } else { // 2-2 If the credit card or personal loan is not maxed out, then borrow the amount that is needed to reach the minimum cash
                      // update the liability value
                      finData[n + 1][liabilityIndex].data.value = finData[n][liabilityIndex].data.value + currentBorrowing;
                      // even if we borrow we still need to pay minimum repayment for the credit card
                      //finData[n+1][liabilityIndex].data.repaymentValue = calculateLoanProperties()
                      currentExpense += finData[n][liabilityIndex].data.repaymentValue;
                    }
                    // update the value of the transaction arrow
                    finData[n].find((el) => el.id === connectedArrowId).data.value = currentBorrowing
                  }
                }
                //see how much savings can be made and calculate the savings
                if (finData[n].find((el) => el.id === flowData[n].elements[i].id).type === "assetSecurities" && flowData[n].elements[i].isDeleted != true) {
                  let assetIndex = finData[n].findIndex((el) => el.id === flowData[n].elements[i].id);
                  // if any money left in the cashbox from last month, then add it to the savings at the begenning of next month
                  if (totalCashAvailableAfterOperating > minimumCash) {
                    if (totalCashAvailableAfterOperating > finData[n][assetIndex].data.maxContribution) {
                      currentSavings += finData[n][assetIndex].data.maxContribution;
                      finData[n + 1][assetIndex].data.value =
                        parseFloat(Number(finData[n][assetIndex].data.value +
                          finData[n][assetIndex].data.maxContribution +
                          finData[n][assetIndex].data.value * (futureState.stockGrowth[n] / 12)).toFixed(2));
                      totalCashAvailableAfterOperating -= finData[n][assetIndex].data.maxContribution;
                    } else {
                      currentSavings += totalCashAvailableAfterOperating;
                      finData[n + 1][assetIndex].data.value =
                        parseFloat(Number(finData[n][assetIndex].data.value +
                          totalCashAvailableAfterOperating +
                          finData[n][assetIndex].data.value * (futureState.stockGrowth[n] / 12)).toFixed(2));
                      totalCashAvailableAfterOperating = 0;
                    }
                  } else {
                    // if there is no money left in the cashbox, then just add the growth to the asset value
                    finData[n + 1][assetIndex].data.value =
                      parseFloat(Number(finData[n][assetIndex].data.value + finData[n][assetIndex].data.value * (futureState.stockGrowth[n] / 12)).toFixed(2));
                  }
                }
              }
            }
          }
          // ***
          // if currentIncome > currentExpense then the difference can be used for savings
          finData[n + 1][cAi].data.value = parseFloat(Number(finData[n][cAi].data.value + (currentIncome - currentExpense - currentSavings - currentAssetPurchase + currentBorrowing)).toFixed(2));
          // if cash reaches 0 make a message that says On year-month your cash is 0
          if (finData[n + 1][cAi].data.value <= minimumCash) {
            //   if (someflag !=="message sent"){
            //   console.log("chatMassage: ", "On ", flowData[n].metaData.year, "-", flowData[n].metaData.month, " you have only $", minimumCash, " cash left. You need to increase your income or decrease your expenses, sell an asset or add a loan.");
            // }
          }
        }
      } // end of cashbox cAi loop
    }
  }

  // STEP 5: calulate net worth
  //loop over elementsArray[n] and loop over all elements and if they are asset add the value to the net worth and if they are liabiulity subtract the value from the net worth
  for (let n = 0; n < projectionLength; n++) {
    let netWorth = 0;
    for (let i = 0; i < finData[n].length; i++) {
      //check flowData[n].elements. to see if the object is not deleted
      if (flowData[n].elements.find((el) => el.id === finData[n][i].id)?.isDeleted === false) {
        // if the element is an asset of the type  | "cashBox"  | "assetRealAssets"  | "assetsSecurities"  | "assetsRealEstate"
        if (
          finData[n][i].type === "cashbox" ||
          finData[n][i].type === "assetRealAssets" ||
          finData[n][i].type === "assetSecurities" ||
          finData[n][i].type === "assetRealEstate"
        ) {
          netWorth += finData[n][i].data.value;
        }
        // if the element is a liability
        if (finData[n][i].type === "liability") {
          netWorth -= finData[n][i].data.value;
        }
      }
    }
    finData[n].netWorth = netWorth;
  }
  // STEP 6: Set flowData with the updated finData 
  if (!_.isEqual(finData, prevFinData)) {
    const diffFinData = (compareJSON(finData, prevFinData))
    console.log("diffFinData is: ", diffFinData, " and comparison of its inside is: ", compareJSON(diffFinData.value1, diffFinData.value2))
    updateTheWholeDataWithFinData(flowData, setFlowData, finData, appState);
    setFlag("finModel");
    console.log("FinModel updated", flowData, appState, flag);
  } else {
    console.log("Financial model finished with no update.")
  }
};

function compareStrings(str1, str2) {
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      return str1.slice(i - 10, i + 20);
    }
  }
}
function compareJSON(obj1, obj2) {
  let keys = Object.keys(obj1);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (!_.isEqual(obj1[key], obj2[key])) {
      return { i: i, key: key, value1: obj1[key], value2: obj2[key] };
    }
  }
  // if objects are equal or only differ in keys
  if (Object.keys(obj1).length === Object.keys(obj2).length) {
    return null; // objects are equal
  } else {
    let extraKey = Object.keys(obj1).find(key => !(key in obj2));
    return { key2: extraKey, value1: obj1[extraKey], value2: undefined };
  }
}