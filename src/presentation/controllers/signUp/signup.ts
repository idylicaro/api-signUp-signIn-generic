import { HttpResponse, HttpRequest, Controller, EmailValidator, PhoneValidator } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../erros'
import { ok, serverError, badRequest } from '../../helpers/http-helper'
import { AddAccount } from '../../../domain/usecases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly phoneValidator: PhoneValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, phoneValidator: PhoneValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.phoneValidator = phoneValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'phone', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, phone, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
      if (!this.phoneValidator.isValid(phone)) {
        return badRequest(new InvalidParamError('phone'))
      }
      this.addAccount.add({
        name,
        phone,
        email,
        password
      })
      return ok(httpRequest.body)
    } catch (error) {
      return serverError(error)
    }
  }
}
