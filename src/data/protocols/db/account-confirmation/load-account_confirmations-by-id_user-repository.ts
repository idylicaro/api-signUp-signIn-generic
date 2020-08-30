import { AccountConfirmationModel } from '../../../../domain/models/account-confirmation-model'

export interface LoadAccountConfirmationByUserIdRepository {
  loadById: (id: string) => Promise<AccountConfirmationModel>
}
