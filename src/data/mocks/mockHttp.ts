import faker from 'faker'
import { IHttpPostClient, IHttpPostParams, HttpStatusCode, IHttpResponse } from '@/data/protocols/http'

export class HttpPostClientSpy<ResponseType> implements IHttpPostClient<ResponseType> {
  url?: string
  body?: any
  httpResponse: IHttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.okRequest
  }

  async post (params: IHttpPostParams): Promise<IHttpResponse<ResponseType>> {
    this.url = params.url
    this.body = params.body
    return this.httpResponse
  }
}

export const mockPostRequest = (): IHttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
