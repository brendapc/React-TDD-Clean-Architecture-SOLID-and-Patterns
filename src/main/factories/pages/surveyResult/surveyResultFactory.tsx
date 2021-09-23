import React from 'react'
import { useParams } from 'react-router-dom'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '@/main/factories/useCases'

type params = {
  id: string
}
export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<params>()

  return (
    <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />
  )
}

