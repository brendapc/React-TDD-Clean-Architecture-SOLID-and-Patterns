import { HttpPostClientMock } from '@/data/mocks'
import { RemoteAuthentication } from './remoteAuthentication'
import { mockAccountModel, mockAuthentication } from '@/domain/test/'
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors/'
import { AuthenticationParams } from '@/domain/useCases/'
import { IAccountModel } from '@/domain/models/'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientMock: HttpPostClientMock<AuthenticationParams, IAccountModel>
}

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientMock = new HttpPostClientMock<AuthenticationParams, IAccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientMock)
  return {
    sut,
    httpPostClientMock
  }
}

describe('RemoteAuthentication', () => {
  test('should HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientMock } = makeSystemUnderTest(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientMock.url).toBe(url)
  })
  test('should HttpClient with correct body', async () => {
    const { sut, httpPostClientMock } = makeSystemUnderTest()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientMock.body).toEqual(authenticationParams)
  })
  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpPostClientMock } = makeSystemUnderTest()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpPostClientMock } = makeSystemUnderTest()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpPostClientMock } = makeSystemUnderTest()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpPostClientMock } = makeSystemUnderTest()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an AccountModel if an HttpPostClient returns 200', async () => {
    const { sut, httpPostClientMock } = makeSystemUnderTest()
    const httpResponseBody = mockAccountModel()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.okRequest,
      body: httpResponseBody
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResponseBody)
  })
})
