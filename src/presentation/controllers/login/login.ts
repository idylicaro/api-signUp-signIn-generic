import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../erros'
import { EmailValidator } from '../../protocols/email-validator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) { return await new Promise(resolve => resolve(badRequest(new MissingParamError('email')))) }
    if (!httpRequest.body.password) { return await new Promise(resolve => resolve(badRequest(new MissingParamError('password')))) }

    const isValidMail = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValidMail) { return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email')))) }
  }
}