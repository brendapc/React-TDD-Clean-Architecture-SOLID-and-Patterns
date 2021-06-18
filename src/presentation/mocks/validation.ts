import { IValidation } from '@/presentation/protocols/validation'

export class ValidationStub implements IValidation {
  errorMessage: string
  fieldName: string
  input: object

  validate (fieldName: string, input: object): string {
    this.fieldName = fieldName
    this.input = input
    return this.errorMessage
  }
}
