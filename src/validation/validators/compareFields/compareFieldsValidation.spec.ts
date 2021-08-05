import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { CompareFieldsValidation } from './compareFieldsValidation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSystemUnderTest = (field: string, fieldToCompare: string): SutTypes => {
  const sut = new CompareFieldsValidation(field, fieldToCompare)
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  test('should return an error if compare is invalid', () => {
    const field = 'any_field'
    const fieldToCompare = faker.database.column()
    const { sut } = makeSystemUnderTest(field, fieldToCompare)
    const error = sut.validate({ [field]: faker.random.words(3), [fieldToCompare]: faker.random.words(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const { sut } = makeSystemUnderTest(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeNull()
  })
})
