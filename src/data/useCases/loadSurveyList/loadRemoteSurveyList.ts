import { ILoadSurveyList } from '@/domain/useCases/loadSurveyList'
import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { AccessDeniedError } from '@/domain/errors/AccessDeniedError'

export class RemoteLoadSurveyList implements ILoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient<RemoteLoadSurveyList.Model[]>) {}

  async loadAll (): Promise<ILoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    const remoteSurveys = httpResponse.body || []
    
    switch (httpResponse.statusCode) {
      case HttpStatusCode.okRequest: return remoteSurveys.map(remoteSurvey => Object.assign(remoteSurvey, {
        date: new Date(remoteSurvey.date)
      }))
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string
    question: string
    date: string
    didAnswer: boolean
  }
}
