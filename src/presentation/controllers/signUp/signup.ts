import { HttpResponse, HttpRequest, Controller, EmailValidator, PhoneValidator } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../erros'
import { ok, serverError, badRequest } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly phoneValidator: EmailValidator
  constructor (emailValidator: EmailValidator, phoneValidator: PhoneValidator) {
    this.emailValidator = emailValidator
    this.phoneValidator = phoneValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'phone', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, phone, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
      if (!this.phoneValidator.isValid(phone)) {
        return badRequest(new InvalidParamError('phone'))
      }
      return ok(httpRequest.body)
    } catch (error) {
      return serverError(error)
    }
  }
}
