import React, { useEffect } from "react";
import io from "socket.io-client";
import Controls from "./components/Controls";

export default function Home() {
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
  return (
    <div>
      <Controls /> Home
    </div>
  );
}
