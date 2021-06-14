import { RemoteAddAccount } from './remoteAddAccount'
import { HttpPostClientMock } from '@/data/mocks'
import faker from 'faker'
import { IAccountModel } from '@/domain/models'
import { IAddAccountParams } from '@/domain/useCases'
import { mockAddAccountParams } from '@/domain/test'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientMock: HttpPostClientMock<IAddAccountParams, IAccountModel>
}

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientMock = new HttpPostClientMock<IAddAccountParams, IAccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientMock)
  return {
    sut,
    httpPostClientMock
  }
}

describe('RemoteAddAccount', () => {
  test('should HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientMock } = makeSystemUnderTest(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientMock.url).toBe(url)
  })
})
