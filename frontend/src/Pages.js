import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./LoginRegister/AuthProvider.js";
import Home from "./Home/Home.js";
import Welcome from "./LoginRegister/Welcome.js";
import Me from "./Profile/Me.js";

export default function Pages() {
  const { isLoggedIn } = useContext(AuthContext);
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
      <Route
        path='/me'
        element={isLoggedIn ? <Me /> : <Navigate to='/welcome' replace />}
      />
    </Routes>
  );
}
