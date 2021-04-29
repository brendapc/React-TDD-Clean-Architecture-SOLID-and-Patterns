import { IHttpPostClient } from 'data/protocols/http/httpPostClient'
import { AuthenticationParams, IAuthentication } from 'domain/useCases/authentication'
import { IAccountModel } from './../../../domain/models/accountModel'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
