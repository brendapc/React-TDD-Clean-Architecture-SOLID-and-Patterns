import { IHttpResponse } from '.'

export type IHttpGetParams = {
  url: string
  headers?: any
}

export interface IHttpGetClient<ResponseType = any> {
  get: (params: IHttpGetParams) => Promise<IHttpResponse<ResponseType>>
}
