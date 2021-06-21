import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeSignupValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('username').required().build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
  ])
}