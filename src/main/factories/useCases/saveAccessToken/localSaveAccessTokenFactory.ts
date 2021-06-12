import { LocalSaveAccessToken } from '@/data/useCases/saveAccessToken/localSaveAccessToken'
import { ISaveAccessToken } from '@/domain/useCases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/localStorageAdapterFactory'

export const makeSaveAccessToken = (): ISaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
