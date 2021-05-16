import { FieldValidation } from '@/validation/protocols/fieldValidation'
import { RequiredFieldValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {} // declared as private because we dont want this class to be a contructor

  static field (fieldName: string): ValidationBuilder { // static methods dont have a `this`, they can only be accessed by Class.method
    return new ValidationBuilder(fieldName, []) // return a "new" instance of ValidationBuilder, since we cant use "new ValidationBuilder" outside the class (because of the private constructor)
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}