import { ISaveAccessToken } from '@/domain/useCases/saveAccessToken'
import { IValidation } from '@/presentation/protocols/validation'

export class SaveAccessTokenMock implements ISaveAccessToken {
  accessToken: string

  async save (accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}
