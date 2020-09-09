import { LoadAccountConfirmationByUserIdRepository, DeleteAccountConfirmationByUserIdRepository } from '../../../data/protocols/db/account-confirmation'
import { AccountConfirmationModel } from '../../../domain/models/account-confirmation-model'
import knex from '../../knex/knex-environment'

export class AccountConfirmationPostgreRepository implements LoadAccountConfirmationByUserIdRepository, DeleteAccountConfirmationByUserIdRepository {
  async loadById (id: string): Promise<AccountConfirmationModel> {
    const [confirmation] = await knex('confirmations').where('id_user', id)
    return confirmation
  }

  async deleteById (id: string): Promise<void> {
    await knex('confirmations').where('id_user', id).del()
  }
}
