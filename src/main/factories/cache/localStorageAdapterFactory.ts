import { IGetStorage } from '@/data/protocols/cache'
import { ISetStorage } from '@/data/protocols/cache/setStorage'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter/localStorageAdapter'

export const makeLocalStorageAdapter = (): ISetStorage & IGetStorage => {
  return new LocalStorageAdapter()
}
