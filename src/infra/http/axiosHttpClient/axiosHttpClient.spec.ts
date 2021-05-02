import { AxiosHttpClient } from './axiosHttpClient'
import faker, { fake } from 'faker'
import axios from 'axios'
import { IHttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResponse = {
  data: faker.random.objectElement(),
  status: faker.random.number()
}

mockedAxios.post.mockResolvedValue(mockedAxiosResponse)

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
    const httpRequest = mockPostRequest()
    const { sut } = mountSystemUnderTest()
    await sut.post(httpRequest)
    expect(mockedAxios.post).toHaveBeenCalledWith(httpRequest.url, httpRequest.body)
  })
  test('should return the correct statusCode and body', async () => {
    const httpRequest = mockPostRequest()
    const { sut } = mountSystemUnderTest()
    const httpResponse = await sut.post(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data
    })
  })
})
