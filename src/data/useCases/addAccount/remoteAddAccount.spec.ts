import faker from 'faker'
import { RemoteAddAccount } from './remoteAddAccount'
import { HttpPostClientSpy } from '@/data/mocks'
import { mockAccountModel, mockAddAccountParams } from '@/domain/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<RemoteAddAccount.Model>
}

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAddAccount.Model>()
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
  test('should HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })
  test('should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })
  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return an AccountModel if an HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSystemUnderTest()
    const httpResponseBody = mockAccountModel()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.okRequest,
      body: httpResponseBody
    }
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(httpResponseBody)
  })
})
