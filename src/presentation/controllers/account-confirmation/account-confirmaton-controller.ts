import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http/http-helper'
import { MissingParamError } from '../../errors'

export class AccountConfirmationController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.query.id) {
      return badRequest(new MissingParamError('id'))
    }
    if (!httpRequest.query.token) {
      return badRequest(new MissingParamError('token'))
    }
    return await new Promise(resolve => resolve(null))
  }
}
