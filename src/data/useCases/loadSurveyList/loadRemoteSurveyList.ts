import { ILoadSurveyList } from '@/domain/useCases/loadSurveyList'
import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyList {
  constructor (private readonly url: string,
    private readonly httpGetClient: IHttpGetClient) {}

  async loadAll (): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.okRequest: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
