import { IAccountModel } from '@/domain/models/accountModel'

export interface IAddAccount {
  add: (params: IAddAccount.Params) => Promise<IAddAccount.Model>
}
export namespace IAddAccount {
  export type Params = {
    username: string
    email: string
    password: string
    passwordConfirmation: string
  }
  export type Model = IAccountModel
}
