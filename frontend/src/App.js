import React, { useEffect } from "react";
import io from "socket.io-client";
import "./styles/main.scss";

const App = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("Socket connected");
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div className='App'>ahoj</div>;
};

export default App;
