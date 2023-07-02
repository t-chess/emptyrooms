import axios from "axios";
import React, { useEffect, useState } from "react";
import RoomGrid from "./room/RoomGrid";

export default function Room() {
  const [activeRoom, setActiveRoom] = useState(1);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    goToRoom();
  }, [activeRoom]);

  const goToRoom = () => {
    axios.get("/getRoom/" + activeRoom).then((response) => {
      if (response.data.success) {
        setRoomData(response.data.room);
      } else {
        console.log(response.data.message);
      }
    });
  };
  return (
    <>
      {roomData ? (
        <RoomGrid gridWidth={roomData.width} gridHeight={roomData.height} />
      ) : (
        <div>no data</div>
      )}
    </>
  );
}
