import { GetStorageSpy, mockGetRequest } from "@/data/mocks"
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators"

type SutTypes = {
    getStorageSpy: GetStorageSpy
    sut: AuthorizeHttpGetClientDecorator
}

const makeSystemUnderTest = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    return {sut, getStorageSpy}
}

describe('Authorize Http Get Client Decorator', () => {
    test('should call getStorage with correct value', () => {
        const { sut, getStorageSpy} = makeSystemUnderTest()
        sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })
   
        
})
