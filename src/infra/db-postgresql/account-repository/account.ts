import { AddAccountRepository } from '../../../data/protocols/add-account-respository'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import knex from '../knex'

export class AccountPostgreRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const [user] = await knex('accounts').insert({
      name: accountData.name,
      phone: accountData.phone,
      email: accountData.email,
      password: accountData.password
    }).returning('*')

    return user
  }
}
