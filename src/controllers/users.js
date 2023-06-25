import crypto from "node:crypto";
import { db } from "../database.js";

export default {
  createUser: async (username, password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
    const token = crypto.randomBytes(16).toString("hex");

    const [user] = await db("users")
      .insert({ username, salt, hash, token })
      .returning("*");

    return user;
  },
  getUserByPassword: async (username, password) => {
    const user = await db("users").where({ username }).first();
    if (!user) return null;

    // todo add lastlogin

    const hash = crypto
      .pbkdf2Sync(password, user.salt, 100000, 64, "sha512")
      .toString("hex");
    if (hash !== user.hash) return null;

    return user;
  },
  getUserByToken: async (token) => {
    const user = await db("users").where({ token }).first();

    return user;
  },
  getUserByUsername: async (username) => {
    const user = await db("users").where({ username }).first();

    return user;
  },
};
