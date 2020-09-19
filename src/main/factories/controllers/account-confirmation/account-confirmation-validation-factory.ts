import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeAccountConfirmationValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
