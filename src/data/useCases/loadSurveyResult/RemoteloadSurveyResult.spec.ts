import faker from 'faker'
import { HttpGetClientSpy } from '@/data/mocks'
import { RemoteLoadSurveyResult } from '@/data/useCases/loadSurveyResult/RemoteloadSurveyResult'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError } from '@/domain/errors/AccessDeniedError'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy
}

const makeSystemUnderTest = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSystemUnderTest(url)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSystemUnderTest()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSystemUnderTest()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSystemUnderTest()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
