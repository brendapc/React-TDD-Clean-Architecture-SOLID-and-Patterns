import { IAuthentication } from '@/domain/useCases'
import { mockAccountModel } from '@/domain/mocks'
import { RemoteAuthentication } from '@/data/useCases/authentication/remoteAuthentication'

export class AuthenticationSpy implements IAuthentication {
  fakeAccount = mockAccountModel()
  params: RemoteAuthentication.Params
  callsCount = 0

  async auth (params: RemoteAuthentication.Params): Promise<RemoteAuthentication.Model> {
    this.params = params
    this.callsCount++
    return this.fakeAccount
  }
}
