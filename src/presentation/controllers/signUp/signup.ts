import { HttpResponse, HttpRequest, Controller, PhoneValidator, AddAccount, Validation } from './signup-protocols'
import { InvalidParamError } from '../../erros'
import { ok, serverError, badRequest } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly phoneValidator: PhoneValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  constructor (phoneValidator: PhoneValidator, addAccount: AddAccount, validation: Validation) {
    this.phoneValidator = phoneValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, phone, password } = httpRequest.body
      if (!this.phoneValidator.isValid(phone)) {
        return badRequest(new InvalidParamError('phone'))
      }
      const account = await this.addAccount.add({
        name,
        phone,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
