import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare-field-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { PhoneValidator } from '../../../presentation/protocols/phone-validator'
import { PhoneValidation } from '../../../presentation/helpers/validators/phone-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makePhoneValidator = (): PhoneValidator => {
  class PhoneValidatorStub implements PhoneValidator {
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

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations ', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'phone', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    validations.push(new PhoneValidation('phone', makePhoneValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
