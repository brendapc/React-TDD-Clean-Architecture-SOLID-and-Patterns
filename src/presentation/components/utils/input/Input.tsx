import Styles from './input-styles.scss'
import React, { useContext } from 'react'
import FormContext from '../../../contexts/form/FormContext'
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(FormContext)
  const error = errorState[`${props.name}`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return '❗'
  }

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} readOnly onFocus={enableInput} />
      <span data-testid={`${props.name}-status`} title={error} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}
