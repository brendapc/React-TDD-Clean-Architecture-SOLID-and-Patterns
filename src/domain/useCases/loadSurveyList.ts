import { ISurveyModel } from '@/domain/models'

export interface ILoadSurveyList {
  loadAll: () => Promise<ISurveyModel[]>
}
