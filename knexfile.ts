// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'test',
      password: 'test',
      database: 'testDb',
      port: process.env.PG_PORT
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
    connection: {
      host: 'localhost',
      user: 'admin',
      password: 'admin',
      database: 'genericSign'
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'infra', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'infra', 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'infra', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'infra', 'seeds')
    }
  }
}
