import knex from "knex";
import knexfile from "../knexfile.js";

let environment = "development";

if (process.env.NODE_ENV === "production") {
  environment = "production";
}

export const db = knex(knexfile[environment]);
