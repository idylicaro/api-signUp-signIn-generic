import { DbAccountConfirmation } from '../../../../data/usecases/account-confirmation/db-account-confirmation'
import { AccountPostgreRepository } from '../../../../infra/db-postgresql/account/account-postgre-repository'
import { AccountVerify } from '../../../../domain/usecases/verify-account'

export const makeDbAccountVerify = (): AccountVerify => {
  const accountPostgreRepository = new AccountPostgreRepository()
  return new DbAccountConfirmation(accountPostgreRepository, accountPostgreRepository)
}
