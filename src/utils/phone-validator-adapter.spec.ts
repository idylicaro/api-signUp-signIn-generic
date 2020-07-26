import { PhoneValidatorAdapter } from './phone-validator-adapter'
import PhoneBrValidator from './phone-validator/phone-validator'

jest.mock('./phone-validator/phone-validator', () => ({
  isPhone (): boolean {
    return true
  }
}))

const makeSut = (): PhoneValidatorAdapter => {
  return new PhoneValidatorAdapter()
}

describe('phoneValidator Adapter', () => {
  test('Should return false if phonevalidator returns false', () => {
    const sut = makeSut()
    jest.spyOn(PhoneBrValidator, 'isPhone').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_phone')
    expect(isValid).toBe(false)
  })

//   test('Should return true if phonevalidator returns true', () => {
//     const sut = makeSut()
//     const isValid = sut.isValid('valid_phone@mail.com')
//     expect(isValid).toBe(true)
//   })
//   test('Should call phonevalidator correct phone', () => {
//     const sut = makeSut()
//     const isphoneSpy = jest.spyOn(validator, 'isphone')
//     sut.isValid('valid_phone@mail.com')
//     expect(isphoneSpy).toHaveBeenCalledWith('valid_phone@mail.com')
//   })
})
