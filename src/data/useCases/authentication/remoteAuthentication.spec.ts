import { HttpPostClientMock } from '../../test/mockHttpClient'
import { RemoteAuthentication } from './remoteAuthentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientMock: HttpPostClientMock
}

const mountSystemUnderTest = (url = 'anyUrl'): SutTypes => {
  const httpPostClientMock = new HttpPostClientMock()
  const sut = new RemoteAuthentication(url, httpPostClientMock)
  return {
    sut,
    httpPostClientMock
  }
}

describe('RemoteAuthentication', () => {
  test('should HttpClient with correct url', async () => {
    const url = 'mockUrl'
    const { sut, httpPostClientMock } = mountSystemUnderTest(url)
    await sut.auth()
    expect(httpPostClientMock.url).toBe(url)
  })
})
