import { RemoteLoadSurveyList } from '@/data/useCases/loadSurveyList/loadRemoteSurveyList'
import { ILoadSurveyList } from '@/domain/useCases'
import { makeAuthorizeHttpGetClientDecorator } from '../../decorators'
import { makeApiUrl } from '../../http/apiUrlFactory'

export const makeRemoteLoadSurveyList = (): ILoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator())
}
