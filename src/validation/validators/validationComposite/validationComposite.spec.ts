import { FieldValidationSpy } from '../mocks/fieldValidation'
import { ValidationComposite } from './validationComposite'

const makeSystemUnderTest = (): any => {
  const fieldValidationSpy = new FieldValidationSpy('anyField')
  fieldValidationSpy.error = new Error('first error message')

  const fieldValidationSpy2 = new FieldValidationSpy('anyField')
  fieldValidationSpy2.error = new Error('second error message')
  const sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])
  return {
    sut
  }
}

describe('Validation Composite', () => {
  test('should return error if any of validations fails', () => {
    const { sut } = makeSystemUnderTest()
    const error = sut.validate('anyField', 'anyValue')
    expect(error).toBe('first error message')
  })
})
