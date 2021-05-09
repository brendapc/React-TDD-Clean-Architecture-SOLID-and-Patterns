import React, { useContext } from 'react'
import { Spinner } from '../../utils/'
import Styles from './formStatus-styles.scss'
import FormContext from '../../../contexts/form/FormContext'

export const FormStatus: React.FC = () => {
  const { formState, errorState } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrapper}>
      {formState.isLoading && <Spinner className={Styles.spinner} />}
      {errorState.main && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  )
}
