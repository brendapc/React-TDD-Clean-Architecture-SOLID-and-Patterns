import faker from 'faker'
import { IHttpPostClient, IHttpPostParams, HttpStatusCode, IHttpResponse, IHttpGetClient, IHttpGetParams } from '@/data/protocols/http'

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

export class HttpGetClientSpy<ResponseType> implements IHttpGetClient<ResponseType> {
  url: string
  response: IHttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.okRequest
  }

  async get (params: IHttpGetParams): Promise<IHttpResponse<ResponseType>> {
    this.url = params.url
    return this.response
  }
}
