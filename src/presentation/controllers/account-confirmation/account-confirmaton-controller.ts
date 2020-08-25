import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http/http-helper'
import { MissingParamError } from '../../errors'
import { AccountConfirmation } from '../../../domain/usecases/account-confirmation'

export class AccountConfirmationController implements Controller {
  constructor (private readonly accountConfirmation: AccountConfirmation) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id, token } = httpRequest.query
    if (!id) {
      return badRequest(new MissingParamError('id'))
    }
    if (!token) {
      return badRequest(new MissingParamError('token'))
    }
    await this.accountConfirmation.confirm(id, token)
    return await new Promise(resolve => resolve(null))
  }
}
