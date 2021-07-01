import faker from 'faker'
import { HttpGetClientSpy } from '@/data/mocks'
import { RemoteLoadSurveyList } from './loadRemoteSurveyList'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy
}

const makeSystemUnderTest = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('Remote Load Survey List', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSystemUnderTest(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
