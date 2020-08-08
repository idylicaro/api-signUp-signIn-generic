
import { SignUpController } from './signup'
import { HttpRequest, EmailValidator, PhoneValidator, AddAccount, AccountModel, AddAccountModel, Validation } from './signup-protocols'
import { ServerError, InvalidParamError, MissingParamError } from '../../erros'
import { badRequest } from '../../helpers/http-helper'
const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    phone: 'any_phonenumber',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makePhoneValidator = (): PhoneValidator => {
  // factory
  class PhoneValidatorStub implements PhoneValidator {
    // mock  type stub
    isValid (phone: string): boolean {
      return true
    }
  }
  return new PhoneValidatorStub()
}

const makeEmailValidator = (): EmailValidator => {
  // factory
  class EmailValidatorStub implements EmailValidator {
    // mock  type stub
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  phone: 'valid_phone',
  email: 'valid_email',
  password: 'valid_password'
})

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  phoneValidatorStub: PhoneValidator
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const phoneValidatorStub = makePhoneValidator()
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(emailValidatorStub, phoneValidatorStub, addAccountStub, validationStub)
  return {
    sut,
    emailValidatorStub,
    phoneValidatorStub,
    addAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if email is not valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        phone: 'any_phonenumber',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should return 400 if phone is not valid', async () => {
    const { sut, phoneValidatorStub } = makeSut()
    jest.spyOn(phoneValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        phone: 'invalid_phonenumber',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('phone'))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should call PhoneValidator with correct phone', async () => {
    const { sut, phoneValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(phoneValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_phonenumber')
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should return 500 if phoneValidator throws', async () => {
    const { sut, phoneValidatorStub } = makeSut()
    jest.spyOn(phoneValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should call AddAccount with correctly values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      phone: 'any_phonenumber',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(null))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(makeFakeAccount())
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
