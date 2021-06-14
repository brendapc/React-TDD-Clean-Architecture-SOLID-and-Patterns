import { IHttpPostClient } from '@/data/protocols/http'
import { IAccountModel } from '@/domain/models'
import { IAddAccount, IAddAccountParams } from '@/domain/useCases'

export class RemoteAddAccount implements IAddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<IAddAccountParams, IAccountModel>
  ) {}

  async add (params: IAddAccountParams): Promise<IAccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    return null
  }
}
