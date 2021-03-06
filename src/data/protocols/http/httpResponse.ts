export enum HttpStatusCode {
  okRequest = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type IHttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
