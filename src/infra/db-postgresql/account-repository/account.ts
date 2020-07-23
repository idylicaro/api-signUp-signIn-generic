import { AddAccountRepository } from '../../../data/protocols/add-account-respository'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import knex from '../pg-connection'

export class AccountPostgreRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    // need make const client to a helper and test..
    const [id] = await knex('accounts').insert({
      name: accountData.name,
      phone: accountData.phone,
      email: accountData.email,
      password: accountData.password
    }).returning('id')

    return Object.assign({}, accountData, id)
  }
}
