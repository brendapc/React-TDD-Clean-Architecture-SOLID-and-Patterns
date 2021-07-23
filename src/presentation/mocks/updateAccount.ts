import { IAccountModel } from '@/domain/models'
import { IUpdateAccount } from '@/domain/useCases/updateAccount'
import { IValidation } from '@/presentation/protocols/validation'

export class UpdateAccountMock implements IUpdateAccount {
  account: IAccountModel

  async save (account: IAccountModel): Promise<void> {
    this.account = account
  }
}
