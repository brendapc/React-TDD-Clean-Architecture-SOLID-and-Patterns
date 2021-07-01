import { ILoadSurveyList } from '@/domain/useCases/loadSurveyList'
import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { ISurveyModel } from '@/domain/models'

export class RemoteLoadSurveyList implements ILoadSurveyList {
  constructor (private readonly url: string,
    private readonly httpGetClient: IHttpGetClient) {}

  async loadAll (): Promise<ISurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.okRequest: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}
