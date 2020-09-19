import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByIdRepository {
  loadById: (id: string) => Promise<AccountModel>
}
