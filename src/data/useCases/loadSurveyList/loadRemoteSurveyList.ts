import { ILoadSurveyList } from '@/domain/useCases/loadSurveyList'
import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyList implements ILoadSurveyList {
  constructor (private readonly url: string,
    private readonly httpGetClient: IHttpGetClient) {}

  async loadAll (): Promise<ILoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.okRequest: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = ILoadSurveyList.Model[]
}
