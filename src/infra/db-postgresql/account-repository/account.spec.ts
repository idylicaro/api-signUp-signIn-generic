import knex from 'knex'
import mockdb from 'mock-knex'
// import { AccountPostgreRepository } from './account'
// import { AddAccountModel } from '../../../data/usecases/add-account/db-add-account-protocols'

const db = knex({ client: 'pg' })
const tracker = mockdb.getTracker()
describe('Account Postgres Repository', () => {
  beforeAll(() => {
    mockdb.mock(db)
  })
  afterAll(() => {
    mockdb.unmock(db)
  })
  beforeEach(() => {
    tracker.install()
  })
  afterEach(() => {
    tracker.uninstall()
  })

  // const makeSut = (): AccountPostgreRepository => {
  //   return new AccountPostgreRepository()
  // }
  // const makeFakeAccountData = (): AddAccountModel => ({
  //   name: 'any_name',
  //   phone: 'any_phone',
  //   email: 'any_email@mail.com',
  //   password: 'any_password'
  // })

  test('Should return an account on success', async () => {
    // const sut = makeSut()
    // tracker.on('query', function insertResult (query) {
    //   query.response([{ id: 1 }])
    // })
    // jest.spyOn(sut, 'add').mockImplementationOnce(async () => {
    //   const accountData = makeFakeAccountData()
    //   const [id] = db('accounts').insert({
    //     name: accountData.name,
    //     phone: accountData.phone,
    //     email: accountData.email,
    //     password: accountData.password
    //   }).returning('id')

    //   return Object.assign({}, { id }, accountData)
    // })
    // const account = await sut.add(makeFakeAccountData())

    // expect(account).toBeTruthy()
    // expect(account.id).toBeTruthy()
    // expect(account.name).toBe('any_name')
    // expect(account.email).toBe('any_email@mail.com')
    // expect(account.password).toBe('any_password')
  })
})
