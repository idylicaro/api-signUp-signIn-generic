import { makeAccountConfirmationValidation } from './account-confirmation-validation-factory'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

jest.mock('../../../../validation/validators/validation-composite')

describe('AccountConfirmationValidation Factory', () => {
  test('Should call ValidationComposite with all validations ', () => {
    makeAccountConfirmationValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
