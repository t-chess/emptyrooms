import http from "http";
import express from "express";
import { Server } from "socket.io";
import setSockets from "./src/socket.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import "./src/database.js";

// // routes
import usersRouter from "./src/routes/users.js";
import roomsRouter from "./src/routes/rooms.js";

dotenv.config();

export const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

const port = process.env.PORT || 5000;

// app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(usersRouter);
app.use(roomsRouter);

setSockets(io);

server.listen(port);
server.on("listening", () => {
  // console.log(`Listening ${port}`);
});
