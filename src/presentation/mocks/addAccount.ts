import { AuthenticationParams, IAddAccount, IAddAccountParams, IAuthentication } from '@/domain/useCases'
import { IAccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/mocks'

export class AddAccountSpy implements IAddAccount {
  fakeAccount = mockAccountModel()
  params: IAddAccountParams
  callsCount = 0

  async add (params: IAddAccountParams): Promise<IAccountModel> {
    this.params = params
    this.callsCount++
    return this.fakeAccount
  }
}
