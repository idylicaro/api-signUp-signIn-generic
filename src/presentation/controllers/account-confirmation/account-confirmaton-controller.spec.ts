import { AccountConfirmationController } from './account-confirmaton-controller'
import { badRequest } from '../../helpers/http/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { AccountConfirmation } from '../../../domain/usecases/account-confirmation'

const makeAccountConfirmation = (): AccountConfirmation => {
  class AccountConfirmationStub implements AccountConfirmation {
    async confirm (id: string, token: string): Promise<Boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new AccountConfirmationStub()
}

interface SutTypes {
  sut: AccountConfirmationController
  accountConfirmationStub: AccountConfirmation
}

const makeSut = (): SutTypes => {
  const accountConfirmationStub = makeAccountConfirmation()
  const sut = new AccountConfirmationController(accountConfirmationStub)
  return {
    sut,
    accountConfirmationStub
  }
}

describe('Account Confirmation Controller', () => {
  test('Should return 400 with MissingParamError if the id are not passed', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        token: 'any_token'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 400 with MissingParamError if the token are not passed', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('token')))
  })

  test('Should calls AccountConfirmation with correct values', async () => {
    const { sut, accountConfirmationStub } = makeSut()
    const confirm = jest.spyOn(accountConfirmationStub, 'confirm')
    const httpRequest = {
      query: {
        id: 'any_id',
        token: 'any_token'
      }
    }
    await sut.handle(httpRequest)
    expect(confirm).toHaveBeenCalledWith(httpRequest.query.id, httpRequest.query.token)
  })
})
