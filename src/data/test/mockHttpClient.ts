import { IHttpPostClient } from 'data/protocols/http/httpPostClient'

export class HttpPostClientMock implements IHttpPostClient {
  url?: string
  async post (url: string): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}
