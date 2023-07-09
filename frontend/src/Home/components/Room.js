import React, { useContext, useEffect } from "react";
import RoomGrid from "./room/RoomGrid";
import Spinner from "../../utils/Spinner";
import { AuthContext } from "../../LoginRegister/AuthProvider.js";
import { RoomContext } from "../utils/RoomProvider.js";

export default function Room() {
  const { userData } = useContext(AuthContext);
  const { roomData, myCoordinates, goToRoom, updateUsers, socket } =
    useContext(RoomContext);

  // sockets
  useEffect(() => {
    goToRoom(null, (myData) => {
      socket.emit("joinedRoom", myData);
    });
  }, []);
  socket.on("shareData", (data) => {
    updateUsers(data.user);
    socket.emit("shareResponse", {
      socket: data.id,
      data: { user: userData, coordinates: myCoordinates },
    });
  });
  socket.on("receiveShareResponse", (data) => {
    updateUsers(data);
  });
  socket.on("receiveUpdate", (data) => {
    updateUsers(data);
  });
  return <div className='room'>{roomData ? <RoomGrid /> : <Spinner />}</div>;
}
