import users from "../controllers/users.js";
export default async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    let user = await users.getUserByToken(token);
    if (user) {
      return next();
    }
  }
  res.status(401).json({ success: false, message: "Unauthorized" });
  res.end();
};
