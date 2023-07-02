import React, { useEffect, useState } from "react";

export default function RoomTile({ x, y, myCoordinates }) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (myCoordinates.x === x && myCoordinates.y === y) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  return <div className={`${isActive ? "active" : ""} room__grid__tile`}></div>;
}
