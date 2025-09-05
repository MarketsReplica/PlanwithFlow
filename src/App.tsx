import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import React from "react";
import MainPage from "@/pages/MainPage";
import { hotjar } from "react-hotjar";
import { GoogleOAuthProvider } from '@react-oauth/google'
import configs from "@/appConfig.js";

function App() {
  if (configs.enableAnalytics) {
    hotjar.initialize(3373795, 6);
    if (hotjar.initialized()) {
      hotjar.event("app-loaded");
    }
  }
  if (process.env.NODE_ENV === "production") {
    console.log = function () { };
  }
  const appRoutes = (
    <Routes>
      <Route path="/">
        <Route path="/" element={<MainPage />} />
        <Route path="/:url" element={<MainPage />} />
      </Route>
    </Routes>
  );

  if (configs.enableFirebase) {
    return (
      <>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
          <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
            <Button />
          </ConfigProvider>
          {appRoutes}
        </GoogleOAuthProvider>
      </>
    );
  }

  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
        <Button />
      </ConfigProvider>
      {appRoutes}
    </>
  );
}

export default App;
