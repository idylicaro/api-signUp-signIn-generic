import { AccountConfirmation } from '../../../domain/usecases/account-confirmation'
import { LoadAccountByIdRepository } from '../../protocols/db/account/load-account-by-id-repository'

export class DbAccountConfirmation implements AccountConfirmation {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {
  }

  async confirm (id: string, token: string): Promise<Boolean> {
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (!account) {
      return false
    }
    return true
  }
}
