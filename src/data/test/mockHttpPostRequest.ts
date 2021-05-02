import faker from 'faker'
import { IHttpPostParams } from '../protocols/http'

export const mockPostRequest = (): IHttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
