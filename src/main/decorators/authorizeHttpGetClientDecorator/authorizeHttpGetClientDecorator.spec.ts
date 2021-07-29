import faker from 'faker'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from "@/data/mocks"
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators"
import { IHttpGetParams } from '@/data/protocols/http'

type SutTypes = {
    getStorageSpy: GetStorageSpy
    sut: AuthorizeHttpGetClientDecorator
    httpGetClientSpy: HttpGetClientSpy
}

const makeSystemUnderTest = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
    return {
        sut, 
        getStorageSpy, 
        httpGetClientSpy
    }
}

describe('Authorize Http Get Client Decorator',  () => {
    test('should call getStorage with correct value', async() => {
        const { sut, getStorageSpy} = makeSystemUnderTest()
        await sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })
   
    test('should add headers if getStorage value is valid', async () => {
        const { sut, httpGetClientSpy} = makeSystemUnderTest()
        const httpRequest: IHttpGetParams = {
            url: faker.internet.url()
        }
        await sut.get(httpRequest)
        expect(httpGetClientSpy.url).toBe(httpRequest.url)
        expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
    })
})
