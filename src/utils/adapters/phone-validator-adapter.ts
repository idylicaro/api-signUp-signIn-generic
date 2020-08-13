import { PhoneValidator } from '../../presentation/protocols/phone-validator'
import PhoneBrValidator from 'br-phone-validator-lib'
export class PhoneValidatorAdapter implements PhoneValidator {
  isValid (phone: string): boolean {
    return PhoneBrValidator.isPhone(phone)
  }
}
