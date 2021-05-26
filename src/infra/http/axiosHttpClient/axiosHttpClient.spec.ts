import { AxiosHttpClient } from './axiosHttpClient'
import faker from 'faker'
import { IHttpPostParams } from '@/data/protocols/http'
import { mockAxios } from '@/infra/mocks'
import axios from 'axios'
import { mockPostRequest } from '@/data/test/mockHttpPostRequest'
import { mockHttpResponse } from './../../mocks/mockAxios'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}
const makeSystemUnderTest = (): SutTypes => {
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
    const { sut, mockedAxios } = makeSystemUnderTest()
    await sut.post(httpRequest)
    expect(mockedAxios.post).toHaveBeenCalledWith(httpRequest.url, httpRequest.body)
  })
  test('should return the correct statusCode and body', () => {
    const httpRequest = mockPostRequest()
    const { sut, mockedAxios } = makeSystemUnderTest()
    const promise = sut.post(httpRequest)
    // comparing with mockedAxiosResponse from mockedAxios, that is a promise
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test('should return correct statusCode and body on failure', () => {
    const { sut, mockedAxios } = makeSystemUnderTest()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
  })
})
