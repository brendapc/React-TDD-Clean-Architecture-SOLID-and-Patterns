import { IHttpPostClient, IHttpPostParams } from 'data/protocols/http/httpPostClient'

export class HttpPostClientMock implements IHttpPostClient {
  url?: string
  async post (params: IHttpPostParams): Promise<void> {
    this.url = params.url
    return Promise.resolve()
  }
}
