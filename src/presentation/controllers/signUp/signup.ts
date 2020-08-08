import { HttpResponse, HttpRequest, Controller, EmailValidator, PhoneValidator, AddAccount, Validation } from './signup-protocols'
import { InvalidParamError } from '../../erros'
import { ok, serverError, badRequest } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly phoneValidator: PhoneValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  constructor (emailValidator: EmailValidator, phoneValidator: PhoneValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator
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
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
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
