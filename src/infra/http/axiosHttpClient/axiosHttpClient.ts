import { IHttpPostClient, IHttpPostParams, IHttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

// Design Pattern: Adapter
export class AxiosHttpClient implements IHttpPostClient {
  async post (params: IHttpPostParams): Promise<IHttpResponse> {
    let httpResponse: AxiosResponse
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (err) {
      httpResponse = err.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
