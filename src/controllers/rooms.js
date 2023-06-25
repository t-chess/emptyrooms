import { db } from "../database.js";

export default {
  getRoomById: async (id) => {
    const room = await db("rooms").where({ id }).first();
    if (!room) return null;
    return room;
  },
};
