import { RequiredFieldError } from '../../errors/requiredFieldError'
import { RequiredFieldValidation } from './requiredFieldValidation'
import faker from 'faker'

interface SutTypes {
  sut: RequiredFieldValidation
}

const makeSystemUnderTest = (field: string): SutTypes => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  test('should return an error if field is empty', () => {
    const field = faker.database.column()
    const { sut } = makeSystemUnderTest(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('should not return an error if field id not empty', () => {
    const field = faker.database.column()
    const { sut } = makeSystemUnderTest(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
