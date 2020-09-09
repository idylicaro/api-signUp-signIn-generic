import { AccountConfirmationModel } from '../../../../domain/models/account-confirmation-model'

export interface LoadAccountConfirmationByUserIdRepository {
  loadById: (idr: string) => Promise<AccountConfirmationModel>
}
