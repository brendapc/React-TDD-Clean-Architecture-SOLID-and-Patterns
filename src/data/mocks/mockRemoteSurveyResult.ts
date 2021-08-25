import faker from 'faker'
import { RemoteLoadSurveyResult } from '../useCases/loadSurveyResult/RemoteloadSurveyResult'

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word(),
    count: faker.datatype.number(),
    percent: faker.datatype.number(100),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }, {
    answer: faker.random.word(),
    count: faker.datatype.number(),
    percent: faker.datatype.number(100),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }
  ]
})
