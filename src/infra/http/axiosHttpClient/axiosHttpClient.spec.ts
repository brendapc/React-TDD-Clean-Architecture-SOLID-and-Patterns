import { AxiosHttpClient } from './axiosHttpClient'
import faker from 'faker'
import { IHttpPostParams } from '@/data/protocols/http'
import { mockAxios } from '@/infra/mocks'
import axios from 'axios'
import { mockGetRequest, mockPostRequest } from '@/data/mocks/'
import { mockHttpResponse } from '../../mocks/mockAxios'

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
  describe('POST', () => {
    test('should call axios.post with correct values', async () => {
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
      const httpRequest = mockPostRequest()
      const { sut, mockedAxios } = makeSystemUnderTest()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(httpRequest)
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
  describe('GET', () => {
    test('should call axios.get with correct values', async () => {
      const httpRequest = mockGetRequest()
      const { sut, mockedAxios } = makeSystemUnderTest()
      await sut.get(httpRequest)
      expect(mockedAxios.get).toHaveBeenCalledWith(httpRequest.url)
    })
  })
})
