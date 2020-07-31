import * as path from 'path'
import connectionConfig from './src/infra/db-postgresql/config'

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'test',
      password: 'test',
      database: 'testDb',
      port: 5432
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'infra', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'infra', 'seeds')
    }
  },
  development: {
    client: 'pg',
    connection: connectionConfig,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'infra', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'infra', 'seeds')
    }
  }
}
