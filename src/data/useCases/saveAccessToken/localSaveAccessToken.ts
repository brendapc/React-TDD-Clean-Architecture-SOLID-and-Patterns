import { ISetStorage } from '@/data/protocols/cache/setStorage'
import { ISaveAccessToken } from '@/domain/useCases/saveAccessToken'

export class LocalSaveAccessToken implements ISaveAccessToken {
  constructor (private readonly setStorage: ISetStorage) {}
  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
