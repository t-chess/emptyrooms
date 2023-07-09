export default (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnecting", () => {
      // let rooms = Object.keys(socket.rooms);

      // console.log(rooms);

      // rooms.forEach((room) => {
      //   socket.to(room).emit("userLeft", { id: socket.id });
      // });
      // console.log("user left with id", socket.id);
      socket.broadcast.emit("userLeft", { id: socket.id });
    });

    socket.on("joinedRoom", ({ user, room }) => {
      socket.join(room.name);
      console.log(` ${socket.id} just logged in`);
      socket.to(room.name).emit("shareData", { id: socket.id, user: user });
    });
    socket.on("shareResponse", (data) => {
      io.to(data.socket).emit("receiveShareResponse", data.data);
    });
    socket.on("messageSent", (data) => {
      io.to(data.room).emit("newMessage", data);
    });
    socket.volatile.on("shareUpdate", (data) => {
      socket.to(data.room).emit("receiveUpdate", data.data);
    });
  });
};
