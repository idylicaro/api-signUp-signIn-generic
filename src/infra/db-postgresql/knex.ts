import Knex from 'knex'
const environment = process.env.NODE_ENV || 'development'
const config: Knex.Config = import('../../../knexfile')[environment]

export default Knex(config)
