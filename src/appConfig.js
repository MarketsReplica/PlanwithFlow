// general configuration consant for the app

export default {
  // the base url for the template server
  templateServer: "https://storage.googleapis.com/planwithflow-public/",
  // base url for ChatGPT Cloud Function APIs
  llmAPI: "https://us-central1-flow-b60e6.cloudfunctions.net",
  // projection length in years
  projectionLength: 15,
  minimumCreditCardPrincipalPaymentPercentage: 0,
  minimumCash: 500,
  inflationIntervals: [
    [0, 24],
    [25, 40],
    [41, 15 * 12 - 1],
  ],
  inflationValues: [6, 4, 2],
}