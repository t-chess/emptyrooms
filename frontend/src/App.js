import { BrowserRouter } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./LoginRegister/AuthProvider.js";
import Pages from "./Pages.js";

export default function App() {
  // vh
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  //

  return (
    <BrowserRouter>
      <AuthProvider>
        <Pages />
      </AuthProvider>
    </BrowserRouter>
  );
}
