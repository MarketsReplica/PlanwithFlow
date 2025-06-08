import { atom } from "recoil";

export const messagesState = atom({
  key: "messageState",
  default: [
    {
      message: "Welcome to Flow! Please reach out to us at hi@PlanwithFlow.com.",
    },
  ],
});
