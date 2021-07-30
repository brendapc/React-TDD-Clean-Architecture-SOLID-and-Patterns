import { IHttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { IAuthentication } from '@/domain/useCases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { IAccountModel } from '@/domain/models/'

export class RemoteAuthentication implements IAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<RemoteAuthentication.Model>
  ) {}

  async auth (params: RemoteAuthentication.Params): Promise<RemoteAuthentication.Model> {
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

export namespace RemoteAuthentication {
  export type Params = {
    email: string
    password: string
  }
  export type Model = IAccountModel
}
