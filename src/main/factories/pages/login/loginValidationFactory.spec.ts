import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeLoginValidation } from './loginValidationFactory'

describe('Login Validation Factory', () => {
  test('should make ValidationComposite with correct validators', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
