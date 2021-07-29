import { GetStorageSpy, mockGetRequest } from "@/data/mocks"
import { AuthorizeHttpGetClientDecorator } from "@/main/decorators"

describe('Authorize Http Get Client Decorator', () => {
    test('should call getStorage with correct value', () => {
        const getStorageSpy = new GetStorageSpy()
        const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
        sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })
    
})
