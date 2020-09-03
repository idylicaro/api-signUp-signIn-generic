export interface DeleteAccountConfirmationByUserIdRepository {
  deleteById: (id: string) => Promise<void>
}
