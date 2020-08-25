export interface AccountVerify{
  confirm: (id: string, token: string) => Promise<Boolean>
}
