import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/mocks'
import { LocalStorageAdapter } from '@/infra/cache/localStorageAdapter/localStorageAdapter'
import { setCurrentAccountAdapter } from './currentAccountAdapter'

jest.mock('@/infra/cache/localStorageAdapter/localStorageAdapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter', () => {
    const account = mockAccountModel()
    const setAccountSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set') // spy all instances on method set
    setCurrentAccountAdapter(account) // run function
    expect(setAccountSpy).toHaveBeenCalledWith('account', account)
  })

  test('should throw unexpected error if received value is invalid', () => {
    // Test if this function returns an exception
    expect(() => {
      setCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })
})