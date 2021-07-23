import { ISetStorage } from '@/data/protocols/cache/setStorage'
import { UnexpectedError } from '@/domain/errors'
import { IAccountModel } from '@/domain/models'
import { IUpdateAccount } from '@/domain/useCases/updateAccount'

export class LocalUpdateAccount implements IUpdateAccount {
  constructor (private readonly setStorage: ISetStorage) {}
  async save (account: IAccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }
    this.setStorage.set('account', JSON.stringify(account))
  }
}
