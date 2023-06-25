import users from "../controllers/users.js";
import rooms from "../controllers/rooms.js";

export default async (req, res, next) => {
  res.locals.room = await rooms.getRoomById(1);
  next();
};
