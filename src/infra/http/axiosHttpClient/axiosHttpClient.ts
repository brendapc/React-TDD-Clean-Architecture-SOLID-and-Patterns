import { IHttpPostClient, IHttpPostParams, IHttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

// Design Pattern: Adapter
export class AxiosHttpClient implements IHttpPostClient<any, any> {
  async post (params: IHttpPostParams<any>): Promise<IHttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
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
