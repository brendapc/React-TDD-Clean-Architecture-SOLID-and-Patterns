import { ISetStorage } from '@/data/protocols/cache/setStorage'

export class LocalStorageAdapter implements ISetStorage {
  async set (key: string, value: any): Promise<void> {
    localStorage.setItem(key,value)
  }
}
