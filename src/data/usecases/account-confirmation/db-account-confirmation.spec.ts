import { DbAccountConfirmation } from './db-account-confirmation'
import { LoadAccountByIdRepository } from '../../protocols/db/account/load-account-by-id-repository'
import { AccountModel } from '../../../domain/models/account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  phone: 'valid_phone',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
  isConfirmed: false
})

const makeLoadAccountByEmailRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

interface SutTypes {
  sut: DbAccountConfirmation
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAccountConfirmation(loadAccountByIdRepositoryStub)
  return {
    sut,
    loadAccountByIdRepositoryStub
  }
}

describe('DbAccountConfirmation', () => {
  test('Should calls LoadAccountByIdRepository with correct value ', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const spyLoadById = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.confirm('any_id', 'any_token')
    expect(spyLoadById).toHaveBeenCalledWith('any_id')
  })

  test('Should return false if LoadAccountByIdRepository return null ', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const confirmation = await sut.confirm('invalid_id', 'any_token')
    expect(confirmation).toBe(false)
  })

  test('Should return false if Account is has confirmed', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => {
      return {
        id: 'any_id',
        name: 'any_name',
        phone: 'any_phone',
        email: 'any_email',
        password: 'any_password',
        isConfirmed: true
      }
    })
    const confirmation = await sut.confirm('any_id', 'any_token')
    expect(confirmation).toBe(false)
  })
})
