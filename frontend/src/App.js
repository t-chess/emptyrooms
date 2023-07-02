import { BrowserRouter } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./LoginRegister/AuthProvider.js";
import Pages from "./Pages.js";

export default function App() {
  // units
  const setUnits = () => {
    let vh = window.innerHeight * 0.01;
    let tileSize = window.innerWidth / 20;
    // todo min a max value of tileSize for big screens and mobiles
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--tiun", `${tileSize}px`);
  };
  setUnits();
  window.addEventListener("resize", setUnits);
  //

  return (
    <BrowserRouter>
      <AuthProvider>
        <Pages />
      </AuthProvider>
    </BrowserRouter>
  );
}
