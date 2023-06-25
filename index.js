import http from "http";
import express from "express";
import { Server } from "socket.io";
import setSockets from "./src/socket.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import "./src/database.js";

// middlewares
import loadUser from "./src/middleware/loadUser.js";
// import requiresAuth from "./src/middleware/requiresAuth.js";

// // routes
import usersRouter from "./src/routes/users.js";
import roomsRouter from "./src/routes/rooms.js";

dotenv.config();

export const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3001" } });

const port = process.env.PORT || 3000;

// app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(loadUser);
app.use(usersRouter);
app.use(roomsRouter);

setSockets(io);

// app.get("/", loadUser, (req, res) => {
//   const user = res.locals.user;

//   if (user) {
//     res.redirect("/rooms");
//   } else {
//     res.render("index");
//   }
// });

server.listen(port);
server.on("listening", () => {
  // console.log(`Listening ${port}`);
});
