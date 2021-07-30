import faker from 'faker'
import { RemoteLoadSurveyList } from '../useCases/loadSurveyList/loadRemoteSurveyList'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent().toISOString()
})

export const mockSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
]
