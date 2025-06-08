import { atom } from "recoil";

export const showMenuState = atom({
  key: "showMenuState",
  default: true,
});


export const showExcMenuProperties = atom({ 
  key: "showExcMenuProperties", 
  default: false
})


export const isSidebarCollapsed = atom({ 
  key: "isSidebarCollapsed",
  default: false
})