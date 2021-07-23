import { IGetStorage } from '@/data/protocols/cache'
import { ISetStorage } from '@/data/protocols/cache/setStorage'

export class LocalStorageAdapter implements ISetStorage, IGetStorage {
  set (key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
