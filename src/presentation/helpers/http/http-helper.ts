import { HttpResponse } from '../../protocols/http'
import { ServerError, UnauthorizedError } from '../../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
