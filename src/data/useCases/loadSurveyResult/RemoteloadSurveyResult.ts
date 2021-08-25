import { HttpStatusCode, IHttpGetClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { AccessDeniedError } from '@/domain/errors/AccessDeniedError'
import { ILoadSurveyResult } from '@/domain/useCases'

export class RemoteLoadSurveyResult implements ILoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: IHttpGetClient<RemoteLoadSurveyResult.Model>
  ) { }

  async load (): Promise<ILoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    const remoteSurveyResult = httpResponse.body
    let result
    if (remoteSurveyResult) {
      result = {
        answers: remoteSurveyResult.answers,
        question: remoteSurveyResult.question,
        date: new Date(remoteSurveyResult.date)
      }
    }
    switch (httpResponse.statusCode) {
      case HttpStatusCode.okRequest: return result
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    date: string
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
    }>
  }
}
