import { ValidationComposite, CompareFieldValidation, EmailValidation, PhoneValidation, RequiredFieldValidation } from '../../../../presentation/helpers/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../../utils/adapters/email-validator-adapter'
import { PhoneValidatorAdapter } from '../../../../utils/adapters/phone-validator-adapter'

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
