import { IAccountModel } from '@/domain/models/accountModel'

export type IAddAccountParams = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}
export interface IAddAccount {
  add: (params: IAddAccountParams) => Promise<IAccountModel>
}
