import { FieldValidationSpy } from '../mocks/fieldValidation'
import { ValidationComposite } from './validationComposite'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSystemUnderTest = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)]
  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('Validation Composite', () => {
  test('should return error if any of validations fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSystemUnderTest(fieldName)
    const firstErrorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(firstErrorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(firstErrorMessage)
  })

  test('should not return an error when fields are valid', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSystemUnderTest(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
