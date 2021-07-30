import faker from 'faker'
import { ILoadSurveyList } from '../useCases'

export const mockSurveyModel = (): ILoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
})

export const mockSurveyListModel = (): ILoadSurveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
]
