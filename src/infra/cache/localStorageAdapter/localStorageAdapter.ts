import { ISetStorage } from '@/data/protocols/cache/setStorage'

export class LocalStorageAdapter implements ISetStorage {
  set (key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
