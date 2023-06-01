import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	await knex.schema.createTable("users", (table) => {
		table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
		table.string("avatar").defaultTo("").notNullable();
		table.string("first_name").notNullable();
		table.string("last_name").notNullable();
		table.string("username").unique().notNullable();
		table.string("email").unique().notNullable();
		table.string("password").notNullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("users");
}
