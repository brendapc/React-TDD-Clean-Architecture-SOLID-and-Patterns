
import faker from 'faker'
import { ISaveAccessToken } from '@/domain/useCases/saveAccessToken'
import { LocalSaveAccessToken } from './localSaveAccessToken'
import { SetStorageSpy } from '@/data/mocks/mockStorage'

interface ISutTypes {
  setStorageSpy: SetStorageSpy
  sut: ISaveAccessToken
}

const makeSystemUnderTest = (): ISutTypes => {
  const setStorageSpy = new SetStorageSpy()

  const sut = new LocalSaveAccessToken(setStorageSpy)

  return {
    sut,
    setStorageSpy
  }
}
describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSystemUnderTest()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
