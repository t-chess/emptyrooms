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

    socket.on("login", (user) => {
      socket.join("lobby");
      // console.log(` ${socket.id} just logged in`);
      socket.to("lobby").emit("shareDataLogin", { id: socket.id, user: user });
    });
    socket.on("loginResponse", (data) => {
      data.data.id = socket.id;
      io.to(data.socket).emit("receiveLoginResponse", data.data);
    });
    socket.on("messageSent", (data) => {
      io.to(data.room).emit("newMessage", data);
    });
    socket.volatile.on("shareUpdate", (data) => {
      socket.to(data.room).emit("receiveUpdate", data.data);
    });
  });
};
