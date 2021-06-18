import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import faker from 'faker'
import { EmailValidation } from './emailValidation'

interface SutTypes {
  sut: EmailValidation
}

const makeSystemUnderTest = (field: string): EmailValidation => new EmailValidation(field)

describe('Email Validation', () => {
  test('should return error if email is invalid', () => {
    const field = faker.database.column()
    const sut = makeSystemUnderTest(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError())
  })
  test('should not return an error if email is valid', () => {
    const field = faker.database.column()
    const sut = makeSystemUnderTest(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })
  test('should return falsy if email is empty', () => {
    const field = faker.database.column()
    const sut = makeSystemUnderTest(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
