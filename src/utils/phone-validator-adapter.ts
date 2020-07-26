import { PhoneValidator } from '../presentation/protocols/phone-validator'
import PhoneBrValidator from './phone-validator/phone-validator'
export class PhoneValidatorAdapter implements PhoneValidator {
  isValid (phone: string): boolean {
    return PhoneBrValidator.isPhone(phone)
  }
}
