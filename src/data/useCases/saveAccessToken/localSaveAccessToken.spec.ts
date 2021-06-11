
import faker from 'faker'
import { ISaveAccessToken } from '@/domain/useCases/saveAccessToken'
import { LocalSaveAccessToken } from './localSaveAccessToken'
import { SetStorageMock } from '@/data/mocks/mockStorage'

type ISutTypes = {
  setStorageMock: SetStorageMock
  sut: LocalSaveAccessToken
}

const makeSystemUnderTest = (): ISutTypes => {
  const setStorageMock = new SetStorageMock()

  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}
describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSystemUnderTest()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  test('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSystemUnderTest()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const accessToken = faker.datatype.uuid()
    const promise = sut.save(accessToken)
    await expect(promise).rejects.toThrow()
  })
})
