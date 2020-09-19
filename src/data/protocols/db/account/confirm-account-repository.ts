export interface ConfirmAccountByIdRepository {
  confirmAccount: (id: string) => Promise<void>
}
