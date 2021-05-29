
import { IAuthentication } from '@/domain/useCases'
import { RemoteAuthentication } from '@/data/useCases/authentication/remoteAuthentication'
import { makeAxiosHttpClient } from '@/main/factories/http/HttpClientFactory'
import { makeApiUrl } from '@/main/factories/http/apiUrlFactory'

export const makeRemoteAuthentication = (): IAuthentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
