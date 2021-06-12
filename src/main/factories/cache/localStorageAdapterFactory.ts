import { ISetStorage } from '@/data/protocols/cache/setStorage'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter/localStorageAdapter'

export const makeLocalStorageAdapter = (): ISetStorage => {
  return new LocalStorageAdapter()
}
