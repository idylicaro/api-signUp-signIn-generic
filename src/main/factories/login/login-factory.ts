import env from '../../../main/config/env'
import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { AccountPostgreRepository } from '../../../infra/db-postgresql/account/account-postgre-repository'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { LogPostgreRepository } from '../../../infra/db-postgresql/log/log-repository'
import { LogControllerDecorator } from '../../decorators/log'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountPostgreRepository = new AccountPostgreRepository()
  const dbAuthentication = new DbAuthentication(accountPostgreRepository, bcryptAdapter, jwtAdapter, accountPostgreRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logPostgreRepository = new LogPostgreRepository()
  return new LogControllerDecorator(loginController, logPostgreRepository)
}
