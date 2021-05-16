import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validationBuilder'

describe('Validation Builder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('anyField').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('anyField')])
  })

  test('should return EmailValidation', () => {
    const validations = sut.field('anyField').email().build()
    expect(validations).toEqual([new EmailValidation('anyField')])
  })

  test('should return MinLengthValidation', () => {
    const validations = sut.field('anyField').min(5).build()
    expect(validations).toEqual([new MinLengthValidation('anyField', 5)])
  })
})
