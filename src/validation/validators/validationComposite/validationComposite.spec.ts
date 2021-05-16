import { FieldValidationSpy } from '../mocks/fieldValidation'
import { ValidationComposite } from './validationComposite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSystemUnderTest = (): SutTypes => {
  const fieldValidationsSpy = [new FieldValidationSpy('anyField'), new FieldValidationSpy('anyField')]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('Validation Composite', () => {
  test('should return error if any of validations fails', () => {
    const { sut, fieldValidationsSpy } = makeSystemUnderTest()
    fieldValidationsSpy[0].error = new Error('first error message')
    fieldValidationsSpy[1].error = new Error('second error message')
    const error = sut.validate('anyField', 'anyValue')
    expect(error).toBe('first error message')
  })
})
