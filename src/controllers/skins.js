import { db } from "../database.js";
import users from "./users.js";

export default {
  getUserSkin: async (username) => {
    const user = await db("users").where({ username }).first().column("id");
    const skins = await db("skins").where("user_id", user);

    return skins;
  },
};
