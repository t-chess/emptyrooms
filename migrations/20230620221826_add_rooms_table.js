/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable("rooms", (table) => {
    table.increments("id");
    table.string("name").notNullable().unique();
    table.integer("capacity").notNullable().defaultTo(1);
  });
  // await knex("rooms").insert({ name: "lobby", capacity: 1000 });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable("rooms");
};
