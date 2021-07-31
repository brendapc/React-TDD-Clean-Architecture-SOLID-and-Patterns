import faker from 'faker'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/mocks'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { IHttpGetParams } from '@/data/protocols/http'
import { mockAccountModel } from '@/domain/mocks'

type SutTypes = {
  getStorageSpy: GetStorageSpy
  sut: AuthorizeHttpGetClientDecorator
  httpGetClientSpy: HttpGetClientSpy
}

const makeSystemUnderTest = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('Authorize Http Get Client Decorator', () => {
  test('should call getStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSystemUnderTest()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('should not add headers if getStorage value is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSystemUnderTest()
    const httpRequest: IHttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })
  test('should add headers to HttpGetClient if getStorage value is valid', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSystemUnderTest()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: IHttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })
  test('should merge headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSystemUnderTest()
    getStorageSpy.value = mockAccountModel()
    const fakeValue = faker.random.words()
    const httpRequest: IHttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: fakeValue
      }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      field: fakeValue,
      'x-access-token': getStorageSpy.value.accessToken

    })
  })
  test('should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSystemUnderTest()
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual(httpGetClientSpy.response)
  })
})
