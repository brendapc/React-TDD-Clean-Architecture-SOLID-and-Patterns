import React, { useContext } from 'react'
import { useLogout } from '@/presentation/hooks'
import { ApiContext } from '@/presentation/contexts'
import { Logo } from '..'
import Styles from './loggedInHeader.styles.scss'

export const LoggedInHeader: React.FC = () => {
  const logoutHook = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = (event: any): void => {
    event.preventDefault()
    logoutHook()
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
