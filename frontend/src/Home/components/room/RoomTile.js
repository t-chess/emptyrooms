import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../utils/RoomProvider";
import Avatar from "../Avatar";

export default function RoomTile({ x, y }) {
  const [isActive, setIsActive] = useState(false);
  const [usersOnTile, setUsersOnTile] = useState([]);

  const { myCoordinates, usersInRoom } = useContext(RoomContext);
  useEffect(() => {
    if (myCoordinates.x === x && myCoordinates.y === y) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [JSON.stringify(myCoordinates), x, y]);

  useEffect(() => {
    let onTile = usersInRoom.filter(function (u) {
      return u.coordinates.x === x && u.coordinates.y === y;
    });
    if (onTile.length > 0) {
      console.log(usersInRoom, onTile);
    }
    setUsersOnTile([...usersOnTile, ...onTile]);
  }, [JSON.stringify(usersInRoom), x, y]);

  return (
    <div className={`${isActive ? "active" : ""} room__grid__tile`}>
      {isActive && <Avatar />}
    </div>
  );
}
