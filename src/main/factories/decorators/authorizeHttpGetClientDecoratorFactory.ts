import { IHttpGetClient } from '@/data/protocols/http'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '../cache/localStorageAdapterFactory'
import { makeAxiosHttpClient } from '../http/HttpClientFactory'

export const makeAuthorizeHttpGetClientDecorator = (): IHttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
