import { Controller } from '../../../../presentation/protocols'
import { AccountConfirmationController } from '../../../../presentation/controllers/account-confirmation/account-confirmaton-controller'
import { makeAccountConfirmationValidation } from './account-confirmation-validation-factory'
import { makeDbAccountVerify } from '../../usecases/account-confirmation/db-account-verify-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const accountConfirmationController = new AccountConfirmationController(makeDbAccountVerify(), makeAccountConfirmationValidation())
  return makeLogControllerDecorator(accountConfirmationController)
}
