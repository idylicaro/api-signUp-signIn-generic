import { AccountVerify, LoadAccountByIdRepository, ConfirmAccountByIdRepository } from './db-account-confirmation-protocols'

export class DbAccountConfirmation implements AccountVerify {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly confirmAccountByIdRepository: ConfirmAccountByIdRepository) {
  }

  async confirm (id: string): Promise<Boolean> {
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (!account) {
      return false
    }
    if (account.isConfirmed) {
      return false
    }
    await this.confirmAccountByIdRepository.confirmAccount(id)
    return true
  }
}
