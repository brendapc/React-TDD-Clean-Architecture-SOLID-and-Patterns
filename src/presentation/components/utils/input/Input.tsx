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
    <div
      data-testid={`${props.name}-wrapper`}
      className={Styles.inputWrapper}
      data-status={error ? 'invalid' : 'valid'}
    >
    <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label
        title={error}
        onClick={() => { inputRef.current.focus() }}
        data-testid={`${props.name}-label`}
      >{props.placeholder}</label>
    </div>
  )
}
