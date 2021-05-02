import { IHttpPostClient, IHttpPostParams, IHttpResponse } from '@/data/protocols/http'
import axios from 'axios'

//Design Pattern Adapter
export class AxiosHttpClient implements IHttpPostClient<any, any> {
  async post (params: IHttpPostParams<any>): Promise<IHttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
