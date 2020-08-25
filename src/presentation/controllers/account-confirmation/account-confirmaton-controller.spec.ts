import { AccountConfirmationController } from './account-confirmaton-controller'
import { badRequest } from '../../helpers/http/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
interface SutTypes {
  sut: AccountConfirmationController
}

const makeSut = (): SutTypes => {
  const sut = new AccountConfirmationController()
  return {
    sut
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
})
