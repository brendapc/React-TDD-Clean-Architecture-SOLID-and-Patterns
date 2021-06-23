import Styles from './input-styles.scss'
import React, { useContext, useRef } from 'react'
import FormContext from '@/presentation/contexts/form/FormContext'
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const { formState, setFormState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const error = formState[`${props.name}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrapper}>
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label onClick={() => { inputRef.current.focus() }}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Everything ok'}
        className={Styles.status}>{error ? '❗' : '✔️'}
      </span>
    </div>
  )
}
