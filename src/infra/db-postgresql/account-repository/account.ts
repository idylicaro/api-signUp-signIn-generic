import { AddAccountRepository } from '../../../data/protocols/db/add-account-respository'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/load-account-by-email-repository'
import knex from '../knex'

export class AccountPostgreRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    // let id: string
    const [user] = await knex('accounts').insert({
      name: accountData.name,
      phone: accountData.phone,
      email: accountData.email,
      password: accountData.password
    }).returning('*')

    return user
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const [user] = await knex('accounts').where('email', email)
    return user
  }
}
