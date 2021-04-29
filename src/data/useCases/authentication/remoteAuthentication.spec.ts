import { HttpPostClientMock } from '../../test/mockHttpClient'
import { RemoteAuthentication } from './remoteAuthentication'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientMock: HttpPostClientMock
}

const mountSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientMock = new HttpPostClientMock()
  const sut = new RemoteAuthentication(url, httpPostClientMock)
  return {
    sut,
    httpPostClientMock
  }
}

describe('RemoteAuthentication', () => {
  test('should HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientMock } = mountSystemUnderTest(url)
    await sut.auth()
    expect(httpPostClientMock.url).toBe(url)
  })
})
