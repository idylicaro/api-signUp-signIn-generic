import { AccountConfirmationController } from './account-confirmaton-controller'
import { badRequest, ok } from '../../helpers/http/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { AccountVerify } from '../../../domain/usecases/verify-account'
import { HttpRequest } from '../../protocols/http'
import { InvalidError, ServerError } from '../../errors'

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    query: {
      id: 'valid_id',
      token: 'valid_token'
    }
  }
}

const makeAccountConfirmation = (): AccountVerify => {
  class AccountConfirmationStub implements AccountVerify {
    async confirm (id: string, token: string): Promise<Boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new AccountConfirmationStub()
}

interface SutTypes {
  sut: AccountConfirmationController
  accountConfirmationStub: AccountVerify
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

  test('Should calls AccountVerify with correct values', async () => {
    const { sut, accountConfirmationStub } = makeSut()
    const confirm = jest.spyOn(accountConfirmationStub, 'confirm')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(confirm).toHaveBeenCalledWith(httpRequest.query.id, httpRequest.query.token)
  })

  test('Should return 400 if AccountVerify fails', async () => {
    const { sut, accountConfirmationStub } = makeSut()
    jest.spyOn(accountConfirmationStub, 'confirm').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidError()))
  })

  test('Should return 200 if succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok({ Message: 'Confirmation Accepted' }))
  })

  test('Should return 500 if AccountConfirmation throws', async () => {
    const { sut, accountConfirmationStub } = makeSut()
    jest.spyOn(accountConfirmationStub, 'confirm').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })
})
