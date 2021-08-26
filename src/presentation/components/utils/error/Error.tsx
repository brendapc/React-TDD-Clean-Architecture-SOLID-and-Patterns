import React from 'react'
import Styles from './error.styles.scss'

type Props = {
  error: string
  reload: () => void
}

export const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrapper}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload-button" onClick={reload}>Tente novamente</button>
    </div>
  )
}
