export type IHttpPostParams ={
  url: string
}
export interface IHttpPostClient {
  post(params: IHttpPostParams): Promise<void>
}
