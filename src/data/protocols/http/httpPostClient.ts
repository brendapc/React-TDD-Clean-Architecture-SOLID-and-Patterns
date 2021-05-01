import { IHttpResponse } from './httpResponse'

/* eslint-disable @typescript-eslint/ban-types */
export type IHttpPostParams<T> ={
  url: string
  body?: T
}
export interface IHttpPostClient<T, R> {
  post(params: IHttpPostParams<T>): Promise<IHttpResponse<R>>
}
