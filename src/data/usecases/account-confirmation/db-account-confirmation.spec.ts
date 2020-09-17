import { DbAccountConfirmation } from './db-account-confirmation'
import { LoadAccountByIdRepository, ConfirmAccountByIdRepository } from './db-account-confirmation-protocols'
import { AccountModel } from '../../../domain/models/account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  phone: 'valid_phone',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
  isConfirmed: false
})

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeConfirmAccountByIdRepository = (): ConfirmAccountByIdRepository => {
  class ConfirmAccountByIdRepositoryStub implements ConfirmAccountByIdRepository {
    async confirmAccount (id: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new ConfirmAccountByIdRepositoryStub()
}

interface SutTypes {
  sut: DbAccountConfirmation
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  confirmAccountByIdRepositoryStub: ConfirmAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const confirmAccountByIdRepositoryStub = makeConfirmAccountByIdRepository()
  const sut = new DbAccountConfirmation(loadAccountByIdRepositoryStub, confirmAccountByIdRepositoryStub)
  return {
    sut,
    loadAccountByIdRepositoryStub,
    confirmAccountByIdRepositoryStub
  }
}

describe('DbAccountConfirmation', () => {
  test('Should calls LoadAccountByIdRepository with correct value ', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const spyLoadById = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.confirm('any_id')
    expect(spyLoadById).toHaveBeenCalledWith('any_id')
  })
  test('Should return false if LoadAccountByIdRepository return null ', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const confirmation = await sut.confirm('invalid_id')
    expect(confirmation).toBe(false)
  })

  test('Should calls ConfirmAccountByIdRepository with correct value ', async () => {
    const { sut, confirmAccountByIdRepositoryStub } = makeSut()
    const spyConfirmAccount = jest.spyOn(confirmAccountByIdRepositoryStub, 'confirmAccount')
    await sut.confirm('any_id')
    expect(spyConfirmAccount).toHaveBeenCalledWith('any_id')
  })
  test('Should return true if account is already confirmed', async () => {
    const { sut, loadAccountByIdRepositoryStub, confirmAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => {
      return await new Promise(resolve => resolve({
        id: 'valid_id',
        phone: 'valid_phone',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password',
        isConfirmed: true
      }))
    })
    const spyConfirmAccount = jest.spyOn(confirmAccountByIdRepositoryStub, 'confirmAccount')
    const confirmation = await sut.confirm('invalid_id')
    expect(confirmation).toBe(true)
    expect(spyConfirmAccount).not.toHaveBeenCalled()
  })
})
