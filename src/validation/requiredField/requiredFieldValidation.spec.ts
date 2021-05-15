import { RequiredFieldError } from '../errors/requiredFieldError'
import { RequiredFieldValidation } from './requiredFieldValidation'
import faker from 'faker'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSystemUnderTest = (field): SutTypes => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  test('should return an error if ', () => {
    const { sut } = makeSystemUnderTest('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('should not return an error if field id not empty', () => {
    const { sut } = makeSystemUnderTest('email')
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
