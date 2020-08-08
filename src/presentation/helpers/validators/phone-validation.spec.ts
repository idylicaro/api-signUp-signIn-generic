import { PhoneValidation } from './phone-validation'
import { PhoneValidator } from '../../controllers/signUp/signup-protocols'
import { InvalidParamError } from '../../erros'

const makePhoneValidator = (): PhoneValidator => {
  class PhoneValidatorStub implements PhoneValidator {
    isValid (phone: string): boolean {
      return true
    }
  }
  return new PhoneValidatorStub()
}

interface SutTypes {
  sut: PhoneValidation
  phoneValidatorStub: PhoneValidator
}

const makeSut = (): SutTypes => {
  const phoneValidatorStub = makePhoneValidator()
  const sut = new PhoneValidation('phone', phoneValidatorStub)
  return {
    sut,
    phoneValidatorStub
  }
}

describe('Phone Validation', () => {
  test('Should return an error if EmailValidator returns false ', () => {
    const { sut, phoneValidatorStub } = makeSut()
    jest.spyOn(phoneValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ phone: 'any_phonenumber' })
    expect(error).toEqual(new InvalidParamError('phone'))
  })
  test('Should call PhoneValidator with correct phone', () => {
    const { sut, phoneValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(phoneValidatorStub, 'isValid')
    sut.validate({ phone: 'any_phonenumber' })
    expect(isValidSpy).toHaveBeenCalledWith('any_phonenumber')
  })

  test('Should throw if phoneValidator throws', () => {
    const { sut, phoneValidatorStub } = makeSut()
    jest.spyOn(phoneValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
