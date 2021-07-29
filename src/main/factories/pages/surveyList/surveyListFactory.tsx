import React from 'react'
import { SurveyList } from '@/presentation/pages/surveyList/SurveyList'
import { makeRemoteLoadSurveyList } from '@/main/factories/useCases/'

export const makeSurveyList: React.FC = () => {
  return (
        <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
  )
}
