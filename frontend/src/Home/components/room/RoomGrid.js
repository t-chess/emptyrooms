import React, { useEffect, useState } from "react";
import RoomTile from "./RoomTile";

export default function RoomGrid({ gridWidth, gridHeight }) {
  const [myCoordinates, setMyCoordinates] = useState({ x: 0, y: 0 });

  const handleKeyPress = (e) => {
    switch (e.keyCode) {
      case 38:
        //  up
        move("y", -1);
        break;
      case 40:
        // down
        move("y", 1);
        break;
      case 37:
        // left
        move("x", -1);
        break;
      case 39:
        // right
        move("x", 1);
        break;
    }
  };

  const move = (dir, change) => {
    let coords = myCoordinates;
    let maxNum = dir === "x" ? gridWidth : gridHeight;
    if (coords[dir] + change > -1 && coords[dir] + change < maxNum) {
      coords[dir] += change;
      setMyCoordinates((myCoordinates) => ({
        ...myCoordinates,
        ...coords,
      }));
      //   socket.emit('shareUpdate', {room: thisRoom, data:{username:thisUser, coordinates:myCoordinates}} )
    }
  };

  const createTiles = () => {
    let arr = [];
    let key = 0;
    for (let i = 0; i < gridHeight; i++) {
      arr.push([]);
      for (let j = 0; j < gridWidth; j++) {
        arr[i].push(
          <RoomTile x={j} y={i} key={key++} myCoordinates={myCoordinates} />
        );
      }
    }
    return arr;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
  return (
    <div className='room__grid'>
      {createTiles().map((row, index) => (
        <div className='room__grid__row' key={index}>
          {row}
        </div>
      ))}
    </div>
  );
}
