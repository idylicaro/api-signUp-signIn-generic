import { AccountVerify } from '../../../domain/usecases/verify-account'
import { LoadAccountByIdRepository } from '../../protocols/db/account/load-account-by-id-repository'

export class DbAccountConfirmation implements AccountVerify {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {
  }

  async confirm (id: string, token: string): Promise<Boolean> {
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (!account) {
      return false
    }
    if (account.isConfirmed) {
      return false
    }
    return true
  }
}
