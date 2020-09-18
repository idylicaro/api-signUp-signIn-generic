import { AccountConfirmationController } from './account-confirmaton-controller'
import { badRequest, ok } from '../../helpers/http/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { AccountVerify } from '../../../domain/usecases/verify-account'
import { HttpRequest } from '../../protocols/http'
import { InvalidError, ServerError } from '../../errors'
import { Validation } from '../../protocols/validation'

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    query: {
      id: 'valid_id'
    }
  }
}

const makeAccountConfirmation = (): AccountVerify => {
  class AccountConfirmationStub implements AccountVerify {
    async confirm (id: string): Promise<Boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new AccountConfirmationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AccountConfirmationController
  accountConfirmationStub: AccountVerify
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const accountConfirmationStub = makeAccountConfirmation()
  const validationStub = makeValidation()
  const sut = new AccountConfirmationController(accountConfirmationStub, validationStub)
  return {
    sut,
    accountConfirmationStub,
    validationStub
  }
}

describe('Account Confirmation Controller', () => {
  test('Should calls AccountVerify with correct values', async () => {
    const { sut, accountConfirmationStub } = makeSut()
    const confirm = jest.spyOn(accountConfirmationStub, 'confirm')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(confirm).toHaveBeenCalledWith(httpRequest.query.id)
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

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.query)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
