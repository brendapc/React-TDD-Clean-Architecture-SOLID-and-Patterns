import faker from 'faker'
import { IGetStorage } from '../protocols/cache'

export class GetStorageSpy implements IGetStorage {
  key: string
  value: any = faker.random.objectElement()

  get (key: string): any {
    this.key = key
    return this.value
  }
}
