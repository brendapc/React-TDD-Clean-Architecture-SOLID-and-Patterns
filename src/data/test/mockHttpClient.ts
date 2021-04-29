/* eslint-disable @typescript-eslint/ban-types */
import { IHttpPostClient, IHttpPostParams } from '@/data/protocols/http/httpPostClient'

export class HttpPostClientMock implements IHttpPostClient {
  url?: string
  body?: object

  async post (params: IHttpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}
