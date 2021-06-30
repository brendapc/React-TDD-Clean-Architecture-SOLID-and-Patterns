import { IHttpResponse } from '.'

/* eslint-disable @typescript-eslint/ban-types */
export type IHttpPostParams<> ={
  url: string
  body?: any
}
export interface IHttpPostClient<ResponseType = any> {
  post: (params: IHttpPostParams) => Promise<IHttpResponse<ResponseType>>
}
