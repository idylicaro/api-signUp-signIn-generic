import { DbAccountConfirmation } from './db-account-confirmation'
import { LoadAccountConfirmationByUserIdRepository, LoadAccountByIdRepository, ConfirmAccountByIdRepository, DeleteAccountConfirmationByUserIdRepository } from './db-account-confirmation-protocols'
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

const makeFakeAccountConfirmation = (): AccountConfirmationModel => {
  const date = new Date()
  return ({
    id: 'valid_id',
    id_user: 'valid_id_user',
    token: 'valid_token',
    date_expire: `${date.getDate()}-${(date.getMonth() + 1)}-${(date.getFullYear() + 1)}`
  })
}

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (id: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeLoadAccountConfirmationByIdRepository = (): LoadAccountConfirmationByUserIdRepository => {
  class LoadAccountConfirmationByUserIdRepositoryStub implements LoadAccountConfirmationByUserIdRepository {
    async loadById (id: string): Promise<AccountConfirmationModel> {
      return await new Promise(resolve => resolve(makeFakeAccountConfirmation()))
    }
  }
  return new LoadAccountConfirmationByUserIdRepositoryStub()
}

const makeDeleteAccountConfirmationByIdRepository = (): DeleteAccountConfirmationByUserIdRepository => {
  class DeleteAccountConfirmationByUserIdRepositoryStub implements DeleteAccountConfirmationByUserIdRepository {
    async deleteById (id: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new DeleteAccountConfirmationByUserIdRepositoryStub()
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
  loadAccountConfirmationByUserIdRepositoryStub: LoadAccountConfirmationByUserIdRepository
  confirmAccountByIdRepositoryStub: ConfirmAccountByIdRepository
  deleteAccountConfirmationByUserIdRepositoryStub: DeleteAccountConfirmationByUserIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const loadAccountConfirmationByUserIdRepositoryStub = makeLoadAccountConfirmationByIdRepository()
  const confirmAccountByIdRepositoryStub = makeConfirmAccountByIdRepository()
  const deleteAccountConfirmationByUserIdRepositoryStub = makeDeleteAccountConfirmationByIdRepository()
  const sut = new DbAccountConfirmation(loadAccountByIdRepositoryStub, loadAccountConfirmationByUserIdRepositoryStub, confirmAccountByIdRepositoryStub, deleteAccountConfirmationByUserIdRepositoryStub)
  return {
    sut,
    loadAccountByIdRepositoryStub,
    loadAccountConfirmationByUserIdRepositoryStub,
    confirmAccountByIdRepositoryStub,
    deleteAccountConfirmationByUserIdRepositoryStub
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

  test('Should calls LoadAccountConfirmationByUserIdRepository with correct value ', async () => {
    const { sut, loadAccountConfirmationByUserIdRepositoryStub } = makeSut()
    const spyLoadById = jest.spyOn(loadAccountConfirmationByUserIdRepositoryStub, 'loadById')
    await sut.confirm('any_id', 'any_token')
    expect(spyLoadById).toHaveBeenCalledWith('any_id')
  })

  test('Should return false if LoadAccountConfirmationByUserIdRepository return null ', async () => {
    const { sut, loadAccountConfirmationByUserIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountConfirmationByUserIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const confirmation = await sut.confirm('invalid_id', 'any_token')
    expect(confirmation).toBe(false)
  })

  test('Should return false if AccountConfirmation has expired ', async () => {
    const date = new Date()
    const { sut, loadAccountConfirmationByUserIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountConfirmationByUserIdRepositoryStub, 'loadById').mockImplementationOnce(async () => {
      return {
        id: 'any_id',
        id_user: 'any_id_user',
        token: 'any_token',
        date_expire: `${date.getDate()}-${(date.getMonth())}-${date.getFullYear()}`
      }
    })
    const confirmation = await sut.confirm('any_id_user', 'any_token')
    expect(confirmation).toBe(false)
  })

  test('Should calls ConfirmAccountByIdRepository with correct value ', async () => {
    const { sut, confirmAccountByIdRepositoryStub } = makeSut()
    const spyConfirmAccount = jest.spyOn(confirmAccountByIdRepositoryStub, 'confirmAccount')
    await sut.confirm('any_id', 'any_token')
    expect(spyConfirmAccount).toHaveBeenCalledWith('any_id')
  })

  test('Should calls DeleteAccountConfirmationByUserIdRepository with correct value ', async () => {
    const { sut, deleteAccountConfirmationByUserIdRepositoryStub } = makeSut()
    const spyDeleteById = jest.spyOn(deleteAccountConfirmationByUserIdRepositoryStub, 'deleteById')
    await sut.confirm('any_id', 'any_token')
    expect(spyDeleteById).toHaveBeenCalledWith('any_id')
  })
})
