import users from "../controllers/users.js";

export default async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    res.locals.user = await users.getUserByToken(token);
  } else {
    res.locals.user = null;
  }

  next();
};
