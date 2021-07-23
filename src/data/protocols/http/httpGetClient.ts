import { IHttpResponse } from '.'

export interface IHttpGetParams{
  url: string
}

export interface IHttpGetClient<ResponseType = any> {
  get: (params: IHttpGetParams) => Promise<IHttpResponse<ResponseType>>
}
