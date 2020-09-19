import Knex from 'knex'

export async function up (knex: Knex): Promise<void> {
  // Criar a tabela
  return await knex.schema.table('accounts', table => {
    table.boolean('is_confirmed').defaultTo(false)
  })
}
export async function down (knex: Knex): Promise<void> {
  // UNDO
  return await knex.schema.table('accounts', table => {
    table.dropColumn('is_confirmed')
  })
}
