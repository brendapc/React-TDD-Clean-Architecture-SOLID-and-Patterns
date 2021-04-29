/* eslint-disable @typescript-eslint/ban-types */
export type IHttpPostParams ={
  url: string
  body?: object
}
export interface IHttpPostClient {
  post(params: IHttpPostParams): Promise<void>
}
