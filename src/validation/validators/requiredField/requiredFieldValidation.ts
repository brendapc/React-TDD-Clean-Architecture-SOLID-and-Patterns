import { IFieldValidation } from '@/validation/protocols/fieldValidation'

export class RequiredFieldValidation implements IFieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return value ? null : new Error('Campo Obrigatório')
  }
}
