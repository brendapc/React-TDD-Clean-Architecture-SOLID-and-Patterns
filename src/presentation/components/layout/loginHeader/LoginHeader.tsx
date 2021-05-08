import React, { memo } from 'react'
import { Logo } from '../logo/Logo'
import Styles from './loginHeader-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
