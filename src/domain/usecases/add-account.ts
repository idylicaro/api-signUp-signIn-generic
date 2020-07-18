import { AccountModel } from '../models/Account'
export interface AddAccountModel {
  name: string
  phone: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}
