import { DbAccountConfirmation } from './db-account-confirmation'
import { LoadAccountConfirmationByIdRepository, LoadAccountByIdRepository } from './db-account-confirmation-protocols'
import { AccountModel } from '../../../domain/models/account'
import { AccountConfirmationModel } from '../../../domain/models/account-confirmation-model'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  phone: 'valid_phone',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
  isConfirmed: false
})

const makeFakeAccountConfirmation = (): AccountConfirmationModel => ({
  id: 'valid_id',
  id_user: 'valid_id_user',
  token: 'valid_token',
  date_expire: new Date().toString()
})

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeLoadAccountConfirmationByIdRepository = (): LoadAccountConfirmationByIdRepository => {
  class LoadAccountConfirmationByIdRepositoryStub implements LoadAccountConfirmationByIdRepository {
    async loadById (id: string): Promise<AccountConfirmationModel> {
      return await new Promise(resolve => resolve(makeFakeAccountConfirmation()))
    }
  }
  return new LoadAccountConfirmationByIdRepositoryStub()
}

interface SutTypes {
  sut: DbAccountConfirmation
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  loadAccountConfirmationByIdRepositoryStub: LoadAccountConfirmationByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const loadAccountConfirmationByIdRepositoryStub = makeLoadAccountConfirmationByIdRepository()
  const sut = new DbAccountConfirmation(loadAccountByIdRepositoryStub, loadAccountConfirmationByIdRepositoryStub)
  return {
    sut,
    loadAccountByIdRepositoryStub,
    loadAccountConfirmationByIdRepositoryStub
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

  test('Should calls LoadAccountConfirmationByIdRepository with correct value ', async () => {
    const { sut, loadAccountConfirmationByIdRepositoryStub } = makeSut()
    const spyLoadById = jest.spyOn(loadAccountConfirmationByIdRepositoryStub, 'loadById')
    await sut.confirm('any_id', 'any_token')
    expect(spyLoadById).toHaveBeenCalledWith('any_id')
  })

  test('Should return false if LoadAccountConfirmationByIdRepository return null ', async () => {
    const { sut, loadAccountConfirmationByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountConfirmationByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const confirmation = await sut.confirm('invalid_id', 'any_token')
    expect(confirmation).toBe(false)
  })
})
