import users from "../controllers/users.js";
import skins from "../controllers/skins.js";

export default async (req, res, next) => {
  res.locals.skins = await skins.getUserSkin();
  next();
};
