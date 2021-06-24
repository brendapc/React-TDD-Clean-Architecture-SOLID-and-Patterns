import { ISetStorage } from '@/data/protocols/cache/setStorage'
import { UnexpectedError } from '@/domain/errors'
import { ISaveAccessToken } from '@/domain/useCases/saveAccessToken'

export class LocalSaveAccessToken implements ISaveAccessToken {
  constructor (private readonly setStorage: ISetStorage) {}
  async save (accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpectedError()
    }
    await this.setStorage.set('accessToken', accessToken)
  }
}
