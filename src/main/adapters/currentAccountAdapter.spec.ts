import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/mocks'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter/localStorageAdapter'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './currentAccountAdapter'

jest.mock('@/infra/cache/localStorageAdapter/localStorageAdapter')

describe('CurrentAccountAdapter', () => {
  describe('SET', () => {
    test('should call LocalStorageAdapter.set with correct values', () => {
      const fakeAccount = mockAccountModel()
      const setAccountSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set') // spy all instances on method set
      setCurrentAccountAdapter(fakeAccount) // run function
      expect(setAccountSpy).toHaveBeenCalledWith('account', fakeAccount)
    })
  })

  describe('GET', () => {
    test('should call LocalStorageAdapter.get with correct value', () => {
      const fakeAccount = mockAccountModel()
      const getAccountSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(fakeAccount)
      const account = getCurrentAccountAdapter()
      expect(getAccountSpy).toHaveBeenCalledWith('account')
      expect(account).toEqual(fakeAccount)
    })
  })
})
