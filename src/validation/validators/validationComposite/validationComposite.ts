import { IFieldValidation } from '@/validation/protocols/fieldValidation'
import { IValidation } from '@/presentation/protocols/validation'

export class ValidationComposite implements IValidation {
  private constructor (private readonly validators: IFieldValidation[]) {}

  static build (validators: IFieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, fieldValue: string): string {
    const fieldValidators = this.validators.filter(validator => validator.field === fieldName)
    for (const validator of fieldValidators) {
      const error = validator.validate(fieldValue)
      if (error) return error.message
    }
  }
}
