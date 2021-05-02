import { IHttpPostParams } from '@/data/protocols/http'
import axios from 'axios'
export class AxiosHttpClient {
  async post (params: IHttpPostParams<any>): Promise<void> {
    await axios.post(params.url, params.body)
  }
}
