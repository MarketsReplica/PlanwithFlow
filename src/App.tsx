import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import React from "react";
import MainPage from "@/pages/MainPage";
import { hotjar } from "react-hotjar";
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  hotjar.initialize(3373795, 6);
  if (hotjar.initialized()) {
    hotjar.event("app-loaded");
  }
  if (process.env.NODE_ENV === "production") {
    console.log = function () { };
  }
  return (
    <>
      <GoogleOAuthProvider clientId="850297259628-jv0lb75dkjqa9hn2b31862tolasopton.apps.googleusercontent.com">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
            },
          }}
        >
          <Button />
        </ConfigProvider>
        <Routes>
          <Route path="/">
            <Route path="/" element={<MainPage />} />
            <Route path="/:url" element={<MainPage />} />
          </Route>
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
