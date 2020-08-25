export interface AccountConfirmation{
  confirm: (id: string, token: string) => Promise<Boolean>
}
