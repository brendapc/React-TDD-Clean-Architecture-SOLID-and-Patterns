import { AuthenticationParams, IAuthentication } from '@/domain/useCases'
import { IAccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements IAuthentication {
  fakeAccount = mockAccountModel()
  params: AuthenticationParams
  callsCount = 0

  async auth (params: AuthenticationParams): Promise<IAccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.fakeAccount)
  }
}