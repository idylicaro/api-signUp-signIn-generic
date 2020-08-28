import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  // Criar a tabela
  return await knex.schema.createTable('confirmations', table => {
    table.increments('id').primary()
    table.string('id_user').notNullable().unique()
    table.string('token')
    table.string('date_expire')
  })
}
export async function down (knex: Knex): Promise<void> {
  // UNDO
  return await knex.schema.dropTable('confirmations')
}
