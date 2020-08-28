import { AccountConfirmationModel } from '../../../../domain/models/account-confirmation-model'

export interface LoadAccountConfirmationByIdRepository {
  loadById: (id: string) => Promise<AccountConfirmationModel>
}
