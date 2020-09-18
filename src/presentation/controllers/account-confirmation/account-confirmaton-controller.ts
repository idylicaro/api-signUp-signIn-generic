import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { MissingParamError, InvalidError } from '../../errors'
import { AccountVerify } from '../../../domain/usecases/verify-account'
import { Validation } from '../../protocols/validation'

export class AccountConfirmationController implements Controller {
  constructor (
    private readonly accountConfirmation: AccountVerify,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.query)
      const { id } = httpRequest.query
      if (!id) {
        return badRequest(new MissingParamError('id'))
      }
      const isConfirmated = await this.accountConfirmation.confirm(id)
      if (!isConfirmated) {
        return badRequest(new InvalidError())
      }
      return ok({ Message: 'Confirmation Accepted' })
    } catch (error) {
      return serverError(error)
    }
  }
}
