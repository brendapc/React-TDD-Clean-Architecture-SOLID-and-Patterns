import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { MinLengthValidation } from './minLengthValidation'

describe('Minimum Length Validation', () => {
  test('should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
})
