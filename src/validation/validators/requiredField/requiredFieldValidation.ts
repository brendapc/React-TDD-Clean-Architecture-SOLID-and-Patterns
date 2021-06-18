import { IFieldValidation } from '@/validation/protocols/fieldValidation'

export class RequiredFieldValidation implements IFieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return input[this.field] ? null : new Error('Campo Obrigatório')
  }
}
