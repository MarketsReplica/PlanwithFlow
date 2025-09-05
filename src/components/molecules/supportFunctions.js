import configs from "@/appConfig.js";
import { flow } from "lodash";
//-------------- function used in FutureState.tsx to add intervals
export function insertInterval(x, y) {
  // Push the new interval to the end of the array
  x.push(y);

  // Sort the intervals based on the start value
  x.sort((a, b) => a[0] - b[0]);

  // Initialize the merged intervals with the first interval
  let mergedIntervals = [x[0]];

  // Iterate over the intervals
  for (let i = 1; i < x.length; i++) {
    // Get the current interval and the last merged interval
    let currentInterval = x[i];
    let lastMergedInterval = mergedIntervals[mergedIntervals.length - 1];

    // If the current interval overlaps with the last merged interval,
    // merge them by updating the end value of the last merged interval
    if (currentInterval[0] <= lastMergedInterval[1]) {
      lastMergedInterval[1] = Math.max(
        currentInterval[1],
        lastMergedInterval[1]
      );
    }
    // Otherwise, add the current interval to the merged intervals
    else {
      mergedIntervals.push(currentInterval);
    }
  }

  return mergedIntervals;
}

//----------- function used in FutureState.tsx to create an array of months and years

// an array of months and integers starting from 0 to 179 and months repeating from current month to 2038
// Get the current date
//Construct a monthObjects array with the shape [{index: 0, month: "Jan", year: 2021}, {index: 1, month: "Feb", year: 2021},]
export function monthObjectsFunc(projectionLength) {
  const currentDate = new Date();

  // Create an empty array to hold the objects
  const monthObjects = [];
  // Set the start date to the current month
  let startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  // Loop through the next 15 years
  for (let i = 0; i < projectionLength * 12; i++) {
    // Get the month name
    let monthName = startDate.toLocaleString("default", { month: "short" });
    // Get the year
    const year = startDate.getFullYear();
    // Add the object to the array
    monthObjects.push({ index: i, month: monthName, year: year });
    // Move to the next month
    startDate.setMonth(startDate.getMonth() + 1);
  }
  return monthObjects;
}

//-------------- function used in FutureState.tsx to inflationDataSummary
// function to calculate the inflation data summary with the output of the shape
// [
//   "Mar 2023 - Jan 2025  :   6%",
//   "Jan 2025 - Jan 2028  :   3%",
//   "Jan 2028 - Jan 2031  :   2%",
// ]

export function ConstructInflationDataSummary(
  inflationIntervals,
  inflationValues,
  monthObjects
) {
  let inflationDataSummary = [];
  for (let i = 0; i < inflationIntervals.length; i++) {
    let inflationInterval = inflationIntervals[i];
    let inflationValue = inflationValues[i];
    let startMonth = monthObjects[inflationInterval[0]].month;
    let startYear = monthObjects[inflationInterval[0]].year;
    let endMonth = monthObjects[inflationInterval[1]].month;
    let endYear = monthObjects[inflationInterval[1]].year;
    let inflationData = `${startMonth} ${startYear} - ${endMonth} ${endYear}  :   ${inflationValue}%`;
    inflationDataSummary.push(inflationData);
  }
  return inflationDataSummary;
}

// functions to construct the extracted data from entity API to be used in the flowData

export async function sendEntityRequest(text) {
  const url = configs.llmAPI + "/entity_extractor";
  const data = {
    "text": text,
  };
  let extractedEntities = "";
  let jsonResponse = "";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    jsonResponse = await response.json();
    extractedEntities = jsonResponse; // response is a string and contains not well formed JSON string
    let fixedextractedEntities = extractedEntities.replace(
      /([\s\n]*)(\w+)(\s*):/g,
      '$1"$2"$3:'
    );
    fixedextractedEntities = fixedextractedEntities.replace(/^"|"$|'\\''|^\\'/g, ''); // remove quotes from the beginning and end of the string
    fixedextractedEntities = fixedextractedEntities.replace(/\n/g, '');

    extractedEntities = JSON.parse(fixedextractedEntities);
  } catch (error) {
    console.error("Error:", error);
  }
  return { extractedEntities: extractedEntities, jsonResponse: jsonResponse };
}


export async function sendFutureRequest(text) {

  // first we classify the text topic
  let url = configs.llmAPI + "/topic_classification";
  let data = {
    "text": text,
  };
  let topic = "";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    topic = JSON.parse(jsonResponse)['topic'];
  } catch (error) {
    console.error("Error:", error);
  }
  // depending on topic we call the appropriate future series API end points
  let endpoint = "";
  let arrayData = [];
  //remove the _ character from the topic to get to the endpoint
  endpoint = topic.replace(/_/g, "");

  url = configs.llmAPI + "/future_series/" + endpoint;
  data = {
    "text": text.replace(/\//g, ""),
    "projection_length": configs.projectionLength,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    arrayData = jsonResponse; // response is a string and contains not well formed JSON string

  } catch (error) {
    console.error("Error:", error);
  }
  return { topic: topic, array: arrayData };
}

export async function sendChatRequest(messages, chatModeIsAgent) {
  let url = "";
  if (chatModeIsAgent === true) {
    url = configs.llmAPI + "/chatcotapi";
  } else {
    url = configs.llmAPI + "/chat_api";
  }
  const data = {
    "messages": messages,
  };

  let jsonResponse = "";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    jsonResponse = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
  return jsonResponse;
}
// const extractedEntities = sendRequest();

// function for calculating financial summmaries for the chat information
export function calculateFinancialSummaries(flowData, futureState) {
  const financialSummaries = [];
  const finData = flowData.map((item) => item.metaData.finData)
  const projectionLength = configs.projectionLength * 12;
  // generate summary arrays
  const totalIncome = [];
  const totalExpenses = [];
  const totalDebtPayments = [];
  const totalAssets = [];
  const totalLiabilities = [];
  const totalCash = [];
  const assetTypes = ["cashbox", "assetRealAssets", "assetRealEstate", "assetSecurities"];
  for (let n = 0; n < projectionLength; n++) {
    totalIncome[n] = 0;
    totalExpenses[n] = 0;
    totalDebtPayments[n] = 0;
    totalAssets[n] = 0;
    totalLiabilities[n] = 0;
    totalCash[n] = 0;
    for (let i = 0; i < finData[n].length; i++) {
      //check flowData[n].elements. to see if the object is not deleted
      if (flowData[n].elements.find((el) => el.id === finData[n][i].id)?.isDeleted === false) {
        if (finData[n][i].type === "income") {
          totalIncome[n] += finData[n][i].data.value;
        }
        if (finData[n][i].type === "expense") {
          totalExpenses[n] += finData[n][i].data.value;
        }
        if (assetTypes.includes(finData[n][i].type)) {
          totalAssets[n] += finData[n][i].data.value;
        }
        if (finData[n][i].type === "liability") {
          totalLiabilities[n] += finData[n][i].data.value;
        }
        if (finData[n][i].type === "cashbox") {
          totalCash[n] += finData[n][i].data.value;
        }
      }
    }
    // calculate debt payments
    for (let i = 0; i < finData[n].length; i++) {
      // find cashbox element
      if (finData[n][i].type === "cashbox") {
        // find flow data element that has the same id as the cashbox element
        const flowDataCashBox = flowData[n].elements.find((el) => el.id === finData[n][i].id);
        //find arrows that are connected to cashbox element and are not deleted
        const arrows = flowData[n].elements.filter((el) => el.type === "arrow" && el?.startBinding.elementId === flowDataCashBox.id && el.isDeleted === false)
        // among the arrows elements find the ones that are connected to liability elements
        const arrowsToLiabilities = arrows.filter((arrow) => {
          if (arrow.endBinding) {
            const endElement = flowData[n].elements.find((el) => el.id === arrow.endBinding.elementId);
            const endfinDataElement = finData[n].find((el) => el.id === endElement.id);
            return endfinDataElement.type === "liability";
          }
        });

        // sum the values of transaction values of the arrows from finData
        arrowsToLiabilities.forEach((arrow) => {
          const liabilityArrow = finData[n].find((el) => el.id === arrow.id);
          totalDebtPayments[n] += liabilityArrow.data.value;
        });
      }
    }
  }
  // generate summary strings
  financialSummaries.push("Today date is: " + new Date().toLocaleDateString());
  financialSummaries.push("Cash flow summary:");
  financialSummaries.push("Current monthly income in the year " + flowData[0].metaData.year + " is $" + totalIncome[0]);
  financialSummaries.push("Future monthly income considering income growth in a year, $" + flowData[12].metaData.year + " is $" + totalIncome[12]);
  financialSummaries.push("Future monthly income in 5 years (" + flowData[12 * 5].metaData.year + "), considering income growth of " + futureState.incomeGrowth[0] + " per year is $" + totalIncome[12 * 5]);

  financialSummaries.push("Current monthly expenses in the year " + flowData[0].metaData.year + " is $" + totalExpenses[0]);
  financialSummaries.push("Future expenses considering inflation in a year, " + flowData[12].metaData.year + " is " + totalExpenses[12]);
  financialSummaries.push("Future monthly expenses in 5 years (" + flowData[12 * 5].metaData.year + "), considering inflation of " + futureState.inflation[0] + " per year is $" + totalExpenses[12 * 5]);
  financialSummaries.push("Current monthly debt payments per month in the year " + flowData[0].metaData.year + " is $" + totalDebtPayments[0]);
  financialSummaries.push("Future debt payments per month in a year, " + flowData[12].metaData.year + " is $" + totalDebtPayments[12]);
  financialSummaries.push("Future monthly debt payments in 5 years (" + flowData[12 * 5].metaData.year + "), considering debt payments is $" + totalDebtPayments[12 * 5]);

  financialSummaries.push("Balance sheet summary:")
  financialSummaries.push("Current assets in the year " + flowData[0].metaData.year + " is $" + totalAssets[0]);
  financialSummaries.push("Future assets considering asset growth in a year, " + flowData[12].metaData.year + " is $" + totalAssets[12]);
  financialSummaries.push("Future assets in 5 years (" + flowData[12 * 5].metaData.year + "), considering asset growth is $" + totalAssets[12 * 5]);

  financialSummaries.push("Current liabilities in the year " + flowData[0].metaData.year + " is $" + totalLiabilities[0]);
  financialSummaries.push("Future liabilities considering debt payments in a year, " + flowData[12].metaData.year + "  amounts to $" + totalLiabilities[12]);
  financialSummaries.push("Future liabilities in 5 years (" + flowData[12 * 5].metaData.year + "), considering debt payments is $" + totalLiabilities[12 * 5]);

  financialSummaries.push("Current available cash in the year " + flowData[0].metaData.year + " is $" + totalCash[0]);
  financialSummaries.push("Future available cash considering cash flow in a year, " + flowData[12].metaData.year + " is $" + totalCash[12]);
  financialSummaries.push("Future available cash in 5 years (" + flowData[12 * 5].metaData.year + "), considering cash flow is $" + totalCash[12 * 5]);

  return financialSummaries.join("\n");
}

// Chain of Thought with tools functions
//recieved field_name and shortened finData to obtain a particual financial value
// requestJson = {"field_name": "income", "finData": finData}
//jsonResponse = {"field_name": "income", "value": 10000.00}
export async function sendExtractFinData(requestJson) {
  const url = configs.llmAPI + "/extfindata";
  let jsonResponse = "";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestJson),
      redirect: 'follow',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    jsonResponse = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
  return { jsonResponse };
}

// functionProcedures that handel get_financial_data and build_financial_model
export async function toolProcedures(chatResponse, flowData) {
  let toolResponse = "";
  // STEP 1. Defining some axillary functions
  // handelling existance of get_financial_data
  console.log("Tools are called with string", chatResponse);
  function extractParams(inputString) {
    // Regular Expression pattern to match get_financial_data parameters
    let patternGetData = /get_financial_data\("([^"]*)",\s*"([^"]*)"\)/g;
    let patternBuildModel = /CALL build_financial_model\(([\s\S]*?)\)/g;
    let matchesBuildModel = [...inputString.matchAll(patternBuildModel)];
    let matchesGetData = [...inputString.matchAll(patternGetData)];
    // If matches are found, return the parameters, else return null.
    if (matchesGetData.length > 0) {
      return {
        datamatch: matchesGetData.map(match => ({
          param1: match[1],
          param2: match[2]
        }))
      };
    } else if (matchesBuildModel.length > 0) {
      let modelJSONStr = matchesBuildModel.map(match => match[1].trim());
      modelJSONStr = modelJSONStr[0].replace(/\r?\n|\r/g, '');
      return {
        model: modelJSONStr
      }
    } else {
      return undefined;
    }
  }
  // function to prepare findData to be sent to getfindata API
  function preparefinData(flowData, date) {
    // extract the date that matches date
    // extract month and year from date string like "2023-06"
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    const index = flowData.findIndex((el) => el.metaData.month == month && el.metaData.year == year);
    let finDataMonth = flowData[index].metaData.finData;
    // remove elements in finData with types ==="none"
    finDataMonth = finDataMonth.filter((el) => el.type !== "none");
    return JSON.stringify(finDataMonth);
  }
  // STEP 2. Function Logic
  const extractedParameters = extractParams(chatResponse);
  console.log("extractedParameters", extractedParameters);

  if (extractedParameters) {
    if (extractedParameters?.model) {
      toolResponse = JSON.stringify(extractedParameters);
    } else if (extractedParameters?.datamatch) {
      for (let i = 0; i < extractedParameters.datamatch.length; i++) {
        const field_name = extractedParameters.datamatch[i].param1;
        const date = extractedParameters.datamatch[i].param2;

        const financialData = preparefinData(flowData, date);
        const finValues = await sendExtractFinData({ "financial_parameter": field_name, "findata": financialData });
        toolResponse = toolResponse + "\n" + JSON.stringify(finValues?.jsonResponse);
      }
    }
  }
  return toolResponse;
}

