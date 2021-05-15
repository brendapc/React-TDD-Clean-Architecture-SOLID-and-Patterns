import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { FieldValidation } from '@/validation/protocols/fieldValidation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}
  validate (value: string): Error {
    return new InvalidFieldError()
  }
}