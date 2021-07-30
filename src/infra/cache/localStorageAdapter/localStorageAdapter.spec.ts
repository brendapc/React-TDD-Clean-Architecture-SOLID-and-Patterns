import { LocalStorageAdapter } from './localStorageAdapter'
import faker from 'faker'
import 'jest-localstorage-mock'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const makeSystemUnderTest = (): LocalStorageAdapter => {
    const sut = new LocalStorageAdapter()
    return sut
  }
  describe('SET', () => {
    test('should call localStorage.setItem with correct values', async () => {
      const sut = makeSystemUnderTest()
      const key = faker.database.column()
      const value = faker.random.objectElement<{}>()
      sut.set(key, value)
      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
    })
  })

  test('should call localStorage.removeItem if value is null', async () => {
    const sut = makeSystemUnderTest()
    const key = faker.database.column()
    sut.set(key, undefined)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  describe('GET', () => {
    test('should call localStorage.getItem with correct value', async () => {
      const sut = makeSystemUnderTest()
      const key = faker.database.column()
      const value = faker.random.objectElement<{}>()
      const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
      const object = sut.get(key)
      expect(object).toEqual(value)
      expect(getItemSpy).toHaveBeenCalledWith(key)
    })
  })
})
