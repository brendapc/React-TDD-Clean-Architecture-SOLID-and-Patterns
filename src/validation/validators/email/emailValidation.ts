import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { FieldValidation } from '@/validation/protocols/fieldValidation'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (value: string): Error {
    return new InvalidFieldError()
  }
}