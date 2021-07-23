import { ISetStorage } from '@/data/protocols/cache/setStorage'

export class LocalStorageAdapter implements ISetStorage {
  set (key: string, value: any): void {
    localStorage.setItem(key,value)
  }
}
