import faker from 'faker'
import { IHttpPostClient, IHttpPostParams, HttpStatusCode, IHttpResponse, IHttpGetClient, IHttpGetParams } from '@/data/protocols/http'

export class HttpPostClientSpy<ResponseType = any> implements IHttpPostClient<ResponseType> {
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

export const mockGetRequest = (): IHttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})

export class HttpGetClientSpy<ResponseType = any> implements IHttpGetClient<ResponseType> {
  url: string
  headers?: any
  response: IHttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.okRequest
  }

  async get (params: IHttpGetParams): Promise<IHttpResponse<ResponseType>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}
