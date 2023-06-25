/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.alterTable("rooms", (table) => {
    table.integer("width").notNullable();
    table.integer("height").notNullable();
  });
  await knex("rooms").insert({
    name: "lobby",
    capacity: 1000,
    width: 800,
    height: 400,
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex("rooms").where("id", 1).del();
  await knex.schema.alterTable("rooms", (table) => {
    table.dropColumn("width");
    table.dropColumn("height");
  });
};
