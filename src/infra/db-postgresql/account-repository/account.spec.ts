import { AccountPostgreRepository } from './account'
import { AddAccountModel } from '../../../data/usecases/add-account/db-add-account-protocols'
import knexCleaner from 'knex-cleaner'
import knex from '../pg-connection'
describe('Account Postgres Repository', () => {
  afterAll(async (done) => {
    const options = {
      mode: 'delete', // Valid options 'truncate', 'delete'
      restartIdentity: true // Used to tell PostgresSQL to reset the ID counter
    }
    await knexCleaner.clean(knex, options)
    done()
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

  test('Should return an account on success', async (done) => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccountData())

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
    done()
  })
})
