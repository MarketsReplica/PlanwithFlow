import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import en_US from "antd/locale/en_US";
import ConfigProvider from "antd/es/config-provider";
import Layout from "antd/es/layout";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}

root.render(
  // <React.StrictMode>
  <ConfigProvider locale={en_US} direction="ltr">
    <RecoilRoot>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </RecoilRoot>
  </ConfigProvider>
  // </React.StrictMode>
);
