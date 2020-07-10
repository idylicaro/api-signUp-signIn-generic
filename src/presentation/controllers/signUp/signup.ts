import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok } from '../../helpers/http-helper'
import { Validator } from '../../protocols/validator'

export class SignUpController implements Controller {
  private readonly validator: Validator
  constructor (validator: Validator) {
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return await new Promise(resolve => resolve({
          statusCode: 400,
          body: httpRequest.body
        }))
      }
    }
    const { email, password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) {
      return await new Promise(resolve => resolve({
        statusCode: 400,
        body: httpRequest.body
      }))
    }
    if (!this.validator.isValid(email)) {
      return await new Promise(resolve => resolve({
        statusCode: 400,
        body: httpRequest.body
      }))
    }
    return ok(httpRequest.body)
  }
}
