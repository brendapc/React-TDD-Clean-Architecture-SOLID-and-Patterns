import Styles from './input-styles.scss'
import React, { useContext } from 'react'
import FormContext from '../../../contexts/form/FormContext'
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const { formState, setFormState } = useContext(FormContext)
  const error = formState[`${props.name}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return '❗'
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={error} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}
