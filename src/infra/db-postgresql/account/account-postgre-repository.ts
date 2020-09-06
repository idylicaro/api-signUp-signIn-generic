import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountRepository, ConfirmAccountByIdRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByIdRepository } from '../../../data/protocols/db/account'
import knex from '../../knex/knex-environment'

export class AccountPostgreRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByIdRepository, ConfirmAccountByIdRepository {
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

  async loadById (id: string): Promise<AccountModel> {
    const [user] = await knex('accounts').where('id', id)
    return user
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    await knex('accounts').where({ id: id }).update({ accessToken: token })
  }

  async confirmAccount (id: string): Promise<void> {
    await knex('accounts').where({ id: id }).update({ isConfirmed: true })
  }
}
