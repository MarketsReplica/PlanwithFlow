// general configuration constant for the app

const boolFromEnv = (v, def = false) => {
  if (typeof v !== "string") return def;
  return ["1", "true", "yes", "on"].includes(v.toLowerCase());
};

const config = {
  // base URLs (override via env for self-hosting)
  templateServer: process.env.REACT_APP_TEMPLATE_BASE || "https://storage.googleapis.com/planwithflow-templates/",
  llmAPI: process.env.REACT_APP_LLM_API_BASE || "https://us-central1-flow-b60e6.cloudfunctions.net",

  // feature flags
  enableFirebase: boolFromEnv(process.env.REACT_APP_ENABLE_FIREBASE, false),
  enableAnalytics: boolFromEnv(process.env.REACT_APP_ENABLE_ANALYTICS, false),

  // projection controls
  projectionLength: 15,
  minimumCreditCardPrincipalPaymentPercentage: 0,
  minimumCash: 500,
  inflationIntervals: [
    [0, 24],
    [25, 40],
    [41, 15 * 12 - 1],
  ],
  inflationValues: [6, 4, 2],
};

export default config;
