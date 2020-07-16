import { HttpResponse, HttpRequest, Controller, EmailValidator, PhoneValidator } from './signup-protocols'
import { ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly phoneValidator: EmailValidator
  constructor (emailValidator: EmailValidator, phoneValidator: PhoneValidator) {
    this.emailValidator = emailValidator
    this.phoneValidator = phoneValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'phone', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return await new Promise(resolve => resolve({
          statusCode: 400,
          body: httpRequest.body
        }))
      }
    }
    const { email, phone, password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) {
      return await new Promise(resolve => resolve({
        statusCode: 400,
        body: httpRequest.body
      }))
    }
    if (!this.emailValidator.isValid(email)) {
      return await new Promise(resolve => resolve({
        statusCode: 400,
        body: httpRequest.body
      }))
    }
    if (!this.phoneValidator.isValid(phone)) {
      return await new Promise(resolve => resolve({
        statusCode: 400,
        body: httpRequest.body
      }))
    }
    return ok(httpRequest.body)
  }
}
