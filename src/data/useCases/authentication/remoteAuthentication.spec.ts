import { HttpPostClientMock } from '@/data/test/mockHttpClient'
import { RemoteAuthentication } from './remoteAuthentication'
import { mockAuthentication } from '@/domain/test/mockAuthentication'
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError/InvalidCredentialsError'
import { UnexpectedError } from './../../../domain/errors/unexpectedError/InvalidCredentialsError'
import { AuthenticationParams } from '@/domain/useCases/authentication'
import { IAccountModel } from './../../../domain/models/accountModel'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientMock: HttpPostClientMock<AuthenticationParams, IAccountModel>
}

const mountSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
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
    const { sut, httpPostClientMock } = mountSystemUnderTest(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientMock.url).toBe(url)
  })
  test('should HttpClient with correct body', async () => {
    const { sut, httpPostClientMock } = mountSystemUnderTest()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientMock.body).toEqual(authenticationParams)
  })
  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpPostClientMock } = mountSystemUnderTest()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpPostClientMock } = mountSystemUnderTest()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpPostClientMock } = mountSystemUnderTest()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpPostClientMock } = mountSystemUnderTest()
    httpPostClientMock.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
