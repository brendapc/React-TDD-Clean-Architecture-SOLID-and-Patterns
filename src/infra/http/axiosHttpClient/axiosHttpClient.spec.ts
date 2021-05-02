import { AxiosHttpClient } from './axiosHttpClient'
import faker, { fake } from 'faker'
import axios from 'axios'

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

describe('AxiosHttpClient', () => {
  test('should call axios with correct url and verb', async () => {
    const url = faker.internet.url()
    const { sut } = mountSystemUnderTest()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
