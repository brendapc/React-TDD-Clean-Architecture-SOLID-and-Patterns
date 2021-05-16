import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validationBuilder'

describe('Validation Builder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('anyField').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('anyField')])
  })
})
