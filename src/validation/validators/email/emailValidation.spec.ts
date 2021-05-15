import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import faker from 'faker'
import { EmailValidation } from './emailValidation'

interface SutTypes {
  sut: EmailValidation
}

const makeSystemUnderTest = (): EmailValidation => new EmailValidation(faker.database.column())

describe('Email Validation', () => {
  test('should return error if email is invalid', () => {
    const sut = makeSystemUnderTest()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
  test('should not return an error if email is valid', () => {
    const sut = makeSystemUnderTest()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
  test('should return falsy if email is empty', () => {
    const sut = makeSystemUnderTest()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
