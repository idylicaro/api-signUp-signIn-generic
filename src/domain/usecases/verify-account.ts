export interface AccountVerify{
  confirm: (id: string) => Promise<Boolean>
}
