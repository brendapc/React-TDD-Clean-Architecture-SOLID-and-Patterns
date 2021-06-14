import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { CompareFieldsValidation } from './compareFieldsValidation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSystemUnderTest = (valueToCompare: string): SutTypes => {
  const sut = new CompareFieldsValidation(faker.database.column(), valueToCompare)
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  test('should return an error if compare is invalid', () => {
    const { sut } = makeSystemUnderTest(faker.random.word())
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
