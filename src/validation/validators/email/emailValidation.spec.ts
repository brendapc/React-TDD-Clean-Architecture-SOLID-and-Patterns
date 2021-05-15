import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
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
    const { sut } = makeSystemUnderTest('email')
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
