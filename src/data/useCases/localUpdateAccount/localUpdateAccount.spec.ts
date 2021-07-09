
import faker from 'faker'
import { LocalUpdateAccount } from './localUpdateAccount'
import { SetStorageMock } from '@/data/mocks'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/mocks'

type ISutTypes = {
  setStorageMock: SetStorageMock
  sut: LocalUpdateAccount
}

const makeSystemUnderTest = (): ISutTypes => {
  const setStorageMock = new SetStorageMock()

  const sut = new LocalUpdateAccount(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}
describe('LocalUpdateAccount', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSystemUnderTest()
    const account = mockAccountModel()
    await sut.save(account)
    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  test('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSystemUnderTest()
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => { throw new Error() })
    const account = mockAccountModel()
    const promise = sut.save(account)
    await expect(promise).rejects.toThrow()
  })

  test('should throw if accessToken is falsy', async () => {
    const { sut } = makeSystemUnderTest()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
