import { LocalUpdateAccount } from '@/data/useCases/localUpdateAccount/localUpdateAccount'
import { IUpdateAccount } from '@/domain/useCases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/localStorageAdapterFactory'

export const makeLocalUpdateAccount = (): IUpdateAccount => {
  return new LocalUpdateAccount(makeLocalStorageAdapter())
}
