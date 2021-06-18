
import { IAddAccount } from '@/domain/useCases'
import { makeAxiosHttpClient } from '@/main/factories/http/HttpClientFactory'
import { makeApiUrl } from '@/main/factories/http/apiUrlFactory'
import { RemoteAddAccount } from '@/data/useCases/addAccount/remoteAddAccount'

export const makeRemoteAddAccount = (): IAddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
