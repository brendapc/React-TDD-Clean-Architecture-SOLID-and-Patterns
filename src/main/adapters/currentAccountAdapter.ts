import { IAccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'
import { makeLocalStorageAdapter } from '../factories/cache/localStorageAdapterFactory'

export const setCurrentAccountAdapter = (account: IAccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set('account', account)
}
