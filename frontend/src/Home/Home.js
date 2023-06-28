import React from "react";
import io from "socket.io-client";

const Home = () => {
  // useEffect(() => {
  //   const socket = io("http://localhost:3000");
  //   socket.on("connect", () => {
  //     console.log("Socket connected");
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("Socket disconnected");
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  return <div>Home</div>;
};

export default Home;
