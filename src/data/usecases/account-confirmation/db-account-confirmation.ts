import { AccountVerify, LoadAccountConfirmationByUserIdRepository, LoadAccountByIdRepository } from './db-account-confirmation-protocols'
export class DbAccountConfirmation implements AccountVerify {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadAccountConfirmationByUserIdRepository: LoadAccountConfirmationByUserIdRepository) {
  }

  async confirm (id: string, token: string): Promise<Boolean> {
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (!account) {
      return false
    }
    if (account.isConfirmed) {
      return false
    }
    const accountConfirmation = await this.loadAccountConfirmationByUserIdRepository.loadById(id)
    if (!accountConfirmation) {
      return false
    }

    const strDateExpire = accountConfirmation.date_expire.split('-')
    const dateExpire = strDateExpire.map(item => parseInt(item))
    const currentDate = new Date()

    if (!(dateExpire[0] >= currentDate.getDate() &&
        dateExpire[1] >= (currentDate.getMonth() + 1) &&
        dateExpire[3] >= currentDate.getFullYear())) {
      return false
    }
    return true
  }
}
