import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  // Criar a tabela
  return await knex.schema.createTable('errors', table => {
    table.increments('id').primary()
    table.string('stack', 1000)
    table.string('date')
  })
}
export async function down (knex: Knex): Promise<void> {
  // UNDO
  return await knex.schema.dropTable('errors')
}
