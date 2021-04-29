export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401
}

export type IHttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
