import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { MinLengthValidation } from './minLengthValidation'
import faker from 'faker'

const makeSystemUnderTest = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('Minimum Length Validation', () => {
  test('should return error if value is invalid', () => {
    const sut = makeSystemUnderTest()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should not return an error if field is valid', () => {
    const sut = makeSystemUnderTest()
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
