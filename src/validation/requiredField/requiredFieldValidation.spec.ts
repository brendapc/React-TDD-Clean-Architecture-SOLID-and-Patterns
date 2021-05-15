import { RequiredFieldError } from '../errors/requiredFieldError'
import { RequiredFieldValidation } from './requiredFieldValidation'

describe('Required Field Validation', () => {
  test('should return an error if ', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
