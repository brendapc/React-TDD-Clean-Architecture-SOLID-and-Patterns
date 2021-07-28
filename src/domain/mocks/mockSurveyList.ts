import faker, { fake } from 'faker'
import { ISurveyModel } from '../models'

export const mockSurveyModel = (): ISurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
      image: faker.internet.url()
    },
    {
      answer: faker.random.words(5)
    }
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
})

export const mockSurveyListModel = (): ISurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
]
