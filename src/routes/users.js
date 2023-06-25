import express from "express";
import users from "../controllers/users.js";
import loadUser from "../middleware/loadUser.js";

const router = express.Router();
// views
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// endpoints
router.post("/register", async (req, res) => {
  const user = await users.createUser(req.body.username, req.body.password);
  res.cookie("token", user.token);
  res.redirect("/");
});
router.post("/login", async (req, res) => {
  const user = await users.getUserByPassword(
    req.body.username,
    req.body.password
  );
  if (user) {
    res.cookie("token", user.token);
    loadUser(req, res, () => {
      res.redirect("/rooms");
    });
  } else {
    res.redirect("/");
  }
});

export default router;
