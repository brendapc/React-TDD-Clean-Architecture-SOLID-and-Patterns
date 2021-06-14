import faker from 'faker'
import { IHttpPostClient, IHttpPostParams, HttpStatusCode, IHttpResponse } from '@/data/protocols/http'

export class HttpPostClientMock<T, R> implements IHttpPostClient<T, R> {
  url?: string
  body?: T
  httpResponse: IHttpResponse<R> = {
    statusCode: HttpStatusCode.okRequest
  }

  async post (params: IHttpPostParams<T>): Promise<IHttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.httpResponse
  }
}

export const mockPostRequest = (): IHttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
