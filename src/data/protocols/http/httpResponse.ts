export enum HttpStatusCode {
  unauthorized = 401
}

export type IHttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
