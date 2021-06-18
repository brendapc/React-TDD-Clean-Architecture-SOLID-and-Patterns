import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeSignupValidation } from './signupValidationFactory'

describe('Signup Validation Factory', () => {
  test('should make ValidationComposite with correct validators', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('username').required().email().build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().min(5).build()
    ]))
  })
})
