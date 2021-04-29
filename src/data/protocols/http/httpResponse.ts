export enum HttpStatusCode {
  okRequest = 200,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  unauthorized = 401,
  serverError = 500,
}

export type IHttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
