import { LocalStorageAdapter } from './localStorageAdapter'
import faker from 'faker'
import 'jest-localstorage-mock'
import { IAccountModel } from '@/domain/models'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const makeSystemUnderTest = (): LocalStorageAdapter => {
    const sut = new LocalStorageAdapter()
    return sut
  }
  test('should call localStorage with correct values', async () => {
    const sut = makeSystemUnderTest()
    const key = faker.database.column()
    const value = faker.random.objectElement<IAccountModel>()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
