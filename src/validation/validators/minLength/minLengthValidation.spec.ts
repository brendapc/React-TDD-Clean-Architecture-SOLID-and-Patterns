import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { MinLengthValidation } from './minLengthValidation'
import faker from 'faker'

const makeSystemUnderTest = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('Minimum Length Validation', () => {
  test('should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSystemUnderTest(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(3) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should not return an error if field is valid', () => {
    const field = faker.database.column()
    const sut = makeSystemUnderTest(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exist in schema', () => {
    const field = faker.database.column()
    const sut = makeSystemUnderTest(field)
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
