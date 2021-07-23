import { IAccountModel } from '../models'

export interface IUpdateAccount {
  save: (account: IAccountModel) => Promise<void>
}
