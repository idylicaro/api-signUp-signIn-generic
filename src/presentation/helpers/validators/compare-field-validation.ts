import { Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'

export class CompareFieldValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldToCompareName: string
  constructor (fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input: any): Error | undefined {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
