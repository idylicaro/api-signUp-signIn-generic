import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../erros'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_Field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_Field'))
  })
})
