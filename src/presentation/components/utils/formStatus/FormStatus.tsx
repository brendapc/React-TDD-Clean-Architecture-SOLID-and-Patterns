import React, { useContext } from 'react'
import { Spinner } from '../../utils/'
import Styles from './formStatus-styles.scss'
import FormContext from '../../../contexts/form/FormContext'

export const FormStatus: React.FC = () => {
  const { formState } = useContext(FormContext)
  const { isLoading, mainError } = formState
  return (
    <div data-testid="error-wrap" className={Styles.errorWrapper}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}
