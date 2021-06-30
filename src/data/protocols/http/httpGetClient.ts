export interface IHttpGetParams{
  url: string
}

export interface IHttpGetClient {
  get: (params: IHttpGetParams) => Promise<void>
}
