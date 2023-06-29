import express from "express";
import users from "../controllers/users.js";
import loadUser from "../middleware/loadUser.js";

const router = express.Router();

// endpoints
router.get("/usernameAvailable/:username", async (req, res) => {
  const user = await users.getUserByUsername(req.params["username"]);
  if (user) {
    res.json({ success: false });
  } else {
    res.json({ success: true });
  }
});
router.post("/register", async (req, res) => {
  const token = await users.createUser({
    username: req.body.username,
    password: req.body.password,
  });
  if (token) {
    res.cookie("token", token);
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Username already taken" });
  }
});
router.post("/login", async (req, res) => {
  const user = await users.getUserByPassword({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    res.cookie("token", user.token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.json({ success: true, user: { id: user.id, username: user.username } });
  } else {
    res.json({ success: false, message: "Bad credentials" });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});
router.get("/checkAuth", async (req, res) => {
  if (req.cookies.token) {
    const user = await users.getUserByToken(req.cookies.token);
    if (user) {
      res.json({ success: true });
    } else {
      res.clearCookie("token");
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});

export default router;
