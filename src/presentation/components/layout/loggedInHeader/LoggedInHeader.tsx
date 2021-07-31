import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Logo } from '..'
import Styles from './loggedInHeader.styles.scss'

export const LoggedInHeader: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const logout = (event: any): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.headerWrapper}>
    <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrapper}>
            <span data-testid="username">{getCurrentAccount().name}</span>
            <a data-testid="logout" onClick={logout} href="#">Sair</a>
        </div>
    </div>
</header>
  )
}
