import { AccountVerify, LoadAccountConfirmationByIdRepository, LoadAccountByIdRepository } from './db-account-confirmation-protocols'
export class DbAccountConfirmation implements AccountVerify {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadAccountConfirmationByIdRepository: LoadAccountConfirmationByIdRepository) {
  }

  async confirm (id: string, token: string): Promise<Boolean> {
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (!account) {
      return false
    }
    if (account.isConfirmed) {
      return false
    }
    const accountConfirmation = await this.loadAccountConfirmationByIdRepository.loadById(id)
    if (!accountConfirmation) {
      return false
    }
    return true
  }
}
