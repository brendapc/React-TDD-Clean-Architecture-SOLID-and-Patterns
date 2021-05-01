import { IHttpPostClient } from '@/data/protocols/http/httpPostClient'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'
import { AuthenticationParams } from '@/domain/useCases/authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError/InvalidCredentialsError'
import { UnexpectedError } from './../../../domain/errors/unexpectedError/InvalidCredentialsError'
import { IAccountModel } from './../../../domain/models/accountModel'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AuthenticationParams, IAccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      case HttpStatusCode.okRequest: break

      default: throw new UnexpectedError()
    }
  }
}
