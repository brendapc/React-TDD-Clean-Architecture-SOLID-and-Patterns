import { ILoadSurveyResult } from '@/domain/useCases'
import faker from 'faker'

export const mockSurveyResultModel = (): ILoadSurveyResult.Model => ({
    question: faker.random.words(18),
    date: faker.date.recent(),
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
    }]
})
export class LoadSurveyResultSpy implements ILoadSurveyResult {
    callsCount = 0
    surveyResult = mockSurveyResultModel()

    async load(): Promise<ILoadSurveyResult.Model> {
        this.callsCount++
        return this.surveyResult
    }
}