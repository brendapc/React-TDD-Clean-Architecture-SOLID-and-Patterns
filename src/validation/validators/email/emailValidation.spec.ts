import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import faker from 'faker'
import { EmailValidation } from './emailValidation'

interface SutTypes {
  sut: EmailValidation
}

const makeSystemUnderTest = (field): SutTypes => {
  const sut = new EmailValidation(field)
  return {
    sut
  }
}

describe('Email Validation', () => {
  test('should return error if email is invalid', () => {
    const { sut } = makeSystemUnderTest(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
  test('should not return an error if email is valid', () => {
    const { sut } = makeSystemUnderTest(faker.random.word())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
