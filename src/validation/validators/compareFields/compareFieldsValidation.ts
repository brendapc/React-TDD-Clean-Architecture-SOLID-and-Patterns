import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { IFieldValidation } from '@/validation/protocols/fieldValidation'

export class CompareFieldsValidation implements IFieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string) {}

  validate (value: string): Error {
    if (value !== this.valueToCompare) return new InvalidFieldError()
    return null
  }
}
