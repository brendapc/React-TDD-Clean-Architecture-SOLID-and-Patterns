import Styles from './input-styles.scss'
import React from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrapper}>
      <input {...props} />
      <span className={Styles.status}>❗</span>
    </div>
  )
}
