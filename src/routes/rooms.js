import express from "express";
import rooms from "../controllers/rooms.js";
import loadUser from "../middleware/loadUser.js";
import loadRoom from "../middleware/loadRoom.js";
import requiresAuth from "../middleware/requiresAuth.js";

const router = express.Router();

router.get("/rooms", requiresAuth, loadRoom, async (req, res) => {
  res.render("rooms", { user: res.locals.user, room: res.locals.room });
});

export default router;
