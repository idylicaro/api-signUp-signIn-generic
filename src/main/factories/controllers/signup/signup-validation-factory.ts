import { ValidationComposite, CompareFieldValidation, EmailValidation, PhoneValidation, RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../../infra/adapters/email-validator-adapter'
import { PhoneValidatorAdapter } from '../../../../infra/adapters/phone-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'phone', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new PhoneValidation('phone', new PhoneValidatorAdapter()))
  return new ValidationComposite(validations)
}
