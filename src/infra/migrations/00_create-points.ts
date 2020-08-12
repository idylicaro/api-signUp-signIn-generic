import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  // Criar a tabela
  return await knex.schema.createTable('accounts', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('phone').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('accessToken')
  })
}
export async function down (knex: Knex): Promise<void> {
  // UNDO
  return await knex.schema.dropTable('accounts')
}
