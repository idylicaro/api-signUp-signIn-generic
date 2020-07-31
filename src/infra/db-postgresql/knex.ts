import Knex from 'knex'
const environment = process.env.NODE_ENV || 'development'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: Knex.Config = require('../../../knexfile')[environment]

export default Knex(config)
