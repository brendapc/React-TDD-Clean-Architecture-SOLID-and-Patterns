import { RemoteLoadSurveyResult } from '@/data/useCases/loadSurveyResult/RemoteloadSurveyResult'
import { ILoadSurveyResult } from '@/domain/useCases'
import { makeAuthorizeHttpGetClientDecorator } from '../../decorators'
import { makeApiUrl } from '../../http/apiUrlFactory'

export const makeRemoteLoadSurveyResult = (id: string): ILoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpGetClientDecorator())
}
