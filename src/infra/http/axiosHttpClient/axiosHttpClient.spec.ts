import { AxiosHttpClient } from './axiosHttpClient'
import faker from 'faker'
import { IHttpPostParams } from '@/data/protocols/http'
import { mockAxios } from '@/infra/test'
import axios from 'axios'
import { mockPostRequest } from '@/data/test/mockHttpPostRequest'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}
const mountSystemUnderTest = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const httpRequest = mockPostRequest()
    const { sut, mockedAxios } = mountSystemUnderTest()
    await sut.post(httpRequest)
    expect(mockedAxios.post).toHaveBeenCalledWith(httpRequest.url, httpRequest.body)
  })
  test('should return the correct statusCode and body', () => {
    const httpRequest = mockPostRequest()
    const { sut, mockedAxios } = mountSystemUnderTest()
    const promise = sut.post(httpRequest)
    // comparing with mockedAxiosResponse from mockedAxios, that is a promise
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
