import { FieldValidation } from '@/validation/protocols/fieldValidation'
import { IValidation } from '@/presentation/protocols/validation'

export class ValidationComposite implements IValidation {
  constructor (private readonly validators: FieldValidation[]) {}

  validate (fieldName: string, fieldValue: string): string {
    const fieldValidators = this.validators.filter(validator => validator.field === fieldName)
    for (const validator of fieldValidators) {
      const error = validator.validate(fieldValue)
      if (error) return error.message
    }
  }
}
