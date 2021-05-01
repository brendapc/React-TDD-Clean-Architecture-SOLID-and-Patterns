/* eslint-disable @typescript-eslint/ban-types */
import { IHttpPostClient, IHttpPostParams } from '@/data/protocols/http/httpPostClient'
import { HttpStatusCode, IHttpResponse } from '../protocols/http/httpResponse'

export class HttpPostClientMock<T, R> implements IHttpPostClient<T, R> {
  url?: string
  body?: T
  httpResponse: IHttpResponse<R> = {
    statusCode: HttpStatusCode.okRequest
  }

  async post (params: IHttpPostParams<T>): Promise<IHttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.httpResponse)
  }
}
