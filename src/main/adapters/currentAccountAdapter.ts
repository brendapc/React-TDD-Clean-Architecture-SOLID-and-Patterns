import { IAccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'
import { makeLocalStorageAdapter } from '../factories/cache/localStorageAdapterFactory'

export const setCurrentAccountAdapter = (account: IAccountModel): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): IAccountModel => {
  return makeLocalStorageAdapter().get('account')
}
