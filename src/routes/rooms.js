import express from "express";
import rooms from "../controllers/rooms.js";
import requiresAuth from "../middleware/requiresAuth.js";

const router = express.Router();

router.get("/getRoom/:id", requiresAuth, async (req, res) => {
  const room = await rooms.getRoomById(req.params["id"]);
  if (room) {
    res.json({
      success: true,
      room,
    });
  } else {
    res.json({ success: false, message: "Room not found" });
  }
});

export default router;
