import React, { useContext } from 'react'
import SurveyContext from '../../context/SurveyContext'

export const Error: React.FC = () => {
  const { state,setState } = useContext(SurveyContext)

  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div>
        <span data-testid="error">{state.error}</span>
        <button data-testid="reload-button" onClick={reload}>Tente novamente</button>
  </div>
  )
}
