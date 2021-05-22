import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { IFieldValidation } from '@/validation/protocols/fieldValidation'

export class MinLengthValidation implements IFieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}
  validate (value: string): Error {
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }
}
