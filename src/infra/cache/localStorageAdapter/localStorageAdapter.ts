import { IGetStorage } from '@/data/protocols/cache'
import { ISetStorage } from '@/data/protocols/cache/setStorage'

export class LocalStorageAdapter implements ISetStorage, IGetStorage {
  set (key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
