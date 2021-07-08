import React from 'react'
import { Logo } from '..'
import Styles from './loggedInHeader.styles.scss'

export const LoggedInHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrapper}>
    <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrapper}>
            <span>Brenda</span>
            <a href="#">Sair</a>
        </div>
    </div>
</header>
  )
}
