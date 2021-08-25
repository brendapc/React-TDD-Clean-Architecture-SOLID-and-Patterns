import { HttpGetClientSpy } from '@/data/mocks'
import faker from 'faker'
import { RemoteLoadSurveyResult } from '@/data/useCases/loadSurveyResult/RemoteloadSurveyResult'

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
