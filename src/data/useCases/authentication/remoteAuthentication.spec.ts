import { HttpPostClientMock } from '../../test/mockHttpClient'
import { RemoteAuthentication } from './remoteAuthentication'

describe('RemoteAuthentication', () => {
  test('should HttpClient with correct url', async () => {
    const url = 'anyUrl'
    const httpPostClientSpy = new HttpPostClientMock()
    const systemUnderTest = new RemoteAuthentication(url, httpPostClientSpy)
    await systemUnderTest.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
