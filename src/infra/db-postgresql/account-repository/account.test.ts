import { AccountPostgreRepository } from './account'
import { AddAccountModel } from '../../../data/usecases/add-account/db-add-account-protocols'
import { GenericContainer } from 'testcontainers'

jest.setTimeout(20000)
let pgContainer
let knexTestSetup
describe('Account Postgres Repository', () => {
  beforeAll(async () => {
    pgContainer = await new GenericContainer('postgres')
      .withEnv('POSTGRES_USER', 'test')
      .withEnv('POSTGRES_PASSWORD', 'test')
      .withEnv('POSTGRES_DB', 'postgres')
      .withExposedPorts(5432)
      .start()
    process.env.PG_PORT = pgContainer.getMappedPort(5432)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const knexTestConfig = require('../../../../knexfile').test
    console.log('KNEXCONFIG', knexTestConfig)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    knexTestSetup = require('knex')(knexTestConfig)
    await knexTestSetup.migrate.latest()
  })

  afterAll(async () => {
    await pgContainer.stop()
  })

  const makeSut = (): AccountPostgreRepository => {
    return new AccountPostgreRepository()
  }
  const makeFakeAccountData = (): AddAccountModel => ({
    name: 'any_name',
    phone: 'any_phone',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccountData())

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
