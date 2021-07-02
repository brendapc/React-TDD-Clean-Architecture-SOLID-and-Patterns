import { IHttpGetClient, IHttpGetParams, IHttpPostClient, IHttpPostParams, IHttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

// Design Pattern: Adapter
export class AxiosHttpClient implements IHttpPostClient, IHttpGetClient {
  async post (params: IHttpPostParams): Promise<IHttpResponse> {
    let axiosHttpResponse: AxiosResponse
    try {
      axiosHttpResponse = await axios.post(params.url, params.body)
    } catch (err) {
      axiosHttpResponse = err.response
    }
    return {
      statusCode: axiosHttpResponse.status,
      body: axiosHttpResponse.data
    }
  }

  async get (params: IHttpGetParams): Promise<IHttpResponse> {
    const axiosHttpResponse = await axios.get(params.url)
    return {
      statusCode: axiosHttpResponse.status,
      body: axiosHttpResponse.data
    }
  }
}
