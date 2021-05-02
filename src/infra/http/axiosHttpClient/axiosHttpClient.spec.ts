import { AxiosHttpClient } from './axiosHttpClient'
import faker, { fake } from 'faker'
import axios from 'axios'
import { IHttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

interface SutTypes {
  sut: AxiosHttpClient
}
const mountSystemUnderTest = (): SutTypes => {
  const sut = new AxiosHttpClient()
  return {
    sut
  }
}

const mockPostRequest = (): IHttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockPostRequest()
    const { sut } = mountSystemUnderTest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
