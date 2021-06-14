import { RemoteAddAccount } from './remoteAddAccount'
import { HttpPostClientSpy } from '@/data/mocks'
import faker from 'faker'
import { IAccountModel } from '@/domain/models'
import { IAddAccountParams } from '@/domain/useCases'
import { mockAddAccountParams } from '@/domain/mocks'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<IAddAccountParams, IAccountModel>
}

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<IAddAccountParams, IAccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('should HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSystemUnderTest(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
