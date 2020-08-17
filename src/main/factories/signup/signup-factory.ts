import { SignUpController } from '../../../presentation/controllers/signUp/signup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPostgreRepository } from '../../../infra/db-postgresql/account/account-postgre-repository'
import { Controller } from '../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { LogPostgreRepository } from '../../../infra/db-postgresql/log/log-repository'
import { LogControllerDecorator } from '../../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountPostgreRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logPostgreRepository = new LogPostgreRepository()
  return new LogControllerDecorator(signUpController, logPostgreRepository)
}
