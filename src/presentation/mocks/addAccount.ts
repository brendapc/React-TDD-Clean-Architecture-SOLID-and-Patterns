import { IAddAccount } from '@/domain/useCases'
import { mockAccountModel } from '@/domain/mocks'

export class AddAccountSpy implements IAddAccount {
  fakeAccount = mockAccountModel()
  params: IAddAccount.Params
  callsCount = 0

  async add (params: IAddAccount.Params): Promise<IAddAccount.Model> {
    this.params = params
    this.callsCount++
    return this.fakeAccount
  }
}
