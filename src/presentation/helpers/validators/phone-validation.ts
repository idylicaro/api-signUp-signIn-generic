import { Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'
import { PhoneValidator } from '../../protocols/phone-validator'

export class PhoneValidation implements Validation {
  private readonly fieldName: string
  private readonly phoneValidator: PhoneValidator
  constructor (fieldName: string, phoneValidator: PhoneValidator) {
    this.fieldName = fieldName
    this.phoneValidator = phoneValidator
  }

  validate (input: any): Error | undefined {
    if (!this.phoneValidator.isValid(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
