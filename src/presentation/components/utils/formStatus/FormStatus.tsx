import React, { useContext } from 'react'
import { Spinner } from '../../utils/'
import Styles from './formStatus-styles.scss'
import Context from '../../../contexts/form/FormContext'

export const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}
