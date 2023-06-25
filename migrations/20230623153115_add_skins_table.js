/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable("skins", (table) => {
    table.increments("id");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
    table.string("color").notNullable().defaultTo("#0047AB");
    table.boolean("active").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable("skins");
};
