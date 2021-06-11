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
  test('should call localStorage with correct values', async () => {
    const sut = makeSystemUnderTest()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
