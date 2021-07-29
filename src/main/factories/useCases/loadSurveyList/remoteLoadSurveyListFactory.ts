import { RemoteLoadSurveyList } from '@/data/useCases/loadSurveyList/loadRemoteSurveyList'
import { ILoadSurveyList } from '@/domain/useCases'
import { makeApiUrl } from '../../http/apiUrlFactory'
import { makeAxiosHttpClient } from '../../http/HttpClientFactory'

export const makeRemoteLoadSurveyList = (): ILoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/signup'), makeAxiosHttpClient())
}
