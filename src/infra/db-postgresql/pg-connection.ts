import knex from 'knex'
import connectionConfig from './config'

export const connection = knex({
  client: 'pg',
  connection: {
    host: connectionConfig.host,
    user: connectionConfig.user,
    password: connectionConfig.password,
    database: connectionConfig.database
  }
})
