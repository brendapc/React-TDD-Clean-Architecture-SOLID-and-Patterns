/* eslint-disable @typescript-eslint/ban-types */
import { IHttpPostClient, IHttpPostParams } from '@/data/protocols/http/httpPostClient'
import { HttpStatusCode, IHttpResponse } from '../protocols/http/httpResponse'

export class HttpPostClientMock implements IHttpPostClient {
  url?: string
  body?: object
  httpResponse: IHttpResponse = {
    statusCode: HttpStatusCode.unauthorized
  }

  async post (params: IHttpPostParams): Promise<IHttpResponse> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.httpResponse)
  }
}
