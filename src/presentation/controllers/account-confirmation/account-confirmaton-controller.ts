import { Controller, HttpRequest, HttpResponse, AccountVerify, Validation } from './account-confirmaton-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { InvalidError } from '../../errors'

export class AccountConfirmationController implements Controller {
  constructor (
    private readonly accountConfirmation: AccountVerify,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.query)
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.query
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
