import React from 'react'
import { Spinner } from '../../layout/spinner/Spinner'
import Styles from './formStatus-styles.scss'

export const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrapper}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}> error</span>
    </div>
  )
}
