import { FieldValidation } from '@/validation/protocols/fieldValidation'
import { RequiredFieldValidation } from '@/validation/validators'
import { EmailValidation } from '../email/emailValidation'
import { MinLengthValidation } from '../minLength/minLengthValidation'

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

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
