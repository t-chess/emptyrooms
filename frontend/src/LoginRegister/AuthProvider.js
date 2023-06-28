import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({ isLoggedIn: false });

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/checkAuth").then((response) => {
      if (response.data.success) {
        setIsLoggedIn(true);
        // navigate("/");
      } else {
        setIsLoggedIn(false);
        // navigate("/welcome");
      }
    });
  }, [navigate]);

  const login = ({ username, password }, callback) => {
    axios.post("/login", { username, password }).then((response) => {
      if (response.data.success) {
        setIsLoggedIn(true);
        console.log("hook ", isLoggedIn);
        navigate("/");
      } else {
        callback(response.data.message);
      }
    });
  };
  const register = ({ username, password }, callback) => {
    axios.post("/register", { username, password }).then((response) => {
      if (response.data.success) {
        login({ username, password });
      } else {
        callback(response.data.message);
      }
    });
  };

  const logout = () => {
    axios.post("/logout");
    navigate("/welcome");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
