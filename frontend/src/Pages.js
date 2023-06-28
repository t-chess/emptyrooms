import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./LoginRegister/AuthProvider.js";
import Home from "./Home/Home.js";
import Welcome from "./LoginRegister/Welcome.js";

export default function Pages() {
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <Routes>
      <Route
        path='/welcome'
        element={isLoggedIn ? <Navigate to='/' replace /> : <Welcome />}
      />
      <Route
        path='/'
        element={isLoggedIn ? <Home /> : <Navigate to='/welcome' replace />}
      />
    </Routes>
  );
}
