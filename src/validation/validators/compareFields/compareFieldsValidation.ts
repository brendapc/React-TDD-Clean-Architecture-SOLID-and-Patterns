import { InvalidFieldError } from '@/validation/errors/invalidFieldError'
import { IFieldValidation } from '@/validation/protocols/fieldValidation'

export class CompareFieldsValidation implements IFieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string) {}

  validate (input: object): Error {
    return (input[this.field] !== input[this.fieldToCompare]) ? new InvalidFieldError() : null
  }
}
