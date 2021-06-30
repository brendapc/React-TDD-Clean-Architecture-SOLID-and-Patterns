import { HttpStatusCode, IHttpPostClient } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { IAccountModel } from '@/domain/models'
import { IAddAccount, IAddAccountParams } from '@/domain/useCases'

export class RemoteAddAccount implements IAddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<IAccountModel>
  ) {}

  async add (params: IAddAccountParams): Promise<IAccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.okRequest: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
