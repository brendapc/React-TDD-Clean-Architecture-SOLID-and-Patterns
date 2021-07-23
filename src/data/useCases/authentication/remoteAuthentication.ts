import { IHttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { AuthenticationParams, IAuthentication } from '@/domain/useCases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { IAccountModel } from '@/domain/models/'

export class RemoteAuthentication implements IAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<IAccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<IAccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.okRequest: return httpResponse.body

      default: throw new UnexpectedError()
    }
  }
}
