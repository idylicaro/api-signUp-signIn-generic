import * as path from 'path'
import connectionConfig from './src/infra/db-postgresql/config'

module.exports = {
  client: 'pg',
  connection: {
    host: connectionConfig.host,
    user: connectionConfig.user,
    password: connectionConfig.password,
    database: connectionConfig.database
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'infra', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'infra', 'seeds')
  }
}
