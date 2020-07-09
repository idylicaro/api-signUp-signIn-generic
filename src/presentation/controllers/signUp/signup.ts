import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
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
    return ok(httpRequest.body)
  }
}
