import { IHttpPostClient } from 'data/protocols/http/httpPostClient'
import { RemoteAuthentication } from './remoteAuthentication'

describe('RemoteAuthentication', () => {
  test('should HttpClient with correct url', async () => {
    class HttpPostClientSpy implements IHttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'anyUrl'
    const httpPostClientSpy = new HttpPostClientSpy()
    const systemUnderTest = new RemoteAuthentication(url, httpPostClientSpy)
    await systemUnderTest.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
