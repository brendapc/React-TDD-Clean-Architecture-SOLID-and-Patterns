import { RemoteAuthentication } from './remoteAuthentication'
import { HttpPostClientSpy } from '@/data/mocks'
import { mockAccountModel, mockAuthentication } from '@/domain/mocks'
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors/'
import { AuthenticationParams } from '@/domain/useCases/'
import { IAccountModel } from '@/domain/models/'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<IAccountModel>
}

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<IAccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('should HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSystemUnderTest(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })
  test('should HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })
  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an AccountModel if an HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    const httpResponseBody = mockAccountModel()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.okRequest,
      body: httpResponseBody
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResponseBody)
  })
})
