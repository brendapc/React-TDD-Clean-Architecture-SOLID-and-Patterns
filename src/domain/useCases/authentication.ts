import { IAccountModel } from 'domain/models/accountModel'

type AuthenticationParams = {
  email: string
  password: string
}
export interface IAuthentication {
  auth(params: AuthenticationParams): Promise<IAccountModel>
}
