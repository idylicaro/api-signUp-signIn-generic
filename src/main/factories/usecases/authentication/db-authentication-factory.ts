import env from '../../../config/env'
import { AccountPostgreRepository } from '../../../../infra/db-postgresql/account/account-postgre-repository'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { Authentication } from '../../../../domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountPostgreRepository = new AccountPostgreRepository()
  return new DbAuthentication(accountPostgreRepository, bcryptAdapter, jwtAdapter, accountPostgreRepository)
}
