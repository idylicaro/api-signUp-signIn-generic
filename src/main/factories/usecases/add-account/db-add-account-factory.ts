import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPostgreRepository } from '../../../../infra/db-postgresql/account/account-postgre-repository'
import { AddAccount } from '../../../../domain/usecases/add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgreRepository = new AccountPostgreRepository()
  return new DbAddAccount(bcryptAdapter, accountPostgreRepository, accountPostgreRepository)
}
